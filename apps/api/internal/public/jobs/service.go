package jobs

import (
	"context"
	"database/sql"
	"errors"
	"strings"
	"time"

	"github.com/google/uuid"

	"github.com/synergyvets/platform/internal/queries"
	"github.com/synergyvets/platform/internal/store"
)

// Service exposes read-only job listings for public consumers.
type Service struct {
	store *store.Store
}

// NewService constructs a Service backed by the shared Store.
func NewService(store *store.Store) *Service {
	return &Service{store: store}
}

// ListParams controls pagination and filtering of published jobs.
type ListParams struct {
	Page          int
	PageSize      int
	Search        string
	Countries     []string
	ContractTypes []string
}

// Job represents a job listing for public consumption.
type Job struct {
	ID           uuid.UUID `json:"id"`
	Title        string    `json:"title"`
	Slug         string    `json:"slug"`
	Summary      *string   `json:"summary,omitempty"`
	Description  string    `json:"description"`
	ContractType *string   `json:"contract_type,omitempty"`
	WorkPattern  *string   `json:"work_pattern,omitempty"`
	SalaryMin    *int32    `json:"salary_min,omitempty"`
	SalaryMax    *int32    `json:"salary_max,omitempty"`
	Currency     *string   `json:"currency,omitempty"`
	PostedAt     *string   `json:"posted_at,omitempty"`
	ExpiresAt    *string   `json:"expires_at,omitempty"`
	Location     Location  `json:"location"`
}

// JobDetail adds metadata fields for a single job response.
type JobDetail struct {
	Job
	Source    *string `json:"source,omitempty"`
	SourceRef *string `json:"source_ref,omitempty"`
	CreatedAt string  `json:"created_at"`
	UpdatedAt string  `json:"updated_at"`
}

// ErrJobNotFound indicates no published job matched the provided slug.
var ErrJobNotFound = errors.New("job not found")

// Location captures location metadata when available.
type Location struct {
	Country *string `json:"country,omitempty"`
	Region  *string `json:"region,omitempty"`
	City    *string `json:"city,omitempty"`
}

// ListResult returns the paginated job listings.
type ListResult struct {
	Jobs     []Job `json:"jobs"`
	Page     int   `json:"page"`
	PageSize int   `json:"page_size"`
	Total    int64 `json:"total"`
	HasMore  bool  `json:"has_more"`
}

// ListPublishedJobs retrieves published jobs based on the provided filters.
func (s *Service) ListPublishedJobs(ctx context.Context, params ListParams) (ListResult, error) {
	page := params.Page
	if page < 1 {
		page = 1
	}

	pageSize := params.PageSize
	if pageSize <= 0 {
		pageSize = 20
	}
	if pageSize > 100 {
		pageSize = 100
	}

	offset := int32((page - 1) * pageSize)
	limit := int32(pageSize)

	search := sql.NullString{}
	if trimmed := strings.TrimSpace(params.Search); trimmed != "" {
		search = sql.NullString{String: trimmed, Valid: true}
	}

	countries := normalizeList(params.Countries)
	contractTypes := normalizeList(params.ContractTypes)

	rows, err := s.store.Queries().ListPublishedJobs(ctx, queries.ListPublishedJobsParams{
		Search:        search,
		Countries:     countries,
		ContractTypes: contractTypes,
		OffsetRows:    offset,
		LimitRows:     limit,
	})
	if err != nil {
		return ListResult{}, err
	}

	jobs := make([]Job, 0, len(rows))
	var total int64
	for _, row := range rows {
		if total == 0 {
			total = row.TotalCount
		}

		job := Job{
			ID:          row.ID,
			Title:       row.Title,
			Slug:        row.Slug,
			Description: row.Description,
			Location: Location{
				Country: nullableString(row.Country),
				Region:  nullableString(row.Region),
				City:    nullableString(row.City),
			},
		}

		if row.Summary.Valid {
			summary := row.Summary.String
			job.Summary = &summary
		}
		if row.ContractType.Valid {
			value := row.ContractType.String
			job.ContractType = &value
		}
		if row.WorkPattern.Valid {
			value := row.WorkPattern.String
			job.WorkPattern = &value
		}
		if row.SalaryMin.Valid {
			value := row.SalaryMin.Int32
			job.SalaryMin = &value
		}
		if row.SalaryMax.Valid {
			value := row.SalaryMax.Int32
			job.SalaryMax = &value
		}
		if row.Currency.Valid {
			value := row.Currency.String
			job.Currency = &value
		}
		if row.PostedAt.Valid {
			value := row.PostedAt.Time.UTC().Format(time.RFC3339)
			job.PostedAt = &value
		}
		if row.ExpiresAt.Valid {
			value := row.ExpiresAt.Time.UTC().Format(time.RFC3339)
			job.ExpiresAt = &value
		}

		jobs = append(jobs, job)
	}

	hasMore := int64(offset)+int64(len(jobs)) < total

	return ListResult{
		Jobs:     jobs,
		Page:     page,
		PageSize: pageSize,
		Total:    total,
		HasMore:  hasMore,
	}, nil
}

