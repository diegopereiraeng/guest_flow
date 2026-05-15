# GuestFlow API

Backend REST API for the GuestFlow digital guest experience platform.

Built with **Node.js**, **Express**, and **TypeScript** — exposes endpoints for dashboard metrics, experiences, reservations, and check-ins.

## Quick links

- [OpenAPI Contract](https://github.com/diegopereiraeng/guest_flow/blob/main/docs/openapi.yaml)
- [Architecture](architecture.md)
- [Runbook](runbook.md)

## CI Pipeline

Every push to `main` triggers the full pipeline:

1. Install → TypeCheck → Test (with coverage gate ≥ 80%)
2. Generate & publish OpenAPI spec to GitHub
3. SAST (Semgrep), SCA (Grype), Container scan (Trivy)
4. Build & push Docker images to ECR
5. Update IDP scorecard via Catalog Ingestion API

## Health endpoints

| Endpoint | Description |
|---|---|
| `GET /health` | Liveness check |
| `GET /ready` | Readiness check |
| `GET /api/version` | Version info |
