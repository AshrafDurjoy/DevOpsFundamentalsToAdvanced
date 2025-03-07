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
- **Hands-on:** Create a `ci.yml` file with a simple echo job:

```yaml
name: Simple Workflow

on: [push]

jobs:
  say-hello:
    runs-on: ubuntu-latest
    steps:
      - name: Print a message
        run: echo "Hello, GitHub Actions!"
```

### Job
- A series of steps executed in a runner.
- Each job runs in its own virtual machine or container.
- **Hands-on:** Add a test job that runs after a build job:

```yaml
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
```

### Step
- An individual task within a job.
- **Hands-on:** Add steps to install dependencies and run tests:

```yaml
steps:
  - name: Checkout code
    uses: actions/checkout@v2
  - name: Install dependencies
    run: npm install
  - name: Run tests
    run: npm test
```

### Action
- A reusable piece of code that performs a specific task.
- **Hands-on:** Use the actions/checkout and actions/setup-node actions:

```yaml
steps:
  - name: Checkout repository
    uses: actions/checkout@v2
  - name: Set up Node.js
    uses: actions/setup-node@v2
    with:
      node-version: '16'
```

### Runner
- A virtual machine that executes workflows.
- **Example:** Use ubuntu-latest as the runner:

```yaml
runs-on: ubuntu-latest
```

## 3. Setting Up GitHub Actions

### Full Workflow Example

1. Create a new GitHub repository.
2. Set up a workflow:
   - Create a `.github/workflows/` directory.
   - Add a file `ci.yml` with the following content:

```yaml
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
```

3. Push the changes to trigger the workflow.

## 4. Workflow Triggers

### Full Workflow Examples:

#### push & pull_request
- Trigger workflows when code is pushed or a pull request is created.

```yaml
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
```

#### schedule
- Use CRON syntax to schedule workflows.

```yaml
on:
  schedule:
    - cron: '0 8 * * 1'

jobs:
  weekly-job:
    runs-on: ubuntu-latest
    steps:
      - run: echo "Running scheduled task every Monday at 8 AM"
```

#### workflow_dispatch
- Manually trigger workflows.

```yaml
on:
  workflow_dispatch:

jobs:
  manual-job:
    runs-on: ubuntu-latest
    steps:
      - run: echo "Manually triggered workflow!"
```

#### repository events
- Trigger workflows based on events like issue creation, label updates, etc.

```yaml
on:
  issues:
    types: [opened, edited]

jobs:
  issue-job:
    runs-on: ubuntu-latest
    steps:
      - run: echo "Issue created or edited!"
```

## 5. GitHub Actions: Jobs & Steps

### Multiple Jobs
#### Run Parallel or Sequential Jobs
- **Parallel Jobs:** Run multiple jobs at the same time.
- **Sequential Jobs:** Run jobs one after another.
- **Example:** A workflow where the `test` job runs after the `build` job.

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - run: echo "Building the app..."

  test:
    runs-on: ubuntu-latest
    steps:
      - run: echo "Running tests..."
```

### Steps in Job
#### Execute Shell Commands or Custom Actions
- **Shell Commands**: Each step in a job can run shell commands.
- **Custom Actions**: Use GitHub's built-in actions or create your own custom actions.
- **Example**: Running a shell command to install dependencies.

```yaml
steps:
  - name: Checkout code
    uses: actions/checkout@v2
  - name: Install dependencies
    run: npm install
```

### Dependencies
#### Use needs: to Specify Job Dependencies
- **Job Dependencies**: Control the order of execution by specifying dependencies between jobs.
- **Example**: The test job depends on the completion of the build job.

```yaml
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
```

## 6. Using Built-in & Custom Actions

### Built-in Actions
- `actions/checkout`: Clones the repository.
- `actions/setup-node`: Sets up Node.js.
- **Example**:

```yaml
steps:
  - name: Checkout repository
    uses: actions/checkout@v2
  - name: Set up Node.js
    uses: actions/setup-node@v2
    with:
      node-version: '16'
```

### Custom Actions
- **Create Your Own Reusable Actions**: You can create custom actions to automate specific tasks.
- **Example**: A custom action for website deployment.

#### Example: Creating a Custom JavaScript Action

1. Create an action.yml file:
```yaml
name: 'Hello World'
description: 'Greet someone and record the time'
inputs:
  who-to-greet:
    description: 'Who to greet'
    required: true
    default: 'World'
outputs:
  time:
    description: 'The time we greeted you'
runs:
  using: 'node16'
  main: 'index.js'
```

2. Create an index.js file:
```javascript
const core = require('@actions/core');
const github = require('@actions/github');

try {
  // Get inputs
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  
  // Get time
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
} catch (error) {
  core.setFailed(error.message);
}
```

3. Use the custom action in a workflow:
```yaml
jobs:
  hello_world_job:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - id: hello
        uses: ./.github/actions/hello-world
        with:
          who-to-greet: 'DevOps Engineer'
      - run: echo "The time was ${{ steps.hello.outputs.time }}"
```

## 7. Secrets & Environment Variables

### Secrets
- **Store API Keys Securely**: Use GitHub secrets to store sensitive data like API keys.
- **Access Secrets**: Access secrets using `${{ secrets.SECRET_NAME }}`.
- **Example**: Use secrets.GITHUB_TOKEN for authentication.

```yaml
steps:
  - name: Checkout code
    uses: actions/checkout@v2
  - name: Deploy
    run: curl -H "Authorization: Bearer ${{ secrets.GITHUB_TOKEN }}" https://example.com/deploy
