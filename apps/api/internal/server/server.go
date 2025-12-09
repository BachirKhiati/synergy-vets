package server

import (
	"net/http"
	"time"

	"github.com/rs/zerolog"

	"github.com/synergyvets/platform/internal/auth"
	"github.com/synergyvets/platform/internal/public/jobs"
)

// Config instructs the HTTP server how to run.
type Config struct {
	Addr           string
	AllowedOrigins []string
	Logger         zerolog.Logger
	AuthHandler    *auth.Handler
	PublicJobs     *jobs.Handler
}

// New constructs the API HTTP server with standard middleware and baseline routes.
func New(cfg Config) *http.Server {
	if cfg.Addr == "" {
		cfg.Addr = ":8080"
	}
	return &http.Server{
		Addr:         cfg.Addr,
		Handler:      newRouter(cfg),
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}
}
