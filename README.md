# 🔐 Automated Security Scanning within DevSecOps CI/CD Pipeline

A GitHub Actions-powered CI/CD pipeline for **automated application security scanning** and **containerised deployments** with real-time vulnerability reporting. This project integrates multiple security layers—SAST, DAST, dependency scanning, container scanning, secret detection, and notification delivery—to ensure production-grade security from development to deployment.

> ⚙️ Developed with the support of [Harsh Chauhan](https://github.com/Harsh2509), who contributed significantly to the application development phase of the project.

---

## 🚀 Tech Stack & Tools Used

### 🧱 Application Stack

[![HTML5](https://img.shields.io/badge/HTML5-e34f26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![JavaScript](https://img.shields.io/badge/JavaScript-f7df1e?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

---

### 🔐 DevSecOps & Security Tools

[![CodeQL](https://img.shields.io/badge/CodeQL-2b2b2b?style=for-the-badge&logo=github&logoColor=white)](https://codeql.github.com/)
[![Snyk](https://img.shields.io/badge/Snyk-4c4a73?style=for-the-badge&logo=snyk&logoColor=white)](https://snyk.io/)
[![Trivy](https://img.shields.io/badge/Trivy-0f93e0?style=for-the-badge&logo=trivy&logoColor=white)](https://aquasecurity.github.io/trivy/)
[![Dockle](https://img.shields.io/badge/Dockle-009688?style=for-the-badge&logo=docker&logoColor=white)](https://github.com/goodwithtech/dockle)
[![OWASP ZAP](https://img.shields.io/badge/OWASP%20ZAP-2e72b8?style=for-the-badge&logo=OWASP&logoColor=white)](https://www.zaproxy.org/)
[![Gitleaks](https://img.shields.io/badge/Gitleaks-1b1f23?style=for-the-badge&logo=git&logoColor=white)](https://github.com/gitleaks/gitleaks)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

---

### ⚙️ CI/CD and Monitoring

[![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/features/actions)
[![YAML](https://img.shields.io/badge/YAML-000000?style=for-the-badge&logo=yaml&logoColor=white)](https://yaml.org/)
[![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white)](https://slack.com/)
[![DockerHub](https://img.shields.io/badge/DockerHub-0db7ed?style=for-the-badge&logo=docker&logoColor=white)](https://hub.docker.com/)

---

## 🧱 Project Structure

```bash
project-root/
├── .github/workflows/devsecops.yml     # CI/CD pipeline configuration
├── client/                             # React frontend
├── server/                             # Node/Express backend
│   ├── Dockerfile                      # Dockerfile for server
│   └── package.json                    # Backend dependencies
├── docker-compose.yml                 # Docker Compose setup
└── README.md                           # Project overview and documentation
```

---

## 📊 Pipeline Features

* Static Code Analysis with CodeQL
* Dependency Scanning using Snyk
* Secrets Detection via Gitleaks
* Container Vulnerability Scanning with Trivy
* Docker Best Practices Linting via Dockle
* DAST Scanning with OWASP ZAP
* Slack Notification on failure
* Multi-tagged Docker Builds and Pushes to DockerHub

---

# 🧬 CI/CD Pipeline Overview

This pipeline includes five key stages with integrated security and build processes:

## 🛡️ `security-scan`
**Objective:** Run comprehensive static security scans and prepare development artifacts.

- **Node Setup:** Installs Node.js 24.0.2 for compatibility with tools like Snyk.
- **NPM Install:** Installs dependencies in both root and `server` directories.
- **CodeQL:** Performs static application security testing (SAST) for JavaScript using GitHub Code Scanning.
- **Snyk:** Scans for known vulnerabilities in dependencies (`package.json`) and generates SARIF reports.
- **Gitleaks:** Scans for hardcoded secrets in source files.
- **Hadolint:** Ensures Dockerfile adheres to best practices.
- **Dockle:** Analyses Docker image configurations for security hardening.
- **Trivy:** Performs vulnerability scanning on the Docker image, reporting CRITICAL/HIGH CVEs.
- **Artifact Uploads:** All SARIF and scan reports are uploaded for GitHub security insights.

## 🛠️ `build`
**Objective:** Build the application stack using Docker Compose.

- **Secrets Injection:** Securely injects DB credentials into `.env` files.
- **Compose Build:** Builds multi-container services from `docker-compose.yml`.

## 📦 `dockerhub-push`
**Objective:** Create and push versioned Docker images.

- **Docker Login:** Authenticates with DockerHub using secrets.
- **Image Tagging:** Tags the image using both `latest` and Git short SHA.
- **Push:** Publishes both image tags to DockerHub.

## 🔥 `zap-scan`
**Objective:** Perform DAST scanning using OWASP ZAP.

- **Start Frontend:** Spins up the client service using Docker Compose.
- **Wait for Readiness:** Ensures the frontend is accessible before scanning.
- **Permissions Fix:** Sets workspace permissions to allow ZAP file writes.
- **ZAP Scan:** Runs `zap-baseline.py` on the frontend endpoint.
- **Report Upload:** Uploads HTML, JSON, and Markdown reports.
- **Issue Creation:** Automatically opens GitHub issues on vulnerabilities found.

## 🔔 `slack-alert`
**Objective:** Send real-time Slack alerts based on scan results.

- **Status Check:** Evaluates the conclusion of `security-scan` and `zap-scan` jobs.
- **Report Parsing:** Analyses ESLint and ZAP outputs to count and categorise issues.
- **Slack Notify:** Posts a detailed summary including:
  - ESLint Issues
  - ZAP Vulnerabilities (by severity)
  - Direct GitHub Actions run link

---

# ✅ Security Coverage Summary

| Check Type                         | Tool Used        | Reported To                  |
|-----------------------------------|------------------|------------------------------|
| Static Code Analysis              | CodeQL           | GitHub Code Scanning         |
| Dependency Vulnerability Scanning | Snyk             | GitHub Code Scanning (SARIF) |
| Secret Detection                  | Gitleaks         | GitHub Code Scanning (SARIF) |
| Dockerfile Lint                   | Hadolint         | GitHub Action Logs           |
| Image Hardening Best Practices    | Dockle           | GitHub Action Logs           |
| Image Vulnerability Scan          | Trivy            | GitHub Action Logs           |
| DAST (Web App Scan)               | OWASP ZAP        | GitHub Issues + Artifacts    |
| Slack Notification                | curl             | Slack Channel                |

---
