# AWS EC2 & DynamoDB Deployment Guide for Beginners

This guide explains how to deploy the Solar System application to AWS EC2 with DynamoDB using a fully automated CI/CD pipeline.

## What You'll Learn

- Setting up a complete CI/CD pipeline with GitHub Actions
- Automated provisioning of AWS infrastructure including EC2 and DynamoDB
- Using DynamoDB for serverless database storage
- Working with IAM roles for secure access between AWS services
- Managing Docker containers on EC2 through automation

## Prerequisites

Before you begin, you'll need:

1. **An AWS Account**: Sign up at [aws.amazon.com](https://aws.amazon.com) if you don't have one
2. **GitHub Account**: For storing your code and using GitHub Actions
3. **IAM User with Permissions**: Create an IAM user with permissions for EC2, CloudFormation, DynamoDB, and IAM

## Step 1: Set Up AWS Access

1. **Create an IAM User**:
   - Go to the AWS IAM console
   - Create a new user with programmatic access
   - Attach policies: AmazonEC2FullAccess, AmazonDynamoDBFullAccess, IAMFullAccess, AWSCloudFormationFullAccess
   - Save the Access Key ID and Secret Access Key

2. **Create an EC2 Key Pair**:
   - Go to EC2 console -> Key Pairs
   - Create a new key pair named "solar-system-keypair"
   - Download the .pem file and keep it secure
   - Change permissions: `chmod 400 solar-system-keypair.pem`

## Step 2: Create Required GitHub Secrets

In your GitHub repository:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add the following secrets:

   **AWS Credentials**:
   - `AWS_ACCESS_KEY_ID`: Your AWS access key
   - `AWS_SECRET_ACCESS_KEY`: Your AWS secret key
   - `AWS_REGION`: Your AWS region (e.g., us-east-1)
   - `EC2_KEY_NAME`: Name of your EC2 key pair (e.g., "solar-system-keypair")

   **SSH Key**:
   - `EC2_USERNAME`: Username for SSH (use "ec2-user" for Amazon Linux)
   - `EC2_SSH_KEY`: The entire contents of your private key file (solar-system-keypair.pem)

## Step 3: Understanding the Workflow

Our GitHub Actions workflow handles the complete deployment process with no manual steps:

### Testing Phase
- Checks out the code and runs tests
- Generates code coverage reports

### Infrastructure Provisioning
- Creates EC2 instance using CloudFormation
- Sets up security groups and networking
- Installs and configures Docker on the instance

### Docker Image Building
- Creates a Docker image with the application
- Pushes to GitHub Container Registry

### DynamoDB Setup (Fully Automated)
- Creates DynamoDB table for planet data
- Populates the table with solar system information
- Sets up proper IAM roles and permissions

### EC2 Deployment
- Connects to the provisioned EC2 instance
- Pulls and runs Docker container with the application
- Configures environment variables to connect to DynamoDB

## Step 4: Running the Workflow

### Option 1: Automatic Trigger
Make changes to the code and push to GitHub:
```bash
git add .
git commit -m "Update application"
git push origin main
```

### Option 2: Manual Trigger
1. Go to the GitHub repository
2. Click "Actions" tab
3. Select "Solar System - AWS EC2 Deployment"
4. Click "Run workflow" button
5. Choose environment (development/production)
6. Click "Run workflow"

## Step 5: Understanding DynamoDB Integration

The workflow creates and configures:

1. **DynamoDB Table**: Named `solar-system-planets-{environment}`
   - Contains all planet data (name, description, images, etc.)
   - Uses numeric ID as primary key

2. **IAM Role**: Gives EC2 permission to read from DynamoDB
   - No need for database credentials in the application
   - Uses AWS best practices for security

3. **IAM Instance Profile**: Automatically attached to your EC2 instance

The application connects to DynamoDB using the AWS SDK, which automatically:
- Detects the IAM role attached to the EC2 instance
- Makes authenticated requests to DynamoDB
- Retrieves planet data when users search for it

## Step 6: Verifying Your Deployment

1. **Check Application**:
   - Open a browser and go to the URL provided in the workflow output
   - You should see the Solar System application
   - Try searching for planets by ID (1-9)

2. **Check AWS Resources**:
   - EC2: Verify instance is running in the AWS Console
   - DynamoDB: Check that table exists with data
   - CloudFormation: Review the created stack

## Troubleshooting Common Issues

### CloudFormation Issues
- **Stack Creation Failure**: Check the CloudFormation events in AWS Console
- **Resource Limits**: Ensure your AWS account has enough quota for EC2 instances

### Application Issues
- **Container Not Starting**: Check GitHub Actions logs for deployment step
- **DynamoDB Connection**: Verify IAM role permissions are correctly set

### GitHub Actions Issues
- **Workflow Failures**: Check detailed logs in GitHub Actions tab
- **SSH Connection Issues**: Verify EC2_SSH_KEY is correct and has right format

## Understanding the Architecture

```
┌─────────────────┐         ┌───────────────┐         ┌─────────────────┐
│                 │         │               │         │                 │
│  GitHub Actions │───1────►│ CloudFormation │───2────►│  EC2 + Docker  │
│                 │         │               │         │                 │
└─────────────────┘         └───────────────┘         └────────┬────────┘
        │                                                      │
        │                                                      │
        │                   ┌─────────────────┐               3
        └────────4─────────►│    DynamoDB     │◄──────────────┘
                            │                 │
                            └─────────────────┘

1: Initiates infrastructure creation
2: Provisions and configures EC2 instance
3: Application queries data from DynamoDB
4: Creates and populates DynamoDB tables
```

## Instructor Guide: Ensuring All Jobs Run Successfully

To ensure all workflow jobs run for demonstration purposes, follow these specific steps:

### Triggering a Complete Workflow Run

1. **Use the workflow_dispatch trigger**:
   - Go to Actions → "Solar System - AWS EC2 Deployment"
   - Click "Run workflow" dropdown
   - Ensure these settings:
     - **Use workflow from**: Select your current branch (no need to switch to main)
     - **Environment**: `development` (for faster provisioning)
     - **Enable debug mode**: `true` (check this box)
     - **Setup DynamoDB tables**: `true` (this should be checked)
     - **Run in demo mode**: `true` (this ensures all steps run)
   - Click "Run workflow" button

2. **Watch for all jobs to execute**:
   - The demo mode ensures all jobs run regardless of branch
   - You'll see progress indicators for:
     - Test Application
     - Build Docker Image
     - Setup DynamoDB
     - Setup EC2 IAM Role
     - Provision EC2 Instance
     - Deploy to EC2 Instance

3. **Working from feature branches**:
   - You can now demo the workflow from any branch
   - Students can see the full deployment process from their own branches
   - No need to merge to main for demonstrations

4. **If any jobs are skipped or fail**:
   - Ensure you're not triggering via pull request (which skips deployment)
   - Check GitHub and AWS permissions
   - Verify all AWS credentials are properly set up

5. **Monitoring the deployment**:
   - Follow the deployment job in real-time
   - When complete, GitHub will show the environment URL
   - Use the URL to demonstrate the running application

6. **Clean up after demonstrations**:
   - To avoid charges, delete resources when done:
   ```bash
   # Set environment to match what you used
   ENV="development"  # or "production"
   
   # Delete CloudFormation stack
   aws cloudformation delete-stack --stack-name "solar-system-ec2-$ENV"
   
   # Delete DynamoDB table
   aws dynamodb delete-table --table-name "solar-system-planets-$ENV"
   
   # Delete IAM policy and role (might need to detach first)
   POLICY_ARN=$(aws iam list-policies --query "Policies[?PolicyName=='SolarSystemDynamoDBAccess-$ENV'].Arn" --output text)
   aws iam delete-policy --policy-arn "$POLICY_ARN"
   ```
