# Solar System CI/CD Demo Guide

This guide explains how to use and learn from the Solar System application CI/CD pipeline for DevOps training.

## Overview

The Solar System application demonstrates a complete CI/CD workflow including:

- Automated testing and code coverage
- Docker image building
- Multi-environment deployment
- Kubernetes manifests processing
- Secret management

## Running the CI/CD Pipeline

### Method 1: Push Changes

1. Make changes to any file in the `solar-system-main` directory
2. Commit and push to the main branch:
   ```bash
   git add solar-system-main/
   git commit -m "Update Solar System application"
   git push origin main
   ```
3. The workflow will automatically run for the development environment

### Method 2: Manual Trigger

1. Go to the GitHub repository
2. Navigate to Actions → Solar System CI/CD Pipeline
3. Click "Run workflow"
4. Select the target environment (development, staging, or production)
5. Toggle debug mode if needed
6. Click "Run workflow"

## Understanding the Pipeline

### 1. Setup & Validate

- Extracts the version from package.json
- Sets up Node.js environment
- Outputs debug information when enabled

### 2. Lint & Security

- Checks code quality
- Performs security audit on dependencies

### 3. Test

- Runs unit tests with Mocha
- Generates code coverage reports
- Uploads test results as artifacts

### 4. Build Docker Image

- Creates a Docker image from the Dockerfile
- Tags the image with version and commit SHA
- Pushes to GitHub Container Registry

### 5. Deploy

- Selects the correct environment configuration
- Processes Kubernetes manifests with environment variables
- Demonstrates secret creation for MongoDB credentials
- Verifies the deployment and sends notification

## Learning Opportunities

### CI/CD Concepts

- **Pipeline Stages**: Observe how each job depends on previous jobs
- **Environment Separation**: Note how configurations differ between development, staging, and production
- **Artifact Management**: See how test results and coverage reports are stored

### DevOps Practices

- **Infrastructure as Code**: Kubernetes manifests for deployment
- **Secret Management**: How sensitive data is handled
- **Automation**: Full workflow without manual intervention
- **Docker Containerization**: Building and publishing images

### Kubernetes Concepts

- **Deployments**: How applications are deployed to Kubernetes
- **Services**: How applications are exposed within the cluster
- **Ingress**: How applications are exposed outside the cluster
- **Secrets**: How sensitive information is stored

## Extending the Demo

You can extend this demo by:

1. Adding a database deployment step
2. Implementing blue-green deployment
3. Adding integration tests against a test environment
4. Implementing semantic versioning based on commit messages
5. Adding Slack or email notifications

## Troubleshooting

- **Pipeline fails at test stage**: Check test output in the artifacts
- **Image build fails**: Examine the Dockerfile and build logs
- **Deployment fails**: Check the kubernetes manifest processing

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Buildx Documentation](https://docs.docker.com/buildx/working-with-buildx/)
- [Kubernetes Documentation](https://kubernetes.io/docs/home/)
