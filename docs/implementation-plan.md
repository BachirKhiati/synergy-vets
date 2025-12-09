# Synergy Vets Platform — Comprehensive Implementation Guide

## 1. Product Vision & Objectives
- **Goal**: Reimagine the Synergy Vets experience with a modern, global recruitment platform blending marketing, job discovery, and secure staff collaboration.
- **Primary Outcomes**:
  - Futuristic, responsive web presence inspired by GVC’s aesthetic with Synergy’s content depth.
  - Unified backend powering public marketing content, job feeds, applications, and staff communications.
  - Secure staff portal for announcements, candidate tracking, and content governance.
  - Automated ingestion of legacy content (jobs, articles, resources) for continuity.

## 2. User Personas & Journeys
- **Job Seekers**: Discover roles, manage profiles, submit applications, track status, access resources.
- **Employers**: Learn services, submit vacancies, access partner resources, engage staff announcements (optional read access).
- **Staff (Recruiters/Admins)**: Curate content, post announcements, manage jobs & applicants, oversee analytics.
- **System Integrations**: Content ingestion workers syncing with existing public sources (synergyvets.com, gvcvets.com) for jobs/articles.

## 3. Functional Requirements
### 3.1 Public Marketing & Discovery
- Landing page hero, stats, featured roles, services, testimonials, partner grid, insights, enquiry CTA, global footprint map.
- Job listings with filters (location, contract type, pay band, specialty, remote availability) and job detail pages.
- Resource hub (articles, guides, announcements) with categories and search.
- About/team, contact forms, employer services microsites, global region pages.

### 3.2 Job Seeker Experience
- Account creation, email verification, secure login, optional social sign-in (future).
- Profile builder (personal info, experience, certifications, documents, location preferences, availability).
- CV/resume upload & parsing (initial manual upload, future parse service).
- Saved jobs, application history, notifications, announcements feed.
- Application submission forms with dynamic questions per role.

### 3.3 Staff Portal
- Dashboard summarizing active roles, applications pipeline, announcements.
- Job management CRUD (bulk import, draft/publish scheduling, tagging).
- Candidate management (application review, notes, status transitions, email triggers).
- Announcement composer with segmentation (public, seekers, internal staff-only) and scheduling.
- Content CMS-lite interface for marketing sections (hero text, partners, testimonials).

### 3.4 Employer Interaction
- Public lead capture forms (register vacancy, partnership enquiries) feeding backend queue & email alerts.
- Optional employer login (phase 3) for progress tracking and content access.

### 3.5 Content Ingestion & Migration
- Initial ingestion of synergyvets.com job listings, resources, and announcements into structured data.
- Weekly/automated sync pipeline with deduplication, delta updates, error reporting.
- Manual override capabilities for staff to edit imported records.

## 4. Non-Functional Requirements
- **Performance**: ≤200ms backend response for cached public content; job search under 500ms for typical filters.
- **Scalability**: Horizontal scaling for API and frontend via containers; background workers for ingestion.
- **Security**: JWT access/refresh tokens, hashed secrets, audit logs, GDPR compliance, encrypted storage for files.
- **Reliability**: Automated backups, health checks, graceful shutdown, observability instrumentation.
- **Accessibility**: WCAG 2.1 AA alignment, keyboard navigation, semantic HTML, ARIA patterns.

## 5. Architecture Overview
```
repo (npm workspace + Go module)
├─ apps/web          # Next.js 16 frontend (App Router)
├─ apps/api          # Go 1.25 chi API
├─ docs/             # Documentation & ADRs
├─ packages/         # (future) shared TS or Go libs
└─ infra/            # (future) IaC, docker compose
```
- **Frontend**: Next.js 16 w/ React 19, Tailwind 4, Radix UI Themes, Framer Motion; App Router w/ server actions, ISR for CMS pages, TRPC (optional) or REST fetchers.
- **Backend**: Go chi REST API, layered architecture (handler → service → repository), PostgreSQL 18 via pgx, Redis/Upstash for cache, Asynq for background tasks, S3-compatible storage for uploads (MinIO dev, AWS S3 prod).
- **Auth**: JWT (short-lived access + long-lived refresh), httpOnly secure cookies, rotation, device/session tracking. Password hashing via argon2id. Optional 2FA via TOTP (phase 3).
- **Content Delivery**: CDN for static assets, Next.js image optimization, caching headers from API for public endpoints.

