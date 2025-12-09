package auth

import (
	"crypto/rand"
	"crypto/sha256"
	"encoding/base64"
	"encoding/hex"
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
)

var (
	errMissingSecret      = errors.New("auth secret is not configured")
	errInvalidAccessToken = errors.New("invalid access token")
)

type tokenClaims struct {
	Role string `json:"role"`
	jwt.RegisteredClaims
}

func generateAccessToken(secret string, userID uuid.UUID, role string, ttl time.Duration, now time.Time) (string, error) {
	if secret == "" {
		return "", errMissingSecret
	}

	claims := tokenClaims{
		Role: role,
		RegisteredClaims: jwt.RegisteredClaims{
			Subject:   userID.String(),
			IssuedAt:  jwt.NewNumericDate(now),
			ExpiresAt: jwt.NewNumericDate(now.Add(ttl)),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(secret))
}

func generateRefreshToken(ttl time.Duration, now time.Time) (token string, hashed string, expires time.Time, err error) {
	buf := make([]byte, 32)
	if _, err = rand.Read(buf); err != nil {
		return "", "", time.Time{}, err
	}

	token = base64.RawURLEncoding.EncodeToString(buf)
	hashed = hashRefreshToken(token)
	return token, hashed, now.Add(ttl), nil
}

func hashRefreshToken(token string) string {
	sum := sha256.Sum256([]byte(token))
	return hex.EncodeToString(sum[:])
}

func parseAccessToken(secret, token string) (tokenClaims, error) {
	if secret == "" {
		return tokenClaims{}, errMissingSecret
	}

	parsed, err := jwt.ParseWithClaims(token, &tokenClaims{}, func(t *jwt.Token) (any, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errInvalidAccessToken
		}
		return []byte(secret), nil
	})
	if err != nil {
		return tokenClaims{}, err
	}

	claims, ok := parsed.Claims.(*tokenClaims)
	if !ok || !parsed.Valid {
		return tokenClaims{}, errInvalidAccessToken
	}

	return *claims, nil
}
