# AWS EC2 & DynamoDB Deployment Guide for Beginners

This guide explains how to deploy the Solar System application to AWS EC2 with DynamoDB, designed specifically for DevOps beginners.

## What You'll Learn

- Setting up a complete CI/CD pipeline with GitHub Actions
- Deploying a Node.js application to AWS EC2
- Using DynamoDB for serverless database storage
- Working with IAM roles for secure access between AWS services
- Managing Docker containers on EC2

## Prerequisites

Before you begin, you'll need:

1. **An AWS Account**: Sign up at [aws.amazon.com](https://aws.amazon.com) if you don't have one
2. **GitHub Account**: For storing your code and using GitHub Actions
3. **Basic Understanding**: Familiarity with Git, GitHub, and terminal commands

## Step 1: Launch an EC2 Instance

1. **Log in to AWS Console**:
   - Go to [aws.amazon.com](https://aws.amazon.com) and sign in
   - Navigate to EC2 service

2. **Launch a New Instance**:
   - Click "Launch Instance"
   - Give it a name (e.g., "solar-system-dev")
   - Select Amazon Linux 2023 AMI (or Ubuntu if preferred)
   - Choose t2.micro instance type (free tier eligible)

3. **Configure Security Group**:
   - Create a new security group
   - Allow SSH (port 22) from your IP address
   - Allow HTTP (port 80) and custom TCP on port 3000 from anywhere
   - Name it "solar-system-sg"

4. **Create Key Pair**:
   - Create a new key pair (or use existing)
   - Download the .pem file and keep it secure
   - Change permissions: `chmod 400 your-key.pem`

5. **Launch and Connect**:
   - Launch the instance
   - Connect via SSH: `ssh -i your-key.pem ec2-user@your-instance-ip`

6. **Install Docker**:
   - For Amazon Linux 2023:
   ```bash
   sudo yum update -y
   sudo yum install docker -y
   sudo systemctl start docker
   sudo systemctl enable docker
   sudo usermod -aG docker ec2-user
   ```
   - Log out and log back in for group changes to take effect
   - Test with: `docker --version`

## Step 2: Create Required GitHub Secrets

In your GitHub repository:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add the following secrets:

   **AWS Credentials**:
   - `AWS_ACCESS_KEY_ID`: Your AWS access key
   - `AWS_SECRET_ACCESS_KEY`: Your AWS secret key
   - `AWS_REGION`: Your AWS region (e.g., us-east-1)

   **EC2 Connection**:
   - `DEV_EC2_HOST`: Public IP or DNS of your development EC2 instance
   - `PROD_EC2_HOST`: Public IP or DNS of your production EC2 instance
   - `EC2_USERNAME`: Username for SSH (use "ec2-user" for Amazon Linux)
   - `EC2_SSH_KEY`: The entire contents of your private key file (your-key.pem)

## Step 3: Understanding the Workflow

Our GitHub Actions workflow handles the complete deployment process:

### Testing Phase
- Checks out the code and runs tests
- Generates code coverage reports

### Docker Image Building
- Creates a Docker image with the application
- Pushes to GitHub Container Registry

### DynamoDB Setup (Fully Automated!)
- Creates DynamoDB table for planet data
- Populates the table with solar system information
- Sets up proper IAM roles and permissions

### EC2 Deployment
- Connects to your EC2 instance
- Runs Docker container with the application
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

3. **IAM Instance Profile**: Attaches the role to your EC2 instance

The application connects to DynamoDB using the AWS SDK, which automatically:
- Detects the IAM role attached to the EC2 instance
- Makes authenticated requests to DynamoDB
- Retrieves planet data when users search for it

## Step 6: Verifying Your Deployment

1. **Check Application**:
   - Open a browser and go to `http://your-ec2-ip:3000`
   - You should see the Solar System application
   - Try searching for planets by ID (1-9)

2. **Check DynamoDB**:
   - In AWS Console, go to DynamoDB
   - Find the `solar-system-planets-development` table
   - Verify the data is there (should see 9 items)

3. **Check Container**:
   - SSH into your EC2 instance
   - Run `docker ps` to see the running container
   - Check logs with `docker logs solar-system`

## Troubleshooting Common Issues

### Application Can't Connect to DynamoDB
- **Check IAM Role**: Verify the role is created and attached
- **Check Table Name**: Environment variable should match the DynamoDB table name
- **Check Region**: AWS_REGION environment variable should match table region

### Docker Issues
- **Container Not Starting**: `docker logs solar-system` for error details
- **Image Not Found**: Check if image was pushed to registry correctly
- **Permission Issues**: Ensure EC2 user is in docker group

### GitHub Actions Issues
- **Workflow Failures**: Check detailed logs in GitHub Actions tab
- **SSH Connection Issues**: Verify EC2_SSH_KEY is correct and has right format
- **AWS Permissions**: Ensure AWS credentials have enough permissions

## Understanding the Architecture

```
┌─────────────────┐         ┌───────────────┐         ┌─────────────────┐
│                 │         │               │         │                 │
│  GitHub Actions │ ──────► │  EC2 Instance │ ──────► │    DynamoDB     │
│                 │         │               │         │                 │
└─────────────────┘         └───────────────┘         └─────────────────┘
       CI/CD                  Application Host           Database Storage
