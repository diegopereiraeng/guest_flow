# =============================================================================
# GuestFlow — Makefile
#
# Abstracts every pipeline operation so developers and CI run identical steps.
#
# Usage (local):
#   make install       Install all dependencies
#   make typecheck     TypeScript type-check both workspaces
#   make test          Run tests (unit, with coverage)
#   make test-ci       Run tests with JUnit reports (mirrors CI)
#   make coverage      Show coverage summary
#   make openapi       Generate and lint OpenAPI spec
#   make build         Build Docker images locally
#   make push          Push Docker images to registry
#   make scan-sast     SAST scan with Semgrep (requires Docker)
#   make scan-sca      SCA scan with Grype (requires Docker)
#   make scan-container Trivy container scan (set IMAGE=<name:tag>)
#   make all           Full pipeline: install → typecheck → test → openapi → build
#   make clean         Remove generated artefacts
#
# Environment variables (override as needed):
#   ECR_REGISTRY      AWS ECR registry URL  (default: 123456789.dkr.ecr.us-east-1.amazonaws.com)
#   ECR_REGION        AWS region            (default: us-east-1)
#   IMAGE_TAG         Tag applied to images (default: local)
#   COVERAGE_THRESHOLD Minimum line coverage % (default: 80)
#   SONAR_HOST_URL    SonarQube host URL
#   SONAR_TOKEN       SonarQube token
# =============================================================================

ECR_REGISTRY        ?= 123456789.dkr.ecr.us-east-1.amazonaws.com
ECR_REGION          ?= us-east-1
IMAGE_TAG           ?= local
COVERAGE_THRESHOLD  ?= 80
BACKEND_IMAGE       := $(ECR_REGISTRY)/guestflow-api:$(IMAGE_TAG)
FRONTEND_IMAGE      := $(ECR_REGISTRY)/guestflow-web:$(IMAGE_TAG)

.PHONY: all install typecheck test test-ci coverage openapi openapi-lint \
        build push scan-sast scan-sca scan-container sonar clean help

# --------------------------------------------------------------------------- #
# Default target                                                                #
# --------------------------------------------------------------------------- #
all: install typecheck test openapi build

# --------------------------------------------------------------------------- #
# Dependencies                                                                  #
# --------------------------------------------------------------------------- #
install:
	@echo "==> Installing backend dependencies"
	cd backend && npm ci
	@echo "==> Installing frontend dependencies"
	cd frontend && npm ci

# --------------------------------------------------------------------------- #
# Type checking                                                                 #
# --------------------------------------------------------------------------- #
typecheck:
	@echo "==> TypeCheck: backend"
	cd backend && npx tsc --noEmit
	@echo "==> TypeCheck: frontend"
	cd frontend && npx tsc --noEmit

# --------------------------------------------------------------------------- #
# Tests                                                                         #
# --------------------------------------------------------------------------- #
test:
	@echo "==> Tests: backend"
	cd backend && npm test
	@echo "==> Tests: frontend"
	cd frontend && npm test

test-ci:
	@echo "==> Tests (CI mode): backend"
	cd backend && mkdir -p test-results && npm run test:ci
	@echo "==> Tests (CI mode): frontend"
	cd frontend && mkdir -p test-results && npm run test:ci

coverage:
	@echo "==> Coverage report: backend"
	@node -e " \
	  const j=require('./backend/coverage/coverage-summary.json'); \
	  const p=j.total.lines.pct; \
	  console.log('Backend line coverage: '+p+'%'); \
	  if(p < $(COVERAGE_THRESHOLD)){ \
	    console.error('FAIL: '+p+'% < $(COVERAGE_THRESHOLD)%'); process.exit(1); \
	  } else { console.log('PASS'); }"

# --------------------------------------------------------------------------- #
# OpenAPI                                                                       #
# --------------------------------------------------------------------------- #
openapi:
	@echo "==> Generating OpenAPI spec"
	cd backend && APP_VERSION=$(IMAGE_TAG) npm run generate:spec

openapi-lint:
	@echo "==> Linting OpenAPI spec with Spectral"
	cd backend && npx @stoplight/spectral-cli lint docs/openapi.yaml \
	  --ruleset https://unpkg.com/@stoplight/spectral-owasp-ruleset/dist/ruleset.mjs

# --------------------------------------------------------------------------- #
# Docker build & push                                                           #
# --------------------------------------------------------------------------- #
build:
	@echo "==> Building backend image: $(BACKEND_IMAGE)"
	docker build -t $(BACKEND_IMAGE) \
	  --build-arg APP_VERSION=$(IMAGE_TAG) \
	  -f backend/Dockerfile backend
	@echo "==> Building frontend image: $(FRONTEND_IMAGE)"
	docker build -t $(FRONTEND_IMAGE) \
	  -f frontend/Dockerfile frontend

push:
	@echo "==> Pushing backend image"
	docker push $(BACKEND_IMAGE)
	@echo "==> Pushing frontend image"
	docker push $(FRONTEND_IMAGE)

# --------------------------------------------------------------------------- #
# Security scans (local — via Docker)                                           #
# These mirror what the Harness STO native steps run in CI.                    #
# --------------------------------------------------------------------------- #
scan-sast:
	@echo "==> SAST: Semgrep"
	docker run --rm -v "$(PWD):/src" returntocorp/semgrep \
	  semgrep --config=p/owasp-top-ten --config=p/nodejs --config=p/typescript \
	  /src/backend/src /src/frontend/src

scan-sca:
	@echo "==> SCA: Grype — backend"
	docker run --rm -v "$(PWD)/backend:/project" anchore/grype dir:/project
	@echo "==> SCA: Grype — frontend"
	docker run --rm -v "$(PWD)/frontend:/project" anchore/grype dir:/project

scan-container:
	@if [ -z "$(IMAGE)" ]; then \
	  echo "Usage: make scan-container IMAGE=<name:tag>"; exit 1; fi
	@echo "==> Container scan: Trivy — $(IMAGE)"
	docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
	  aquasec/trivy image --severity CRITICAL,HIGH $(IMAGE)

# --------------------------------------------------------------------------- #
# SonarQube                                                                     #
# --------------------------------------------------------------------------- #
sonar:
	@echo "==> SonarQube scan"
	sonar-scanner \
	  -Dsonar.projectKey=guestflow \
	  -Dsonar.sources=backend/src,frontend/src \
	  -Dsonar.tests=backend/tests,frontend/src/tests \
	  -Dsonar.javascript.lcov.reportPaths=backend/coverage/lcov.info \
	  -Dsonar.testExecutionReportPaths=backend/test-results/junit.xml \
	  -Dsonar.qualitygate.wait=true \
	  -Dsonar.host.url=$(SONAR_HOST_URL) \
	  -Dsonar.login=$(SONAR_TOKEN)

# --------------------------------------------------------------------------- #
# Clean                                                                         #
# --------------------------------------------------------------------------- #
clean:
	rm -rf backend/node_modules backend/dist backend/coverage backend/test-results
	rm -rf frontend/node_modules frontend/dist frontend/coverage frontend/test-results
	rm -rf docs/openapi.yaml docs/openapi.json

# --------------------------------------------------------------------------- #
# Help                                                                          #
# --------------------------------------------------------------------------- #
help:
	@grep -E '^[a-zA-Z_-]+:' Makefile | grep -v '^.PHONY' | \
	  awk -F: '{printf "  %-20s\n", $$1}' | sort
