# GuestFlow Architecture

## Overview

GuestFlow is a monorepo composed of a React frontend and a Node.js/Express backend, communicating via REST APIs. All data is held in-memory — no external database or broker is required.

```
┌─────────────────────────────────────────────────────┐
│                     Browser                          │
│           React + Vite (port 3000)                   │
│  ┌──────────────┐  ┌────────────┐  ┌─────────────┐  │
│  │ Command      │  │Experiences │  │ Check-in    │  │
│  │ Center       │  │            │  │ Flow        │  │
│  └──────────────┘  └────────────┘  └─────────────┘  │
└───────────────────────┬─────────────────────────────┘
                        │ HTTP / REST
┌───────────────────────▼─────────────────────────────┐
│            Express API (port 8080)                   │
│  ┌──────────────────────────────────────────────┐    │
│  │  Routes → Services → In-Memory Store         │    │
│  │                                              │    │
│  │  /health  /ready  /api/version               │    │
│  │  /api/dashboard  /api/experiences            │    │
│  │  /api/reservations                           │    │
│  │  GET /api/checkins  POST /api/checkins       │    │
│  └──────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────┘
```

## Frontend

- **Framework**: React 18 + Vite + TypeScript
- **Styling**: Pure CSS with CSS custom properties (no Tailwind/CSS-in-JS)
- **State**: Local component state (`useState`, `useEffect`)
- **API layer**: `src/api/guestflowApi.ts` — typed fetch wrappers
- **Pages**: CommandCenter, Experiences, CheckIn, ServiceReadiness
- **Navigation**: In-App state switch (no router library)

## Backend

- **Runtime**: Node.js 20 + Express + TypeScript
- **Structure**: routes → services → data layer
- **Data**: Pure in-memory arrays in `src/data/mockData.ts`
- **Error handling**: Centralized middleware in `src/middleware/errorHandler.ts`
- **CORS**: Enabled for all origins (demo mode)

## API Flow

```
Browser → GET /api/dashboard
       ← 200 { guestExperienceHealth, liveGuestsToday, ... }

Browser → GET /api/experiences
       ← 200 [{ id, name, status, waitTimeMinutes, ... }]

Browser → POST /api/checkins { guestName, experienceId, reservationCode }
       ← 201 { checkinId, status: "CONFIRMED", timestamp }
```

## Check-in Flow

1. Guest arrives and presents reservation code
2. Frontend sends `POST /api/checkins` with guestName, experienceId, reservationCode
3. Backend validates all fields are present
4. Backend verifies experienceId exists in mock data
5. Backend creates a check-in record in the in-memory list
6. Backend returns 201 with the confirmed check-in object
7. Frontend refreshes the check-ins table

## Service Catalog

Each service is described in `catalog/`:
- `guestflow-api.yaml` — backend service metadata
- `guestflow-web.yaml` — frontend service metadata

These can be imported into any IDP (Backstage, Harness IDP, OpsLevel, etc.).

## Scorecards

Four YAML scorecards in `scorecards/`:
- `testing-scorecard.yaml` — unit, API and frontend test coverage
- `security-scorecard.yaml` — SAST, SCA, secret scanning, container scanning
- `devops-maturity-scorecard.yaml` — ownership, docs, pipeline, rollback
- `service-readiness-scorecard.yaml` — catalog registration, runbook, API contract

## CI/CD Flow

```
Developer pushes code
  │
  ├─ CI Pipeline (harness-ci-pipeline.yaml)
  │    checkout → install → lint → tests → build → docker build → security scan → publish
  │
  └─ CD Pipeline (harness-cd-pipeline.yaml)
       deploy_dev → smoke_test → approval → deploy_prod → verify → rollback_on_failure
```
