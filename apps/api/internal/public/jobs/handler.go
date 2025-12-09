package jobs

import (
	"encoding/json"
	"errors"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
)

// Handler exposes HTTP routes for public job listings.
type Handler struct {
	service *Service
}

// NewHandler constructs a Handler backed by the provided service.
func NewHandler(service *Service) *Handler {
	return &Handler{service: service}
}

// RegisterRoutes mounts the job routes on the supplied router.
func (h *Handler) RegisterRoutes(r chi.Router) {
	r.Get("/jobs", h.handleListJobs)
	r.Get("/jobs/{slug}", h.handleGetJob)
}

func (h *Handler) handleListJobs(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	query := r.URL.Query()

	page := parseInt(query.Get("page"), 1)
	pageSize := parseInt(query.Get("page_size"), 20)

	params := ListParams{
		Page:          page,
		PageSize:      pageSize,
		Search:        query.Get("q"),
		Countries:     query["country"],
		ContractTypes: query["contract_type"],
	}

	result, err := h.service.ListPublishedJobs(ctx, params)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to load jobs")
		return
	}

	writeJSON(w, http.StatusOK, result)
}

func (h *Handler) handleGetJob(w http.ResponseWriter, r *http.Request) {
	slug := chi.URLParam(r, "slug")

	job, err := h.service.GetPublishedJob(r.Context(), slug)
	if err != nil {
		switch {
		case errors.Is(err, ErrJobNotFound):
			writeError(w, http.StatusNotFound, err.Error())
		default:
			writeError(w, http.StatusInternalServerError, "failed to load job")
		}
		return
	}

	writeJSON(w, http.StatusOK, job)
}

func parseInt(value string, fallback int) int {
	if value == "" {
		return fallback
	}

	parsed, err := strconv.Atoi(value)
	if err != nil {
		return fallback
	}
	return parsed
}

func writeJSON(w http.ResponseWriter, status int, payload any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(payload)
}

func writeError(w http.ResponseWriter, status int, message string) {
	writeJSON(w, status, map[string]string{"error": message})
}
