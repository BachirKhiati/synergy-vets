package auth

import (
	"context"
	"errors"
	"net/http"
	"strings"

	"github.com/google/uuid"
)

type contextKey string

const userContextKey contextKey = "auth.user"

// UserContext stores authenticated user metadata for downstream handlers.
type UserContext struct {
	ID    uuid.UUID
	Email string
	Role  string
}

// UserFromContext extracts the authenticated user context if present.
func UserFromContext(ctx context.Context) (UserContext, bool) {
	value := ctx.Value(userContextKey)
	if value == nil {
		return UserContext{}, false
	}

	user, ok := value.(UserContext)
	return user, ok
}

// RequireStaff validates the bearer token and enforces staff-level access.
func (h *Handler) RequireStaff(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		header := strings.TrimSpace(r.Header.Get("Authorization"))
		if header == "" {
			writeError(w, http.StatusUnauthorized, "missing authorization header")
			return
		}

		if !strings.HasPrefix(strings.ToLower(header), "bearer ") {
			writeError(w, http.StatusUnauthorized, "bearer token required")
			return
		}

		token := strings.TrimSpace(header[7:])
		user, err := h.service.ValidateAccessToken(r.Context(), token)
		if err != nil {
			switch {
			case errors.Is(err, ErrAccessTokenExpired):
				writeError(w, http.StatusUnauthorized, err.Error())
			case errors.Is(err, ErrInvalidAccessToken):
				writeError(w, http.StatusUnauthorized, err.Error())
			case errors.Is(err, ErrInactiveAccount):
				writeError(w, http.StatusForbidden, err.Error())
			default:
				writeError(w, http.StatusUnauthorized, "unauthorized")
			}
			return
		}

		role := strings.ToLower(user.Role)
		if role != "staff" && role != "admin" {
			writeError(w, http.StatusForbidden, ErrForbidden.Error())
			return
		}

		ctxUser := UserContext{ID: user.ID, Email: user.Email, Role: user.Role}
		ctx := context.WithValue(r.Context(), userContextKey, ctxUser)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