// GetPublishedJob retrieves a single published job by its slug.
func (s *Service) GetPublishedJob(ctx context.Context, slug string) (JobDetail, error) {
	result := JobDetail{}
	normalized := strings.TrimSpace(slug)
	if normalized == "" {
		return result, ErrJobNotFound
	}

	row, err := s.store.Queries().GetJobBySlug(ctx, normalized)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return result, ErrJobNotFound
		}
		return result, err
	}

	if strings.ToLower(row.Status) != "published" {
		return result, ErrJobNotFound
	}

	job := Job{
		ID:          row.ID,
		Title:       row.Title,
		Slug:        row.Slug,
		Description: row.Description,
		Location: Location{
			Country: nullableString(row.Country),
			Region:  nullableString(row.Region),
			City:    nullableString(row.City),
		},
	}

	if row.Summary.Valid {
		summary := row.Summary.String
		job.Summary = &summary
	}
	if row.ContractType.Valid {
		value := row.ContractType.String
		job.ContractType = &value
	}
	if row.WorkPattern.Valid {
		value := row.WorkPattern.String
		job.WorkPattern = &value
	}
	if row.SalaryMin.Valid {
		value := row.SalaryMin.Int32
		job.SalaryMin = &value
	}
	if row.SalaryMax.Valid {
		value := row.SalaryMax.Int32
		job.SalaryMax = &value
	}
	if row.Currency.Valid {
		value := row.Currency.String
		job.Currency = &value
	}
	if row.PostedAt.Valid {
		value := row.PostedAt.Time.UTC().Format(time.RFC3339)
		job.PostedAt = &value
	}
	if row.ExpiresAt.Valid {
		value := row.ExpiresAt.Time.UTC().Format(time.RFC3339)
		job.ExpiresAt = &value
	}

	detail := JobDetail{
		Job:       job,
		CreatedAt: row.CreatedAt.UTC().Format(time.RFC3339),
		UpdatedAt: row.UpdatedAt.UTC().Format(time.RFC3339),
	}

	if row.Source.Valid {
		value := row.Source.String
		detail.Source = &value
	}
	if row.SourceRef.Valid {
		value := row.SourceRef.String
		detail.SourceRef = &value
	}

	return detail, nil
}

func normalizeList(values []string) []string {
	clean := make([]string, 0, len(values))
	for _, value := range values {
		trimmed := strings.TrimSpace(value)
		if trimmed == "" {
			continue
		}
		clean = append(clean, trimmed)
	}
	if len(clean) == 0 {
		return nil
	}
	return clean
}

func nullableString(value sql.NullString) *string {
	if value.Valid {
		v := value.String
		return &v
	}
	return nil
}
