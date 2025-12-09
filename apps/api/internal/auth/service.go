package auth

import (
	"context"
	"database/sql"
	"errors"
	"net"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/rs/zerolog"
	"github.com/sqlc-dev/pqtype"

	"github.com/synergyvets/platform/internal/queries"
	"github.com/synergyvets/platform/internal/store"
)

// Service coordinates registration and login workflows.
type Service struct {
	store  *store.Store
	logger zerolog.Logger
	config Config
	now    func() time.Time
}

// Config defines expiry and secret settings for token generation.
type Config struct {
	Secret          string
	AccessTokenTTL  time.Duration
	RefreshTokenTTL time.Duration
}

// RegisterInput holds the incoming payload for creating a user.
type RegisterInput struct {
	Email    string
	Password string
}

// LoginInput holds the incoming payload for logging a user in.
type LoginInput struct {
	Email     string
	Password  string
	UserAgent string
	IP        string
}

// SessionMetadata captures contextual information for refresh sessions.
type SessionMetadata struct {
	UserAgent string
	IP        string
}

// AuthResult includes issued tokens along with user identity details.
type AuthResult struct {
	User               queries.User
	AccessToken        string
	RefreshToken       string
	RefreshTokenExpiry time.Time
}

var (
	// ErrEmailInUse indicates a user already exists for that email.
	ErrEmailInUse = errors.New("email already registered")
	// ErrInvalidCredentials signals that authentication failed.
	ErrInvalidCredentials = errors.New("invalid email or password")
	// ErrWeakPassword denotes password is below minimal requirements.
	ErrWeakPassword = errors.New("password must be at least 8 characters")
	// ErrInvalidEmail indicates email requirements were not met.
	ErrInvalidEmail = errors.New("email is required")
	// ErrInvalidRefreshToken signals the refresh token could not be validated.
	ErrInvalidRefreshToken = errors.New("invalid refresh token")
	// ErrExpiredRefreshToken indicates the refresh token is no longer valid.
	ErrExpiredRefreshToken = errors.New("refresh token expired")
	// ErrInvalidAccessToken denotes problems validating the bearer token.
	ErrInvalidAccessToken = errors.New("invalid access token")
	// ErrAccessTokenExpired indicates the bearer token has expired.
	ErrAccessTokenExpired = errors.New("access token expired")
	// ErrInactiveAccount represents a user that is not active.
	ErrInactiveAccount = errors.New("user is inactive")
	// ErrForbidden signals the user lacks the required permissions.
	ErrForbidden = errors.New("insufficient privileges")
)

// NewService constructs an auth Service with sane defaults.
func NewService(store *store.Store, logger zerolog.Logger, cfg Config) *Service {
	service := &Service{
		store:  store,
		logger: logger,
		config: cfg,
		now:    time.Now,
	}

	if service.config.AccessTokenTTL <= 0 {
		service.config.AccessTokenTTL = 15 * time.Minute
	}
	if service.config.RefreshTokenTTL <= 0 {
		service.config.RefreshTokenTTL = 720 * time.Hour // 30 days
	}

	return service
}

// WithNow overrides the clock for testing.
func (s *Service) WithNow(now func() time.Time) *Service {
	if now != nil {
		s.now = now
	}
	return s
}

// Register creates a new user and issues tokens.
func (s *Service) Register(ctx context.Context, input RegisterInput, meta SessionMetadata) (AuthResult, error) {
	result := AuthResult{}

	email := strings.TrimSpace(strings.ToLower(input.Email))
	password := strings.TrimSpace(input.Password)
	if email == "" {
		return result, ErrInvalidEmail
	}
	if len(password) < 8 {
		return result, ErrWeakPassword
	}

	err := s.store.WithTx(ctx, func(q *queries.Queries) error {
		if _, err := q.GetUserByEmail(ctx, email); err == nil {
			return ErrEmailInUse
		} else if !errors.Is(err, sql.ErrNoRows) {
			return err
		}

		hash, err := hashPassword(password)
		if err != nil {
			return err
		}

		user, err := q.CreateUser(ctx, queries.CreateUserParams{
			Email:        email,
			PasswordHash: hash,
		})
		if err != nil {
			return err
		}

		ar, err := s.issueTokens(ctx, q, user, meta)
		if err != nil {
			return err
		}
		result = ar
		return nil
	})
	if err != nil {
		return result, err
	}

	return result, nil
}

// Login authenticates a user and issues fresh tokens.
func (s *Service) Login(ctx context.Context, input LoginInput) (AuthResult, error) {
	result := AuthResult{}

	email := strings.TrimSpace(strings.ToLower(input.Email))
	if email == "" || strings.TrimSpace(input.Password) == "" {
		return result, ErrInvalidCredentials
	}

	err := s.store.WithTx(ctx, func(q *queries.Queries) error {
		user, err := q.GetUserByEmail(ctx, email)
		if err != nil {
			if errors.Is(err, sql.ErrNoRows) {
				return ErrInvalidCredentials
			}
			return err
		}

		if err := verifyPassword(user.PasswordHash, input.Password); err != nil {
			return ErrInvalidCredentials
		}

		meta := SessionMetadata{UserAgent: input.UserAgent, IP: input.IP}
		ar, err := s.issueTokens(ctx, q, user, meta)
		if err != nil {
			return err
		}

		if err := q.UpdateUserLastLogin(ctx, user.ID); err != nil {
			s.logger.Warn().Err(err).Str("user_id", user.ID.String()).Msg("failed to update last login")
		}

		result = ar
		return nil
	})
	if err != nil {
		return result, err
	}

	return result, nil
}

