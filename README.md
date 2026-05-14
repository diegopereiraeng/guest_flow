# GuestFlow

> **GuestFlow** is a lightweight digital experience platform that simulates how guest-facing services are built, tested, secured, governed, and delivered at scale.

GuestFlow demonstrates a realistic, production-grade application architecture designed for enterprise DevOps demos covering **IDP**, **CI/CD**, **security gates**, **service catalog**, and **DevOps scorecards**.

---

## Architecture

```
frontend (React + Vite)  →  backend (Node.js + Express)  →  in-memory data
      :3000                         :8080
```

- **Frontend**: React 18, Vite, TypeScript — 4 pages with live API integration
- **Backend**: Express + TypeScript — REST API with health, readiness, version, and domain endpoints
- **Data**: Pure in-memory, no database required
- **Tests**: Vitest + Supertest (backend), Vitest + React Testing Library (frontend)

---

## Quick Start

### Install all dependencies

```bash
npm run install:all
```

### Run both services (development)

```bash
npm run dev
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:8080

---

## Backend

```bash
cd backend
npm install
npm run dev       # start with hot reload (tsx watch)
npm test          # run all tests
npm run build     # compile TypeScript
```

### Available endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check |
| GET | `/ready` | Readiness check |
| GET | `/api/version` | Version info |
| GET | `/api/dashboard` | KPI metrics |
| GET | `/api/experiences` | Guest experiences |
| GET | `/api/reservations` | Reservations |
| GET | `/api/checkins` | Check-ins list |
| POST | `/api/checkins` | Create check-in |

---

## Frontend

```bash
cd frontend
npm install
npm run dev       # start Vite dev server
npm test          # run component tests
npm run build     # production build
```

### Pages

| Page | Description |
|------|-------------|
| Command Center | Live KPI dashboard |
| Experiences | Attraction cards with status, wait time, capacity |
| Reservations & Check-ins | Reservation table + check-in form |
| Service Readiness | Engineering maturity, scorecards |

---

## Tests

```bash
# Run all tests (backend + frontend)
npm test

# Backend only
npm run test:backend

# Frontend only
npm run test:frontend
```

---

## Docker Compose

```bash
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend: http://localhost:8080

---

## Environment Variables

### Backend
| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `8080` | Server port |
| `APP_VERSION` | `1.0.0` | App version |
| `GIT_COMMIT` | `local-dev` | Git commit SHA |
| `APP_ENV` | `local` | Environment name |

### Frontend
| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_BASE_URL` | `http://localhost:8080` | Backend base URL |

---

## How GuestFlow Demonstrates DevOps Capabilities

### Internal Developer Portal (IDP)
- `catalog/guestflow-api.yaml` and `catalog/guestflow-web.yaml` are ready to import into Backstage, Harness IDP, or OpsLevel
- Metadata includes owner, tier, lifecycle, health endpoint, API contract, and runbook links

### CI Pipeline
- `pipelines/harness-ci-pipeline.yaml` covers: checkout → install → lint → tests → build → Docker → security scan → publish
- Tests fail the pipeline before any artifact is produced

### CD Pipeline
- `pipelines/harness-cd-pipeline.yaml` covers: dev deploy → smoke tests → manual approval → prod deploy → verify → auto rollback on failure

### Security Gates
- `scorecards/security-scorecard.yaml` maps SAST, SCA, secret scan, and container scan to pipeline stages
- Critical vulnerabilities block promotion to production

### Service Catalog
- Both services are registered with full metadata
- Ready to power scaffolder templates, dependency graphs, and on-call routing

### Scorecards & DevOps Maturity
- Four YAML scorecards: Testing (88%), Security (95%), DevOps Maturity (Level 3), Service Readiness (91%)
- Displayed live in the Service Readiness page of the frontend

---

## Repository Structure

```
guestflow/
  README.md
  package.json          # monorepo scripts
  docker-compose.yml
  .gitignore

  backend/
    src/
      app.ts            # Express app (exported for tests)
      server.ts         # HTTP server entrypoint
      data/mockData.ts
      routes/           # one file per resource
      services/         # business logic
      types/            # shared TypeScript types
      middleware/       # error handler
    tests/              # Vitest + Supertest

  frontend/
    src/
      api/guestflowApi.ts
      components/       # Header, MetricCard, StatusBadge, etc.
      pages/            # CommandCenter, Experiences, CheckIn, ServiceReadiness
      styles/global.css
      tests/

  docs/
    openapi.yaml
    architecture.md
    runbook.md

  catalog/              # IDP service catalog entries
  scorecards/           # DevOps maturity scorecards
  pipelines/            # Harness CI and CD pipeline YAML
```
