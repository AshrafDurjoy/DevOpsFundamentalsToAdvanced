# GitHub Actions for Junior DevOps Engineers

## 1. Introduction to GitHub Actions

### What is CI/CD?

- **Continuous Integration (CI):**
  - CI is the practice of automatically integrating code changes from multiple contributors into a shared repository several times a day.
  - Each integration is verified by automated builds and tests to detect issues early.
  - **Example:** Running unit tests automatically every time a pull request is made.

- **Continuous Deployment (CD):**
  - CD extends CI by automatically deploying all code changes to a testing or production environment after passing CI tests.
  - Ensures the code is always in a deployable state.
  - **Example:** Deploying a website to production as soon as the code passes all tests.

### What is GitHub Actions?

- **Definition:**
  - GitHub Actions is a CI/CD tool built into GitHub to automate workflows.
  - It helps automate software development processes like building, testing, and deploying code.

- **Benefits:**
  - Seamless GitHub integration.
  - Supports custom workflows defined via YAML.
  - Highly customizable and extensible.

---

## 2. Key Concepts

### Workflow
- A configurable automated process defined by a YAML file in `.github/workflows/`.
- **Example:** Running unit tests every time code is pushed to the main branch.
- **Hands-on:** Create a `ci.yml` file with a simple echo job.

```yaml
name: Simple Workflow

on: [push]

jobs:
  say-hello:
    runs-on: ubuntu-latest
    steps:
      - name: Print a message
        run: echo "Hello, GitHub Actions!"

Job

    A series of steps executed in a runner.
    Each job runs in its own virtual machine or container.
    Hands-on: Add a test job that runs after a build job.

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - run: echo "Building the app..."

  test:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - run: echo "Running tests..."

Step

    An individual task within a job.
    Hands-on: Add steps to install dependencies and run tests.

steps:
  - name: Checkout code
    uses: actions/checkout@v2
  - name: Install dependencies
    run: npm install
  - name: Run tests
    run: npm test

Action

    A reusable piece of code that performs a specific task.
    Hands-on: Use the actions/checkout and actions/setup-node actions.

steps:
  - name: Checkout repository
    uses: actions/checkout@v2
  - name: Set up Node.js
    uses: actions/setup-node@v2
    with:
      node-version: '16'

Runner

    A virtual machine that executes workflows.
    Example: Use ubuntu-latest as the runner.

runs-on: ubuntu-latest

3. Setting Up GitHub Actions
Full Workflow Example

    Create a new GitHub repository.
    Set up a workflow:
        Create a .github/workflows/ directory.
        Add a file ci.yml with the following content:

name: CI Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: Set up Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'

    - name: Install dependencies
      run: npm install

    - name: Run tests
      run: npm test

    Push the changes to trigger the workflow.

4. Workflow Triggers
Full Workflow Examples:

    push & pull_request:
        Trigger workflows when code is pushed or a pull request is created.

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - run: echo "Code pushed or PR created!"

    schedule:
        Use CRON syntax to schedule workflows.

on:
  schedule:
    - cron: '0 8 * * 1'

jobs:
  weekly-job:
    runs-on: ubuntu-latest
    steps:
      - run: echo "Running scheduled task every Monday at 8 AM"

    workflow_dispatch:
        Manually trigger workflows.

on:
  workflow_dispatch:

jobs:
  manual-job:
    runs-on: ubuntu-latest
    steps:
      - run: echo "Manually triggered workflow!"

    repository events:
        Trigger workflows based on events like issue creation, label updates, etc.

on:
  issues:
    types: [opened, edited]

jobs:
  issue-job:
    runs-on: ubuntu-latest
    steps:
      - run: echo "Issue created or edited!"
