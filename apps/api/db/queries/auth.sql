-- User session management queries

-- name: CreateUserSession :one
INSERT INTO user_sessions (
    user_id,
    refresh_token_hash,
    user_agent,
    ip,
    expires_at
) VALUES (
    $1,
    $2,
    $3,
    $4,
    $5
)
RETURNING id, user_id, refresh_token_hash, user_agent, ip, expires_at, created_at;

-- name: DeleteUserSession :exec
DELETE FROM user_sessions
WHERE id = $1;

-- name: DeleteUserSessionsByUserID :exec
DELETE FROM user_sessions
WHERE user_id = $1;

-- name: GetUserSessionByHash :one
SELECT id, user_id, refresh_token_hash, user_agent, ip, expires_at, created_at
FROM user_sessions
WHERE refresh_token_hash = $1
LIMIT 1;

-- name: DeleteUserSessionByHash :exec
DELETE FROM user_sessions
WHERE refresh_token_hash = $1;
