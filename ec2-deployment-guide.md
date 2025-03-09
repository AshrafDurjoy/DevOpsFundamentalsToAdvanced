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

## Full GitHub Setup for Running the Workflow

Before running the workflow, ensure you have completed the following GitHub setup:

### 1. Repository Configuration

1. **Repository Structure**:
   - Ensure the repository contains the `solar-system-main` directory with your application
   - The application should include a valid `package.json` file and all required code
   - Make sure `.github/workflows/solar-system-ec2.yml` workflow file is present

2. **Branch Protection (Optional but Recommended)**:
   - Go to Settings → Branches → Branch protection rules
   - Add protection for your main branch
   - Require pull request reviews before merging
   - Require status checks to pass

### 2. Enable GitHub Packages

1. **Check Repository Permissions**:
   - Go to Settings → Actions → General
   - Ensure "Read and write permissions" is selected under "Workflow permissions"
   - Check "Allow GitHub Actions to create and approve pull requests"

2. **GitHub Container Registry Access**:
   - Go to Settings → Packages
   - Ensure package creation is enabled for the repository
   - Review inheritance settings for package access

### 3. Required GitHub Secrets

Create these secrets in your repository (Settings → Secrets and variables → Actions):

**AWS Authentication**:
- `AWS_ACCESS_KEY_ID`: Your AWS access key
- `AWS_SECRET_ACCESS_KEY`: Your AWS secret key
- `AWS_REGION`: Your AWS region (e.g., `us-east-1`)

**EC2 Access**:
- `EC2_KEY_NAME`: Name of your EC2 key pair (e.g., `solar-system-keypair`)
- `EC2_USERNAME`: Username for SSH (use `ec2-user` for Amazon Linux)
- `EC2_SSH_KEY`: The entire contents of your private key file including header/footer lines

### 4. AWS Resources Prerequisites

1. **IAM User**:
   - Create an IAM user with programmatic access
   - Attach these policies (or create a custom policy):
     - `AmazonEC2FullAccess`
     - `AmazonDynamoDBFullAccess`
     - `IAMFullAccess`
     - `AWSCloudFormationFullAccess`

2. **EC2 Key Pair**:
   - Create an EC2 key pair in the AWS Console
   - Download and secure the private key (.pem file)
   - Run `chmod 400` on the key file to set correct permissions

3. **Account Limits**:
   - Ensure your AWS account has sufficient service limits for:
     - EC2 t2.micro instances
     - DynamoDB tables
     - IAM roles and policies

### 5. Running the Workflow

For instructional demos, use these settings when manually triggering the workflow:

1. Go to Actions → "Solar System - AWS EC2 Deployment"
2. Click "Run workflow"
3. Configure with these options:
   - **Use workflow from**: Your current branch
   - **Environment**: `development` (faster to provision)
   - **Enable debug mode**: `true` (check this)
   - **Setup DynamoDB tables**: `true` (check this)
   - **Run in demo mode**: `true` (check this to ensure all steps run)

### 6. Troubleshooting

If the workflow doesn't run all steps successfully:

1. **Check Debug Job Output**:
   - Examine the "Debug Workflow Environment" job output
   - Verify branch detection and environment variables

2. **Verify AWS Credentials**:
   - Ensure AWS credentials are correct and have necessary permissions
   - Check if credentials have expired or been revoked

3. **Test AWS CLI Access**:
   - If possible, test AWS access with the same credentials locally
   - Ensure region configuration matches your intended deployment target

4. **GitHub Action Logs**:
   - Check individual job steps for detailed error messages
   - Look for permission issues or failed API calls

5. **Common Issues**:
   - `403 Forbidden`: Check GitHub Packages permissions
   - `AWS credential errors`: Verify AWS secret key and access key
   - `Resource creation failures`: Check AWS service quotas/limits 
   - `SSH connection timeouts`: Ensure security groups allow SSH access

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

## Pre-Run Checklist

Before triggering the workflow, verify these critical items:

1. **GitHub Repository Structure**
   - ✅ Repository contains `solar-system-main` directory with all application files
   - ✅ Application has a `package.json` file and proper directory structure
   - ✅ Workflow file `.github/workflows/solar-system-ec2.yml` exists