```

### Environment Variables
- **Global & Job-Specific Variables**: Define environment variables at the global level or within individual jobs.
- **Access Variables**: Use `${{ env.VARIABLE_NAME }}` in your workflow.

```yaml
env:
  NODE_ENV: production

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - run: echo ${{ env.NODE_ENV }}
```

## 8. Code Build & Testing Automation

### Run Tests
- **Automated Test Execution**: Run tests automatically as part of the CI/CD pipeline.
- **Example**: Trigger tests as part of the workflow.

```yaml
steps:
  - name: Run tests
    run: npm test
```

### Testing Tools
- **Integration with Testing Frameworks**: Use Jest, Pytest, JUnit, Mocha, etc., for automated tests.
- **Example**:

```yaml
steps:
  - name: Run tests with Jest
    run: npm run test
```

### Reports
- **Code Coverage & Linting Reports**: Use actions to generate reports on code coverage and linting.

## 9. Deploying with GitHub Actions

### Deployment Methods
- **FTP/SSH, Cloud Providers, Docker/Kubernetes**: Deploy your application via multiple methods like FTP, cloud providers, or containers.

### Configuration
- **Set Up Deployment Steps in Workflow**: Configure deployment actions directly in your GitHub Actions workflow.

#### Example: Firebase Deployment with Authentication Tokens

```yaml
steps:
  - name: Deploy to Firebase
    run: firebase deploy --token ${{ secrets.FIREBASE_TOKEN }}
```

## 10. Managing Artifacts & Caching

### Upload
- **Store Build Outputs as Artifacts**: Store build outputs (like compiled code or test results) as artifacts.

#### Example: Uploading Build Artifacts
```yaml
steps:
  - name: Build application
    run: npm run build
  
  - name: Upload build artifacts
    uses: actions/upload-artifact@v2
    with:
      name: build-files
      path: build/
      retention-days: 5
```

### Download
- **Retrieve Artifacts Between Jobs**: Download artifacts in a subsequent job for further processing.

#### Example: Downloading Artifacts in Another Job
```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build project
        run: npm run build
      - name: Upload build files
        uses: actions/upload-artifact@v2
        with:
          name: build-files
          path: build/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Download build files
        uses: actions/download-artifact@v2
        with:
          name: build-files
          path: build-output
      - name: Deploy to server
        run: ./deploy-script.sh build-output/
```

### Cache
- **Speed Up Workflows with Dependency Caching**: Cache dependencies (e.g., npm modules, Python packages) to speed up workflows.

```yaml
steps:
  - name: Cache npm dependencies
    uses: actions/cache@v2
    with:
      path: ~/.npm
      key: ${{ runner.os }}-node-modules-${{ hashFiles('**/package-lock.json') }}
```

## 11. Debugging & Troubleshooting

### Check Logs
- **Review Execution Logs**: Check logs in the GitHub Actions UI for detailed information on job execution.

### Debug Mode
- **Enable Debugging**: Set ACTIONS_RUNNER_DEBUG: true to enable debug logging.

```yaml
env:
  ACTIONS_RUNNER_DEBUG: true
```

### Echo Statements
- **Use Echo for Debugging Variables**: Use echo statements to output variable values and states during execution.

```yaml
steps:
  - name: Debug with echo
    run: echo "Node version: ${{ env.NODE_ENV }}"
```

## 12. Advanced Topics to Learn Next

### Matrix Builds
- **Test Across Multiple Versions**: Run jobs on multiple configurations (e.g., different versions of Node.js or Python).

#### Example: Matrix Build for Multiple Node.js Versions
```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [12.x, 14.x, 16.x, 18.x]
        
    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v2
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm ci
      - run: npm test
```

### Optimization
- **Workflow Optimization & Parallelization**: Optimize workflows by running jobs in parallel and minimizing execution time.

#### Example: Parallel Job Execution with Different Operating Systems
```yaml
jobs:
  test:
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
    runs-on: ${{ matrix.os }}
    steps:
      - uses: actions/checkout@v2
      - name: Run platform-specific tests
        run: ./run-tests-${{ matrix.os }}.sh
```

### Reusable Workflows
- **Create Composite Actions**: Create reusable workflows and actions for better modularization.

#### Example: Creating a Reusable Workflow
```yaml
# .github/workflows/reusable.yml
name: Reusable workflow

on:
  workflow_call:
    inputs:
      environment:
        required: true
        type: string
    secrets:
      deploy-token:
        required: true

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: ${{ inputs.environment }}
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to environment
        run: |
          echo "Deploying to ${{ inputs.environment }}"
          ./deploy.sh --token "${{ secrets.deploy-token }}"
```

#### Example: Calling a Reusable Workflow
```yaml
# .github/workflows/caller.yml
name: Deploy to production

on:
  push:
    branches: [main]

jobs:
  call-deploy-workflow:
    uses: ./.github/workflows/reusable.yml
    with:
      environment: 'production'
    secrets:
      deploy-token: ${{ secrets.PROD_DEPLOY_TOKEN }}
```

### Self-Hosted Runners
- **Custom Environments for Special Needs**: Set up custom runners on your own hardware for specific requirements.

#### Example: Using a Self-Hosted Runner
```yaml
jobs:
  build-and-deploy:
    runs-on: self-hosted
    steps:
      - uses: actions/checkout@v2
      - name: Build on custom hardware
        run: ./build-specialized.sh
      - name: Deploy internally
        run: ./deploy-to-internal-server.sh
```

## 13. Summary & Key Takeaways

- **Automate Workflows**: GitHub Actions enables complete automation of your CI/CD pipeline.
- **Jobs & Steps**: Use jobs, steps, and actions effectively to break down complex workflows.
- **Security**: Secure sensitive data with secrets and environment variables.
- **Optimization**: Debug efficiently and optimize workflows for performance.

## 14. Q&A Section

- This section can be used for frequently asked questions or interactive sessions during training.