// Refresh exchanges a valid refresh token for new access and refresh tokens.
func (s *Service) Refresh(ctx context.Context, refreshToken string, meta SessionMetadata) (AuthResult, error) {
	result := AuthResult{}
	token := strings.TrimSpace(refreshToken)
	if token == "" {
		return result, ErrInvalidRefreshToken
	}

	hashed := hashRefreshToken(token)

	err := s.store.WithTx(ctx, func(q *queries.Queries) error {
		session, err := q.GetUserSessionByHash(ctx, hashed)
		if err != nil {
			if errors.Is(err, sql.ErrNoRows) {
				return ErrInvalidRefreshToken
			}
			return err
		}

		now := s.now()
		if session.ExpiresAt.Before(now) {
			if delErr := q.DeleteUserSession(ctx, session.ID); delErr != nil {
				s.logger.Warn().Err(delErr).Msg("failed to delete expired session")
			}
			return ErrExpiredRefreshToken
		}

		user, err := q.GetUserByID(ctx, session.UserID)
		if err != nil {
			if errors.Is(err, sql.ErrNoRows) {
				if delErr := q.DeleteUserSession(ctx, session.ID); delErr != nil {
					s.logger.Warn().Err(delErr).Msg("failed to delete orphaned session")
				}
				return ErrInvalidRefreshToken
			}
			return err
		}

		if err := q.DeleteUserSession(ctx, session.ID); err != nil {
			return err
		}

		ar, err := s.issueTokens(ctx, q, user, meta)
		if err != nil {
			return err
		}

		result = ar
		return nil
	})
	if err != nil {
		return result, err
	}

	return result, nil
}

// Logout revokes the session tied to the provided refresh token.
func (s *Service) Logout(ctx context.Context, refreshToken string) error {
	token := strings.TrimSpace(refreshToken)
	if token == "" {
		return ErrInvalidRefreshToken
	}

	hashed := hashRefreshToken(token)

	return s.store.WithTx(ctx, func(q *queries.Queries) error {
		session, err := q.GetUserSessionByHash(ctx, hashed)
		if err != nil {
			if errors.Is(err, sql.ErrNoRows) {
				return ErrInvalidRefreshToken
			}
			return err
		}

		return q.DeleteUserSession(ctx, session.ID)
	})
}

// ValidateAccessToken parses and validates a bearer token, returning the associated user.
func (s *Service) ValidateAccessToken(ctx context.Context, token string) (queries.User, error) {
	result := queries.User{}
	bearer := strings.TrimSpace(token)
	if bearer == "" {
		return result, ErrInvalidAccessToken
	}

	claims, err := parseAccessToken(s.config.Secret, bearer)
	if err != nil {
		if errors.Is(err, errMissingSecret) {
			return result, err
		}
		return result, ErrInvalidAccessToken
	}

	if claims.ExpiresAt != nil && claims.ExpiresAt.Time.Before(s.now()) {
		return result, ErrAccessTokenExpired
	}

	userID, err := uuid.Parse(claims.Subject)
	if err != nil {
		return result, ErrInvalidAccessToken
	}

	user, err := s.store.Queries().GetUserByID(ctx, userID)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return result, ErrInvalidAccessToken
		}
		return result, err
	}

	if strings.ToLower(user.Status) != "active" {
		return result, ErrInactiveAccount
	}

	user.PasswordHash = ""
	return user, nil
}

func (s *Service) issueTokens(ctx context.Context, q *queries.Queries, user queries.User, meta SessionMetadata) (AuthResult, error) {
	now := s.now()

	accessToken, err := generateAccessToken(s.config.Secret, user.ID, user.Role, s.config.AccessTokenTTL, now)
	if err != nil {
		return AuthResult{}, err
	}

	refreshToken, hashedRefresh, expiresAt, err := generateRefreshToken(s.config.RefreshTokenTTL, now)
	if err != nil {
		return AuthResult{}, err
	}

	params := queries.CreateUserSessionParams{
		UserID:           user.ID,
		RefreshTokenHash: hashedRefresh,
		UserAgent:        sql.NullString{String: meta.UserAgent, Valid: strings.TrimSpace(meta.UserAgent) != ""},
		ExpiresAt:        expiresAt,
	}

	if inet, ok := parseIP(meta.IP); ok {
		params.Ip = inet
	}

	if _, err := q.CreateUserSession(ctx, params); err != nil {
		return AuthResult{}, err
	}

	safeUser := user
	safeUser.PasswordHash = ""

	return AuthResult{
		User:               safeUser,
		AccessToken:        accessToken,
		RefreshToken:       refreshToken,
		RefreshTokenExpiry: expiresAt,
	}, nil
}

func parseIP(raw string) (pqtype.Inet, bool) {
	ip := net.ParseIP(strings.TrimSpace(raw))
	if ip == nil {
		return pqtype.Inet{}, false
	}

	if ip.To4() != nil {
		return pqtype.Inet{IPNet: net.IPNet{IP: ip, Mask: net.CIDRMask(32, 32)}, Valid: true}, true
	}

	return pqtype.Inet{IPNet: net.IPNet{IP: ip, Mask: net.CIDRMask(128, 128)}, Valid: true}, true
}

// RevokeAllSessions removes all refresh tokens for a user.
func (s *Service) RevokeAllSessions(ctx context.Context, userID uuid.UUID) error {
	return s.store.WithTx(ctx, func(q *queries.Queries) error {
		return q.DeleteUserSessionsByUserID(ctx, userID)
	})
}