2. **GitHub Secrets**
   - ✅ All AWS credentials are set as secrets
   - ✅ EC2 key pair name matches the key you created in AWS
   - ✅ EC2_SSH_KEY includes complete private key content with `-----BEGIN RSA PRIVATE KEY-----` header

3. **GitHub Permissions**
   - ✅ Repository has Actions and Packages enabled
   - ✅ Workflow permissions include "Read and write permissions"
   - ✅ Repository has permission to create and use packages

4. **AWS Resources**
   - ✅ IAM user has all required permissions
   - ✅ EC2 key pair is created and downloaded
   - ✅ AWS region is consistent across all configurations
   - ✅ Your AWS account has sufficient service quotas

Use the Debug job output to verify that all environment variables and secrets are correctly set before proceeding with the full deployment.

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

## Detailed AWS Setup Instructions

### Creating an IAM User with Required Permissions

1. **Log into AWS Management Console**:
   - Go to https://console.aws.amazon.com/
   - Sign in with your AWS account

2. **Navigate to IAM Service**:
   - In the search bar at the top, type "IAM" and select it from the results
   - Or find IAM under "Security, Identity, & Compliance" section

3. **Create a New IAM User**:
   - In the IAM dashboard, click on "Users" in the left sidebar
   - Click the "Create user" button
   - Enter a username (e.g., `solar-system-deployment`)
   - Check the box for "Access key - Programmatic access"
   - Click "Next: Permissions"

4. **Attach Required Permissions**:
   - On the permissions page, select "Attach existing policies directly"
   - In the search box, search for and select these policies:
     - `AmazonEC2FullAccess`
     - `AmazonDynamoDBFullAccess`
     - `IAMFullAccess`
     - `AWSCloudFormationFullAccess`
   - Click "Next: Tags" (adding tags is optional)
   - Click "Next: Review"
   - Review the user details and permissions, then click "Create user"

5. **Save Access Credentials**:
   - You'll see a success message with the access key ID and secret access key
   - **IMPORTANT**: Click the "Download .csv" button to save these credentials
   - This is the ONLY time you can view or download the secret access key
   - Store these credentials securely - you'll need them for the GitHub secrets

### Creating an EC2 Key Pair

1. **Navigate to EC2 Service**:
   - In the AWS Management Console search bar, type "EC2" and select it
   - Or find EC2 under "Compute" section

2. **Access Key Pairs Section**:
   - In the EC2 dashboard, look for "Key Pairs" in the left sidebar
   - It's under "Network & Security" category
   - Click on "Key Pairs"

3. **Create a New Key Pair**:
   - Click the "Create key pair" button
   - Enter a name (e.g., `solar-system-keypair`)
   - For Key pair type: select "RSA"
   - For Private key file format: select ".pem" (for OpenSSH)
   - Click "Create key pair"

4. **Secure the Key File**:
   - The .pem file will automatically download to your computer
   - Move it to a secure location on your machine
   - Open a terminal and navigate to the directory with your key
   - Run this command to set correct permissions:
   ```bash
   chmod 400 solar-system-keypair.pem
   ```
   - This ensures only your user can read the file, which is required for SSH

5. **Verify Key Pair Creation**:
   - You should now see your new key pair listed in the EC2 Key Pairs page
   - Note the name exactly as it appears - you'll need to enter this in GitHub secrets

### Setting Up GitHub Secrets

After creating both the IAM user and EC2 key pair, you need to add them as secrets in GitHub:

1. **AWS Credentials Secrets**:
   - `AWS_ACCESS_KEY_ID`: Copy from the IAM user credentials CSV
   - `AWS_SECRET_ACCESS_KEY`: Copy from the IAM user credentials CSV
   - `AWS_REGION`: Enter your AWS region (e.g., `us-east-1`)
   - `EC2_KEY_NAME`: The exact name of the key pair you created (e.g., `solar-system-keypair`)

2. **EC2 SSH Secret**:
   - `EC2_USERNAME`: Enter `ec2-user` (for Amazon Linux)
   - `EC2_SSH_KEY`: Open the .pem file in a text editor and copy ALL contents, including the BEGIN and END lines
