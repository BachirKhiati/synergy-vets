package server

import (
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/rs/zerolog"
)

func newRouter(cfg Config) chi.Router {
	r := chi.NewRouter()

	allowedOrigins := cfg.AllowedOrigins
	if len(allowedOrigins) == 0 {
		allowedOrigins = []string{"http://localhost:3000"}
	}

	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(requestLogger(cfg.Logger))
	r.Use(middleware.Recoverer)
	r.Use(middleware.Timeout(60 * time.Second))
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   allowedOrigins,
		AllowedMethods:   []string{http.MethodGet, http.MethodPost, http.MethodPut, http.MethodPatch, http.MethodDelete, http.MethodOptions},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300,
	}))

	r.Get("/healthz", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte(`{"status":"ok"}`))
	})

	r.Route("/api/v1", func(r chi.Router) {
		if cfg.AuthHandler != nil {
			r.Route("/auth", cfg.AuthHandler.Routes)
		}

		r.Route("/public", func(r chi.Router) {
			if cfg.PublicJobs != nil {
				cfg.PublicJobs.RegisterRoutes(r)
			} else {
				r.Get("/jobs", notImplemented)
			}

			r.Get("/articles", notImplemented)
		})

		r.Route("/staff", func(r chi.Router) {
			if cfg.AuthHandler != nil {
				r.Use(cfg.AuthHandler.RequireStaff)
				r.Get("/announcements", notImplemented)
			} else {
				r.Get("/announcements", unauthorized)
			}
		})
	})

	return r
}

func notImplemented(w http.ResponseWriter, _ *http.Request) {
	w.WriteHeader(http.StatusNotImplemented)
}

func unauthorized(w http.ResponseWriter, _ *http.Request) {
	w.WriteHeader(http.StatusUnauthorized)
}

func requestLogger(logger zerolog.Logger) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			start := time.Now()
			wr := middleware.NewWrapResponseWriter(w, r.ProtoMajor)

			next.ServeHTTP(wr, r)

			duration := time.Since(start)
			status := wr.Status()
			event := logger.Info()
			switch {
			case status >= http.StatusInternalServerError:
				event = logger.Error()
			case status >= http.StatusBadRequest:
				event = logger.Warn()
			}

			if requestID := middleware.GetReqID(r.Context()); requestID != "" {
				event = event.Str("request_id", requestID)
			}

			event.
				Str("method", r.Method).
				Str("path", r.URL.Path).
				Int("status", status).
				Dur("duration", duration).
				Str("remote_ip", r.RemoteAddr).
				Str("proto", r.Proto).
				Str("agent", r.UserAgent()).
				Msg("http_request")
		})
	}
}