## 6. Infrastructure & DevOps
- **Environments**: local, staging, production.
- **Containerization**: Dockerfiles for web & api; docker-compose for local stack (web, api, postgres, redis, minio, mailhog, asynqmon).
- **CI/CD (GitHub Actions)**:
  - Workflow: lint/test (frontend & backend) → build artifacts → integration tests → deploy staging → manual approval → deploy production.
  - DB migrations with golang-migrate; ensure zero-downtime practices.
- **Observability**: Structured logging (zerolog), metrics via Prometheus/OpenTelemetry, Sentry for error tracking.
- **Secrets**: Dotenv for local, 1Password/Vercel env for frontend, AWS SSM or Doppler for backend.

## 7. Security & Compliance
- Role-based access guards (`public`, `seeker`, `staff_admin`, `staff_editor`).
- CSRF protection on cookie-auth endpoints; use double-submit tokens for sensitive forms.
- Input validation & sanitization (go-playground/validator + Zod on frontend).
- Audit logs for staff actions (CRUD on jobs, announcements, candidates).
- Data retention & deletion policy for candidate info; GDPR request workflows.

## 8. Data Model (Initial Draft)
- **users**: id, email, password_hash, role, status, metadata, created_at, updated_at.
- **user_sessions**: id, user_id, refresh_token_hash, user_agent, ip, expires_at.
- **user_profiles**: user_id FK, personal details, bio, specialties, region prefs.
- **documents**: id, user_id, type, storage_key, filename, mime_type, created_at.
- **jobs**: id, title, slug, description, location_id, contract_type, salary_min/max, currency, status, source, posted_at, expires_at.
- **job_locations**: id, country, region, city, lat, lng.
- **job_tags**: id, label.
- **job_job_tags**: job_id, tag_id.
- **job_applications**: id, job_id, user_id, status, cover_letter, notes, submitted_at, source.
- **application_events**: id, application_id, status_from, status_to, staff_user_id, comment, created_at.
- **announcements**: id, title, body, audience, publish_at, expires_at, created_by.
- **resources**: id, title, slug, summary, body, category, hero_image_id, published_at.
- **testimonials**, **partners**, **page_sections** for marketing content.
- **ingestion_jobs**: id, source, payload, status, processed_at, error_message.

## 9. API Surface (v1 Outline)
### Public Endpoints
- `GET /healthz`
- `GET /api/v1/public/jobs` — query params (page, q, location, contract_type, salary_min/max, tags).
- `GET /api/v1/public/jobs/{slug}`
- `GET /api/v1/public/resources` & `/resources/{slug}`
- `POST /api/v1/public/leads/employer` (rate-limited, captcha)
- `POST /api/v1/public/leads/candidate`

