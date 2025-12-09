# Synergy Vets Platform

Modern mono-repo powering the reimagined Synergy Vets experience, pairing a Next.js 16 frontend with a Go 1.25 chi-based API.

## Stack Overview
- Next.js 16 App Router with Tailwind CSS 4, Radix UI Themes, Framer Motion, and React 19
- Go 1.25 backend using go-chi, structured config, and modular routing
- PostgreSQL 18 (planned), Asynq background jobs (planned)
- npm workspaces for frontend management, Go modules for backend

## Repository Layout
```
apps/
  web/      Next.js application (frontend)
  api/      Go chi API server (backend)
```

## Getting Started
1. Install dependencies
   ```bash
   npm install
   npm --prefix apps/web install
   go mod tidy ./apps/api
   ```
2. Launch the web application
   ```bash
   npm run dev:web
   ```
3. Launch backing services (Postgres, Redis, MinIO, Mailhog)
   ```bash
   docker compose -f infra/docker-compose.yml up -d postgres redis minio mailhog
   ```

4. Apply database migrations (requires Docker services running or PostgreSQL available at `DATABASE_URL`):
   ```bash
   cd apps/api
   go run ./cmd/migrate
   ```

5. Launch the API server
   ```bash
   cd apps/api
   go run ./cmd/api
   ```

6. Regenerate SQL query layer (requires Go 1.25, no CGO):
   ```bash
   cd apps/api
   CGO_ENABLED=0 go run github.com/sqlc-dev/sqlc/cmd/sqlc@v1.27.0 generate
   ```

## Configuration
The API reads the following environment variables (all optional):
- `API_HTTP_ADDR` — listen address (default `:8080`)
- `API_ALLOWED_ORIGINS` — comma separated list for CORS (default `http://localhost:3000`)
- `API_SHUTDOWN_TIMEOUT` — graceful shutdown window (default `10s`)
- `DATABASE_URL` — PostgreSQL connection string (default provided for local compose stack)
- `LOG_LEVEL` — zerolog level (default `info`)
- `LOG_PRETTY` — enable console formatting (`false` by default)
- `AUTH_SECRET` — HMAC secret for signing JWTs (default `dev-secret-change-me`)
- `AUTH_ACCESS_TOKEN_TTL` — access token lifetime duration string (default `15m`)
- `AUTH_REFRESH_TOKEN_TTL` — refresh token lifetime duration string (default `720h`)

### Docker Compose services

Run migrations against the compose database with:

```bash
docker compose -f infra/docker-compose.yml run --rm migrate
```

Stop services when finished:

```bash
docker compose -f infra/docker-compose.yml down
```

Frontend environment variables live in `apps/web/.env.local` using Next.js conventions:
- `NEXT_PUBLIC_API_BASE_URL` — base URL for the Go API (defaults to `http://localhost:8080`).

### API Endpoints (preview)
- `GET /api/v1/public/jobs` — paginated published jobs with optional filters:
   - `page` (default `1`), `page_size` (default `20`, max `100`)
   - `q` full-text search across title, summary, and location
   - `country` repeatable (e.g. `country=UK&country=Australia`)
   - `contract_type` repeatable (e.g. `contract_type=Permanent`)
   Returns `{ jobs, page, page_size, total, has_more }`.
- `POST /api/v1/auth/register` — create a new user, returning access/refresh tokens.
- `POST /api/v1/auth/login` — authenticate existing user, rotate tokens.
- `POST /api/v1/auth/refresh` — exchange refresh token for new access/refresh pair.
- `POST /api/v1/auth/logout` — revoke the session tied to a refresh token.
- `GET /api/v1/staff/announcements` — protected route (requires staff/admin bearer token), currently returns `501` placeholder.

## Next Steps
- Design schema and migrations for jobs, announcements, and CMS content
- Implement AuthN/AuthZ (JWT, refresh tokens, role-based guards) on the API
- Scaffold shared UI primitives and data fetching hooks on the frontend
- Introduce Docker Compose for Postgres, MinIO, Mailhog, and dev parity services
- Build ingestion workers for Synergy Vets + GVC content synchronisation
- Finalise data access layer tooling (SQLC/pgx) and repository abstractions
- Wire API handlers to the generated query layer and transaction helper
