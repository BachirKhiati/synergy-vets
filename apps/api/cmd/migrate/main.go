package main

import (
	"context"
	"os"
	"time"

	"github.com/synergyvets/platform/internal/config"
	appdb "github.com/synergyvets/platform/internal/db"
	"github.com/synergyvets/platform/internal/logging"
)

func main() {
	cfg := config.Load()
	logger := logging.New(cfg.LoggingConfig()).With().Str("component", "migrate").Logger()

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	db, err := appdb.Connect(ctx, cfg.DatabaseURL)
	if err != nil {
		logger.Error().Err(err).Msg("database connection failed")
		os.Exit(1)
	}
	defer func() {
		if err := db.Close(); err != nil {
			logger.Warn().Err(err).Msg("error closing database")
		}
	}()

	if err := appdb.Migrate(db); err != nil {
		logger.Error().Err(err).Msg("migration failed")
		os.Exit(1)
	}

	logger.Info().Msg("database migrations applied successfully")
}
