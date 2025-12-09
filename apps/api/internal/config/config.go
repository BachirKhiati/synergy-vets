package config

import (
	"log"
	"os"
	"strings"
	"time"

	"github.com/synergyvets/platform/internal/auth"
	"github.com/synergyvets/platform/internal/logging"
)

// Config captures baseline environment configuration for the API process.
type Config struct {
	HTTPAddr        string
	AllowedOrigins  []string
	ShutdownTimeout time.Duration
	DatabaseURL     string
	LogLevel        string
	LogPretty       bool
	AuthSecret      string
	AuthAccessTTL   time.Duration
	AuthRefreshTTL  time.Duration
}

// Load builds a Config instance from environment variables with sane defaults.
func Load() Config {
	cfg := Config{
		HTTPAddr:        ":8080",
		AllowedOrigins:  []string{"http://localhost:3000"},
		ShutdownTimeout: 10 * time.Second,
		DatabaseURL:     "postgres://postgres:postgres@localhost:5432/synergy_vets?sslmode=disable",
		LogLevel:        "info",
		LogPretty:       false,
		AuthSecret:      "dev-secret-change-me",
		AuthAccessTTL:   15 * time.Minute,
		AuthRefreshTTL:  720 * time.Hour,
	}

	if addr := strings.TrimSpace(os.Getenv("API_HTTP_ADDR")); addr != "" {
		cfg.HTTPAddr = addr
	}

	if origins := strings.TrimSpace(os.Getenv("API_ALLOWED_ORIGINS")); origins != "" {
		cfg.AllowedOrigins = sanitizeList(origins)
	}

	if timeout := strings.TrimSpace(os.Getenv("API_SHUTDOWN_TIMEOUT")); timeout != "" {
		dur, err := time.ParseDuration(timeout)
		if err != nil {
			log.Printf("invalid API_SHUTDOWN_TIMEOUT value %q, falling back to default: %v", timeout, err)
		} else {
			cfg.ShutdownTimeout = dur
		}
	}

	if dbURL := strings.TrimSpace(os.Getenv("DATABASE_URL")); dbURL != "" {
		cfg.DatabaseURL = dbURL
	}

	if level := strings.TrimSpace(os.Getenv("LOG_LEVEL")); level != "" {
		cfg.LogLevel = level
	}

	if pretty := strings.TrimSpace(os.Getenv("LOG_PRETTY")); pretty != "" {
		cfg.LogPretty = strings.EqualFold(pretty, "true") || strings.EqualFold(pretty, "1")
	}

	if secret := strings.TrimSpace(os.Getenv("AUTH_SECRET")); secret != "" {
		cfg.AuthSecret = secret
	}

	if access := strings.TrimSpace(os.Getenv("AUTH_ACCESS_TOKEN_TTL")); access != "" {
		dur, err := time.ParseDuration(access)
		if err != nil {
			log.Printf("invalid AUTH_ACCESS_TOKEN_TTL value %q, keeping default: %v", access, err)
		} else {
			cfg.AuthAccessTTL = dur
		}
	}

	if refresh := strings.TrimSpace(os.Getenv("AUTH_REFRESH_TOKEN_TTL")); refresh != "" {
		dur, err := time.ParseDuration(refresh)
		if err != nil {
			log.Printf("invalid AUTH_REFRESH_TOKEN_TTL value %q, keeping default: %v", refresh, err)
		} else {
			cfg.AuthRefreshTTL = dur
		}
	}

	return cfg
}

// LoggingConfig produces a logging.Config based on the loaded settings.
func (c Config) LoggingConfig() logging.Config {
	return logging.Config{
		Output:        nil,
		Level:         c.LogLevel,
		PrettyConsole: c.LogPretty,
	}
}

// AuthConfig produces an auth.Config based on the loaded settings.
func (c Config) AuthConfig() auth.Config {
	return auth.Config{
		Secret:          c.AuthSecret,
		AccessTokenTTL:  c.AuthAccessTTL,
		RefreshTokenTTL: c.AuthRefreshTTL,
	}
}

func sanitizeList(raw string) []string {
	parts := strings.Split(raw, ",")
	values := make([]string, 0, len(parts))
	for _, part := range parts {
		if trimmed := strings.TrimSpace(part); trimmed != "" {
			values = append(values, trimmed)
		}
	}
	if len(values) == 0 {
		return []string{"http://localhost:3000"}
	}
	return values
}