### Auth & Session
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`
- `POST /api/v1/auth/logout`
- `POST /api/v1/auth/forgot-password`
- `POST /api/v1/auth/reset-password`

### Seeker (JWT required)
- `GET/PUT /api/v1/seeker/profile`
- `POST /api/v1/seeker/documents`
- `DELETE /api/v1/seeker/documents/{id}`
- `GET /api/v1/seeker/applications`
- `POST /api/v1/seeker/applications`
- `GET /api/v1/seeker/announcements`

### Staff (JWT + role guard)
- `GET /api/v1/staff/dashboard/summary`
- `CRUD /api/v1/staff/jobs`
- `POST /api/v1/staff/jobs/import`
- `GET /api/v1/staff/applications`
- `PATCH /api/v1/staff/applications/{id}` (status updates, notes)
- `CRUD /api/v1/staff/announcements`
- `CRUD /api/v1/staff/resources`
- `GET /api/v1/staff/audit-logs`

### System
- `POST /api/v1/system/ingestion/run` (secured via internal token or mTLS, used by workers)

## 10. Frontend Structure
- **Global Layout**: Theme provider, navigation, footer, global modals (auth, announcements).
- **Pages**:
  - `/` (landing)
  - `/jobs` + `/jobs/[slug]`
  - `/regions/[region]`
  - `/insights`, `/insights/[slug]`
  - `/about`, `/team`, `/contact`, `/employers`
  - `/auth/login`, `/auth/register`, `/auth/reset`
  - `/dashboard` (layout) → `/dashboard/profile`, `/dashboard/applications`, `/dashboard/announcements`
  - `/staff` (layout) → subroutes for jobs, applicants, announcements, content
- **Shared Components**: Theme tokens, navigation, CTA cards, job cards, form controls, charts (future), map visualization (Mapbox/Leaflet), announcement banners, modals.
- **State/Data**: React Query (TanStack) with SSR hydration; Zod schemas for validation; server actions for auth flows where applicable.

## 11. Content Ingestion Strategy
1. **Discovery**: Map sitemaps/RSS endpoints for synergyvets.com & gvcvets.com.
2. **Scraper Workers** (Go or TS): fetch HTML/JSON, parse using goquery/colly or HTTP clients.
3. **Normalization**: Convert to canonical job/resource schema; dedupe via slug + hash.
4. **Persistence**: Upsert into staging tables (`staging_jobs`, etc.), flag manual review items.
5. **Publishing Workflow**: Staff portal to review & promote staged content to live tables.
6. **Scheduling**: Cron-based (Asynq periodic tasks) to refresh daily/weekly; manual trigger endpoint.
7. **Monitoring**: Log success/error counts, alert on failures.

## 12. Testing & QA Plan
- **Unit Tests**: Go (services, repositories), React component tests (Vitest + Testing Library).
- **Integration Tests**: API HTTP handlers with httptest, database-backed tests using testcontainers.
- **E2E**: Playwright journeys (public, seeker, staff) with seeded data.
- **Contract Tests**: Schemas validated via OpenAPI; generated client for frontend.
- **Performance Tests**: k6 or Vegeta scenarios for job search, auth, ingestion.
- **Security Tests**: Automated dependency scanning, OWASP ZAP baseline, static analysis (gosec, eslint security rules).

## 13. Delivery Roadmap
- **Phase 0 — Foundations (current)**
  - Finalize architecture, environment setup, base UI scaffold, API skeleton, shared documentation.
- **Phase 1 — Core Platform**
  - Auth system, user profile CRUD, job listings & details, marketing CMS minimal endpoints, staff job management.
  - Configure PostgreSQL schema & migrations, integrate Prisma or SQLC (decision pending).
- **Phase 2 — Applications & Staff Portal**
  - Application submission workflows, staff pipeline views, announcements management, file uploads.
  - Email notifications, audit logging, analytics groundwork.
- **Phase 3 — Content & Automation**
  - Content ingestion pipeline, CMS enhancements (resources/testimonials), employer microsites, 2FA, localization support.
- **Phase 4 — Optimization & Launch Prep**
  - Performance tuning, accessibility polish, SEO, analytics dashboards, training & documentation, launch runbook.

## 14. Immediate Action Items
1. ✅ Choose data layer tooling — SQLC + `database/sql` selected with generated interfaces.
2. ✅ Author initial database schema & migration framework in `apps/api/db/migrations`.
3. ✅ Implement config management & logging helpers (zerolog).
4. ✅ Set up docker-compose with postgres, redis, minio, mailhog, migrate container.
5. ✅ Build auth service skeleton (register/login with hashed passwords, JWT issuing).
6. ✅ Extend frontend to consume `/public/jobs` once API ready (SSR + client filtering).
7. ✅ Deliver auth refresh/logout endpoints and staff guard middleware.
8. ✅ Build frontend auth flows (login/register, token refresh) and guard dashboard/staff routes.
9. Build job detail experience powered by `/public/jobs/{slug}` endpoint.

## 15. Documentation & Governance
- Maintain Architecture Decision Records (ADRs) in `docs/adr/` for significant choices.
- Update this implementation guide as phases evolve.
- Track tasks using GitHub Projects or linear equivalents; align commits with roadmap.
- Establish coding standards (ESLint rules, Go fmt + gofumpt, import grouping).

---
**Next Step Recommendation**: Continue with Section 14 item #9 — create the job detail experience and supporting API slug handler.
