# Docker Development Environment

This project ships with a Docker-based workflow for the API and backing services, while the Vite web app runs locally on the host.

## Prerequisites

- Docker Desktop 4.28+ (or any Docker Engine with Compose v2).
- Ports 18081, 15433, 16379, 19000/19001, and 18125/11125 available on the host (reserve 13001 for the locally run web app).

## One-Time Setup

Build the containers and start the stack:

```sh
docker compose up --build
```

Docker will:

- Provision Postgres, Redis, MinIO, and Mailhog.
- Run database migrations against Postgres.
- Launch the Go API with [Air](https://github.com/cosmtrek/air) for automatic rebuilds.
- Leave the Vite app for you to run locally (see below).

## Day-to-Day Commands

- Start services in the background:
  ```sh
  docker compose up -d
  ```
- Stop everything:
  ```sh
  docker compose down
  ```
- Tail logs for the API:
  ```sh
  docker compose logs -f api
  ```
- Rebuild after dependency changes:
  ```sh
  docker compose build api
  ```
- Run the web app locally (from the repo root):
  ```sh
  npm install
  npm --prefix apps/web run dev
  ```

## Environment Notes

- The API is available on http://localhost:18081.
- The web app runs locally on http://localhost:13001. Configure any API base URLs in the Vite environment (e.g. `VITE_API_BASE_URL`) as needed for local development.
- Postgres listens on localhost:15433 (container port 5432).
- Migrations run automatically on startup via the `migrate` service. Re-run manually with:
  ```sh
  docker compose run --rm migrate
  ```
- Mailhog UI is available on http://localhost:18125 and listens for SMTP on localhost:11125.
- Named volumes (`postgres_data`, `minio_data`, `go_mod_cache`, `go_build_cache`) persist state and caches across restarts. Remove them with `docker compose down -v` when you need a clean slate.
