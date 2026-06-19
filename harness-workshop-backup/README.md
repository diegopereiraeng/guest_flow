# Harness Workshop — Self-Service Backup

Backup of all assets needed to replicate the self-service IDP 2.0 workflow in the sandbox account.

## Files

```
pipelines/
  project_setup_v2.yaml          — Main self-service orchestrator (5 stages)

templates/
  DiegoCITemplateWorkshop_v1.0.0.yaml    — Account-level CI stage template
  DiegoIDPTemplateWorkshop_v1.0.0.yaml   — Account-level IDP stage template
  guestflow_service_pipeline_v1.0.1.yaml — Project-level pipeline template (legacy ref)
```

## What each does

| File | Scope | Purpose |
|------|-------|---------|
| `project_setup_v2.yaml` | Project (any) | Orchestrates full project creation: Harness project, Code repo, cookiecutter scaffold, HAR registry, CI pipelines, IDP catalog |
| `DiegoCITemplateWorkshop_v1.0.0.yaml` | **Account** | CI stage: quality, secrets scan, test, SonarQube, OpenAPI, SAST, SCA, build+push HAR, container scan |
| `DiegoIDPTemplateWorkshop_v1.0.0.yaml` | **Account** | IDP stage: register component, register OpenAPI, catalog ingestion with scorecard properties |
| `guestflow_service_pipeline_v1.0.1.yaml` | Project | Legacy pipeline template — kept for reference |

---

## Setup instructions for sandbox account

### Step 1 — Prerequisites in the sandbox account

Create these secrets at **account level**:
| Secret ID | Value |
|-----------|-------|
| `harness_api_key` | Sandbox account API token with account/org/project admin permissions |
| `sonar_token` | SonarQube/SonarCloud token |
| `sonar_host_url` | SonarQube host (e.g. `https://sonarcloud.io`) |

Verify that the `account.HarnessCode` connector exists (it's built-in to all Harness accounts with Code enabled).

### Step 2 — Create account-level templates

Go to **Account Settings → Templates → + New Template** and create:

1. **DiegoCITemplateWorkshop** v1.0.0 (type: Stage)
   - Paste YAML from `templates/DiegoCITemplateWorkshop_v1.0.0.yaml`
   - Remove the `# scope: account` comment line before pasting

2. **DiegoIDPTemplateWorkshop** v1.0.0 (type: Stage)
   - Paste YAML from `templates/DiegoIDPTemplateWorkshop_v1.0.0.yaml`
   - Remove the `# scope: account` comment line before pasting

> Both must be at **account** scope so generated pipelines in any project can reference `account.DiegoCITemplateWorkshop`.

### Step 3 — Create the org and setup project

1. Create an org (e.g. `Workshop`) in the sandbox account
2. Create a project (e.g. `Setup`) inside that org
3. Inside that project, create the `project_setup_v2` pipeline:
   - Go to **Pipelines → + Create Pipeline → Import from YAML**
   - Paste `pipelines/project_setup_v2.yaml`
   - Update `orgIdentifier` and `projectIdentifier` to match your sandbox org/project

### Step 4 — Update sandbox-specific values in project_setup_v2.yaml

Before importing, find and replace:
| Find | Replace with |
|------|-------------|
| `value: TPM` (harness_org default) | Your sandbox org identifier |
| `https://github.com/diegopereiraeng/cookiecutter-harness-service.git` | Your cookiecutter repo URL (if different) |
| `github_org="diegopereiraeng"` | Your GitHub org (if different) |

### Step 5 — Wire IDP workflow (optional but recommended)

Update the IDP `new-project.yaml` workflow to point to the `project_setup_v2` pipeline in your sandbox account.

### Step 6 — Test run

Trigger `project_setup_v2` with these inputs:
```yaml
app_name: Test App
project_name: Test App
project_identifier: test_app
project_description: Test project for workshop
admin_email: your@email.com
service_name: test-service
service_description: Test service
service_type: fullstack
harness_org: <your_sandbox_org>
coverage_threshold: "80"
```

Expected result: all 5 stages pass, `test_app` project created with:
- Harness Code repo `test-service`
- HAR registry `test_app`
- CI pipelines `test_app-api-ci` and `test_app-web-ci`
- IDP catalog entities registered

---

## Pending improvements before the workshop

- [ ] Update `DiegoIDPTemplateWorkshop` — change `connector_ref: "DiegoGit"` + `is_harness_code_repo: false` → `connector_ref: "account.HarnessCode"` + `is_harness_code_repo: true` in both `register_component` and `register_openapi` steps
- [ ] Update `DiegoCITemplateWorkshop` — `build_push_ecr` step group: add `dockerfile` and `context` from stage variables (currently `<+input>`, now filled by `project_setup_v2`)
- [ ] Update IDP workflow `new-project.yaml` to trigger `project_setup_v2`
- [ ] Wire Trivy `connectorRef` properly for HAR native scanning
- [ ] Create `project_teardown` pipeline for resetting between attendees

---

## Architecture

```
IDP Workflow (new-project.yaml)
        │
        ▼
project_setup_v2 pipeline
  Stage 1: Create Project + Admin
  Stage 2: Create Harness Code Repo
  Stage 3: Scaffold (cookiecutter) + Push to Repo
  Stage 4: Harness Resources
    ├── Verify account templates exist
    ├── Create Harness Service
    ├── Create HAR Registry (1 per project)
    ├── Create CI Pipelines (using account.DiegoCITemplateWorkshop + account.DiegoIDPTemplateWorkshop)
    └── Trigger first CI run
  Stage 5: Register IDP Catalog Entities

Generated CI Pipeline (per service)
  Stage CI  → account.DiegoCITemplateWorkshop
  Stage IDP → account.DiegoIDPTemplateWorkshop
```
