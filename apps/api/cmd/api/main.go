package main

import (
	"context"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/synergyvets/platform/internal/auth"
	"github.com/synergyvets/platform/internal/config"
	"github.com/synergyvets/platform/internal/db"
	"github.com/synergyvets/platform/internal/logging"
	"github.com/synergyvets/platform/internal/public/jobs"
	"github.com/synergyvets/platform/internal/server"
	"github.com/synergyvets/platform/internal/store"
)

func main() {
	cfg := config.Load()
	baseLogger := logging.New(cfg.LoggingConfig())
	logger := baseLogger.With().Str("component", "api").Logger()
	startedAt := time.Now()

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	dbConn, err := db.Connect(ctx, cfg.DatabaseURL)
	if err != nil {
		logger.Fatal().Err(err).Msg("database connection failed")
	}
	defer func() {
		if err := dbConn.Close(); err != nil {
			logger.Warn().Err(err).Msg("error closing database")
		}
	}()

	store := store.New(dbConn)
	authLogger := logger.With().Str("module", "auth").Logger()
	authService := auth.NewService(store, authLogger, cfg.AuthConfig())
	authHandler := auth.NewHandler(authService)
	publicJobsService := jobs.NewService(store)
	publicJobsHandler := jobs.NewHandler(publicJobsService)
	srv := server.New(server.Config{
		Addr:           cfg.HTTPAddr,
		AllowedOrigins: cfg.AllowedOrigins,
		Logger:         logger,
		AuthHandler:    authHandler,
		PublicJobs:     publicJobsHandler,
	})

	sigCh := make(chan os.Signal, 1)
	signal.Notify(sigCh, os.Interrupt, syscall.SIGTERM)

	go func() {
		logger.Info().Str("addr", cfg.HTTPAddr).Msg("api server listening")
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			logger.Error().Err(err).Msg("server error")
		}
	}()

	sig := <-sigCh
	logger.Info().Str("signal", sig.String()).Msg("shutdown signal received")

	shutdownCtx, shutdownCancel := context.WithTimeout(context.Background(), cfg.ShutdownTimeout)
	defer shutdownCancel()

	if err := srv.Shutdown(shutdownCtx); err != nil {
		logger.Error().Err(err).Msg("graceful shutdown failed")
		os.Exit(1)
	}

	logger.Info().Dur("uptime", time.Since(startedAt)).Msg("server stopped cleanly")
}
