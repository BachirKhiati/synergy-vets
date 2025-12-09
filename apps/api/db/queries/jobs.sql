-- name: CreateJob :one
INSERT INTO jobs (
    title,
    slug,
    summary,
    description,
    location_id,
    contract_type,
    work_pattern,
    salary_min,
    salary_max,
    currency,
    status,
    source,
    source_ref,
    posted_at,
    expires_at
) VALUES (
    sqlc.arg('title'),
    sqlc.arg('slug'),
    sqlc.narg('summary')::text,
    sqlc.arg('description'),
    sqlc.narg('location_id')::bigint,
    sqlc.narg('contract_type')::text,
    sqlc.narg('work_pattern')::text,
    sqlc.narg('salary_min')::integer,
    sqlc.narg('salary_max')::integer,
    sqlc.narg('currency')::text,
    COALESCE(sqlc.narg('status')::text, 'draft'),
    sqlc.narg('source')::text,
    sqlc.narg('source_ref')::text,
    sqlc.narg('posted_at')::timestamptz,
    sqlc.narg('expires_at')::timestamptz
)
RETURNING *;

-- name: ListPublishedJobs :many
SELECT
    j.id,
    j.title,
    j.slug,
    j.summary,
    j.description,
    j.location_id,
    j.contract_type,
    j.work_pattern,
    j.salary_min,
    j.salary_max,
    j.currency,
    j.status,
    j.source,
    j.source_ref,
    j.posted_at,
    j.expires_at,
    j.created_at,
    j.updated_at,
    jl.country,
    jl.region,
    jl.city,
    COUNT(*) OVER() AS total_count
FROM jobs j
LEFT JOIN job_locations jl ON jl.id = j.location_id
WHERE j.status = 'published'
  AND (
        sqlc.narg('search')::text IS NULL
        OR j.title ILIKE '%' || sqlc.narg('search')::text || '%'
        OR j.summary ILIKE '%' || sqlc.narg('search')::text || '%'
        OR jl.city ILIKE '%' || sqlc.narg('search')::text || '%'
        OR jl.country ILIKE '%' || sqlc.narg('search')::text || '%'
    )
  AND (
        sqlc.narg('countries')::text[] IS NULL
        OR EXISTS (
            SELECT 1
            FROM unnest(sqlc.narg('countries')::text[]) AS value
            WHERE jl.country ILIKE '%' || value || '%'
        )
    )
  AND (
        sqlc.narg('contract_types')::text[] IS NULL
        OR j.contract_type = ANY(sqlc.narg('contract_types')::text[])
    )
ORDER BY j.posted_at DESC NULLS LAST, j.created_at DESC
LIMIT sqlc.arg('limit_rows')::int OFFSET sqlc.arg('offset_rows')::int;

-- name: GetJobBySlug :one
SELECT j.*,
       jl.country,
       jl.region,
       jl.city
FROM jobs j
LEFT JOIN job_locations jl ON jl.id = j.location_id
WHERE j.slug = sqlc.arg(slug)
    AND j.status = 'published'
LIMIT 1;
