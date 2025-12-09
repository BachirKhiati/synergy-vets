-- name: CreateUser :one
INSERT INTO users (
    email,
    password_hash,
    role,
    status
) VALUES (
    sqlc.arg('email'),
    sqlc.arg('password_hash'),
    COALESCE(sqlc.narg('role')::text, 'seeker'),
    COALESCE(sqlc.narg('status')::text, 'active')
)
RETURNING *;

-- name: GetUserByEmail :one
SELECT *
FROM users
WHERE email = sqlc.arg(email)
LIMIT 1;

-- name: GetUserByID :one
SELECT id, email, password_hash, role, status, last_login_at, created_at, updated_at
FROM users
WHERE id = sqlc.arg(id)
LIMIT 1;

-- name: UpdateUserLastLogin :exec
UPDATE users
SET last_login_at = NOW(),
    updated_at = NOW()
WHERE id = sqlc.arg(id);
