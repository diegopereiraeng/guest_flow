# GuestFlow Runbook

## Health Checks

### Backend health
```bash
curl http://localhost:8080/health
# Expected: {"status":"UP","service":"guestflow-api","version":"1.0.0"}
```

### Backend readiness
```bash
curl http://localhost:8080/ready
# Expected: {"status":"READY","dependencies":{"inMemoryStore":"UP","recommendationEngine":"MOCKED"}}
```

### Version info
```bash
curl http://localhost:8080/api/version
```

## Validate Frontend

1. Open `http://localhost:3000`
2. Confirm the Command Center page loads with metrics
3. Navigate to Experiences — verify 4 cards appear
4. Navigate to Reservations & Check-ins — verify reservation table appears
5. Navigate to Service Readiness — verify scorecards appear

## Validate Backend

Run all endpoints:
```bash
curl http://localhost:8080/api/dashboard
curl http://localhost:8080/api/experiences
curl http://localhost:8080/api/reservations
curl http://localhost:8080/api/checkins
curl -X POST http://localhost:8080/api/checkins \
  -H "Content-Type: application/json" \
  -d '{"guestName":"Test Guest","experienceId":"exp-001","reservationCode":"GF-0001"}'
```

## Restart Locally

```bash
# Backend
cd backend && npm run dev

# Frontend (separate terminal)
cd frontend && npm run dev
```

## Common Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Frontend shows "Failed to load" | Backend not running | Start backend on port 8080 |
| CORS error in browser | Backend not started or wrong port | Check `VITE_API_BASE_URL` |
| `tsx` not found | Dependencies not installed | Run `npm install` in `backend/` |
| Port 8080 in use | Another process | `lsof -i :8080` and kill the process |
| Port 3000 in use | Another process | `lsof -i :3000` and kill the process |

## Rollback Strategy (Conceptual)

1. Identify failing deployment via CD pipeline verify stage
2. CD pipeline triggers `rollback_on_failure` stage automatically
3. Previous Docker image tag is redeployed
4. Health check is re-validated after rollback
5. Incident is logged and team is notified

## Environment Variables

### Backend
| Variable | Default | Description |
|---|---|---|
| `PORT` | `8080` | HTTP listen port |
| `APP_VERSION` | `1.0.0` | App version string |
| `GIT_COMMIT` | `local-dev` | Git commit SHA |
| `APP_ENV` | `local` | Environment name |

### Frontend
| Variable | Default | Description |
|---|---|---|
| `VITE_API_BASE_URL` | `http://localhost:8080` | Backend API base URL |
