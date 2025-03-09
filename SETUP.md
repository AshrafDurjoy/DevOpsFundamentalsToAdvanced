# GitHub Actions Setup Guide

This document provides instructions for setting up each workflow in the `.github/workflows` directory.

## Prerequisites

- A GitHub account and repository
- Permissions to create workflows, secrets, and environments in your repository

## General Setup

1. Create the `.github/workflows` directory in your repository:
   ```bash
   mkdir -p .github/workflows
   ```

2. Copy each workflow file into this directory.

## Specific Workflow Setup

### 01-hello-github-actions.yml & 01b-hello-world-inputs.yml
No setup required. These will work immediately.

### 02-key-concepts.yml
No setup required. This will work immediately.

### 03-first-workflow.yaml
No special setup required. The workflow will install cowsay automatically.

### 04-workflow-triggers.yml & 04b-scheduled-tasks.yml
No special setup required, but note that:
- Scheduled tasks won't run until you push the workflow to your repository
- The cron schedule is in UTC time

### 05-multiple-jobs.yml
No special setup required.

### 06-built-in-custom-actions.yml
No special setup required.

### 07a-variables.yml
No special setup required.

### 07b-secret-demo.yaml & 07c-additional-secret-demo.yml
1. Create a repository secret:
   - Go to your GitHub repository
   - Navigate to Settings → Secrets and variables → Actions → New repository secret
   - Name: `MY_SECRET_MESSAGE`
   - Value: Any secret message (e.g., "This is my secret value")

### 08-ci-pipeline.yml
No special setup required. This simulates a CI pipeline without actual code.

### 08b-node-ci-cd.yml
1. Create a minimal package.json in your repository root:
   ```bash
   cat > package.json << 'EOL'
   {
     "name": "demo-project",
     "version": "1.0.0",
     "scripts": {
       "test": "echo 'Tests passed!'",
       "build": "mkdir -p dist && echo '<h1>Demo App</h1>' > dist/index.html",
       "lint": "echo 'No linting errors found'"
     }
   }
   EOL
   ```
   Note: This is a simulation only. For a real Node.js project, you'd need proper test and build scripts.

### 09-deployment-example.yml
1. Create environments in your repository:
   - Go to Settings → Environments → New environment
   - Create two environments: "staging" and "production"
   - Optionally, add protection rules and environment secrets

### 09b-docker-build-push.yml
1. Create a minimal Dockerfile in your repository root:
   ```bash
   cat > Dockerfile << 'EOL'
   FROM nginx:alpine
   COPY index.html /usr/share/nginx/html/index.html
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   EOL
   ```

2. Create a sample index.html file:
   ```bash
   echo "<html><body><h1>Docker Demo</h1></body></html>" > index.html
   ```

3. Ensure GitHub Packages permissions are properly set:
   - Go to Settings → Actions → General
   - Scroll to "Workflow permissions"
   - Enable "Read and write permissions" or ensure the specific permissions are granted

### 09c-multi-environment-deploy.yml
1. Create three environments in your repository:
   - Go to Settings → Environments → New environment
   - Create environments: "development", "staging", and "production"
   - Optional: For staging and production, enable "Required reviewers" for approval-based deployments

### 12a-reusable-workflow.yml & 12b-caller-workflow.yml
1. Create a repository secret for deployment token:
   - Go to Settings → Secrets and variables → Actions → New repository secret
   - Name: `DEPLOY_TOKEN`
   - Value: Any secret value (e.g., "sample-deploy-token")

2. Create environments for each deployment target:
   - Go to Settings → Environments → New environment
   - Create environments: "development", "staging", and "production"

### 12c-self-hosted-runner.yml
No special setup required for the GitHub-hosted part of the workflow.

For the actual self-hosted runner (commented out in the workflow):
1. Go to Settings → Actions → Runners → New self-hosted runner
2. Follow the instructions to set up a runner on your own machine

### 12d-matrix-tests.yml
No special setup required.
