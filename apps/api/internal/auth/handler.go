package auth

import (
	"encoding/json"
	"errors"
	"net"
	"net/http"
	"strings"
	"time"

	"github.com/go-chi/chi/v5"
)

// Handler exposes HTTP endpoints for authentication operations.
type Handler struct {
	service *Service
}

// NewHandler builds an auth HTTP handler layer.
func NewHandler(service *Service) *Handler {
	return &Handler{service: service}
}

// Routes registers auth endpoints under the provided router.
func (h *Handler) Routes(r chi.Router) {
	r.Post("/register", h.handleRegister)
	r.Post("/login", h.handleLogin)
	r.Post("/refresh", h.handleRefresh)
	r.Post("/logout", h.handleLogout)
}

type registerRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type loginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type refreshRequest struct {
	RefreshToken string `json:"refresh_token"`
}

type authResponse struct {
	AccessToken        string       `json:"access_token"`
	RefreshToken       string       `json:"refresh_token"`
	RefreshTokenExpiry string       `json:"refresh_token_expiry"`
	User               userResponse `json:"user"`
}

type userResponse struct {
	ID     string `json:"id"`
	Email  string `json:"email"`
	Role   string `json:"role"`
	Status string `json:"status"`
}

func (h *Handler) handleRegister(w http.ResponseWriter, r *http.Request) {
	var req registerRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid JSON payload")
		return
	}

	result, err := h.service.Register(r.Context(), RegisterInput{
		Email:    req.Email,
		Password: req.Password,
	}, SessionMetadata{
		UserAgent: r.UserAgent(),
		IP:        remoteIP(r),
	})
	if err != nil {
		switch {
		case errors.Is(err, ErrEmailInUse):
			writeError(w, http.StatusConflict, err.Error())
		case errors.Is(err, ErrInvalidEmail):
			writeError(w, http.StatusBadRequest, err.Error())
		case errors.Is(err, ErrWeakPassword):
			writeError(w, http.StatusBadRequest, err.Error())
		default:
			writeError(w, http.StatusInternalServerError, "failed to register user")
		}
		return
	}

	writeJSON(w, http.StatusCreated, toAuthResponse(result))
}

func (h *Handler) handleLogin(w http.ResponseWriter, r *http.Request) {
	var req loginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid JSON payload")
		return
	}

	result, err := h.service.Login(r.Context(), LoginInput{
		Email:     req.Email,
		Password:  req.Password,
		UserAgent: r.UserAgent(),
		IP:        remoteIP(r),
	})
	if err != nil {
		switch {
		case errors.Is(err, ErrInvalidCredentials):
			writeError(w, http.StatusUnauthorized, err.Error())
		default:
			writeError(w, http.StatusInternalServerError, "failed to authenticate user")
		}
		return
	}

	writeJSON(w, http.StatusOK, toAuthResponse(result))
}

func (h *Handler) handleRefresh(w http.ResponseWriter, r *http.Request) {
	var req refreshRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid JSON payload")
		return
	}

	result, err := h.service.Refresh(r.Context(), req.RefreshToken, SessionMetadata{
		UserAgent: r.UserAgent(),
		IP:        remoteIP(r),
	})
	if err != nil {
		switch {
		case errors.Is(err, ErrInvalidRefreshToken):
			writeError(w, http.StatusUnauthorized, err.Error())
		case errors.Is(err, ErrExpiredRefreshToken):
			writeError(w, http.StatusUnauthorized, err.Error())
		default:
			writeError(w, http.StatusInternalServerError, "failed to refresh session")
		}
		return
	}

	writeJSON(w, http.StatusOK, toAuthResponse(result))
}

func (h *Handler) handleLogout(w http.ResponseWriter, r *http.Request) {
	var req refreshRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid JSON payload")
		return
	}

	if err := h.service.Logout(r.Context(), req.RefreshToken); err != nil {
		switch {
		case errors.Is(err, ErrInvalidRefreshToken):
			writeError(w, http.StatusBadRequest, err.Error())
		default:
			writeError(w, http.StatusInternalServerError, "failed to log out")
		}
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func toAuthResponse(result AuthResult) authResponse {
	return authResponse{
		AccessToken:        result.AccessToken,
		RefreshToken:       result.RefreshToken,
		RefreshTokenExpiry: result.RefreshTokenExpiry.UTC().Format(time.RFC3339),
		User: userResponse{
			ID:     result.User.ID.String(),
			Email:  result.User.Email,
			Role:   result.User.Role,
			Status: result.User.Status,
		},
	}
}

func writeJSON(w http.ResponseWriter, status int, payload any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(payload)
}

func writeError(w http.ResponseWriter, status int, message string) {
	writeJSON(w, status, map[string]string{"error": message})
}

func remoteIP(r *http.Request) string {
	ip := r.Header.Get("X-Forwarded-For")
	if ip != "" {
		parts := strings.Split(ip, ",")
		return strings.TrimSpace(parts[0])
	}

	host, _, err := net.SplitHostPort(r.RemoteAddr)
	if err != nil {
		return r.RemoteAddr
	}
	return host
}
