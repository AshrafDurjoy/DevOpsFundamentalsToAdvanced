#!/bin/bash
# Test script to verify AWS credentials work properly

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed. Please install it first."
    exit 1
fi

echo "🔍 Testing AWS credentials..."

# Test AWS credentials
if aws sts get-caller-identity &> /dev/null; then
    echo "✅ AWS credentials are valid!"
    aws sts get-caller-identity
else
    echo "❌ AWS credentials are invalid or missing!"
    exit 1
fi

# Test IAM permissions
echo "🔍 Testing IAM permissions..."
if aws iam list-roles --max-items 1 &> /dev/null; then
    echo "✅ IAM permissions look good!"
else
    echo "❌ IAM permissions issue detected!"
fi

# Test CloudFormation permissions
echo "🔍 Testing CloudFormation permissions..."
if aws cloudformation list-stacks --stack-status-filter CREATE_COMPLETE &> /dev/null; then
    echo "✅ CloudFormation permissions look good!"
else
    echo "❌ CloudFormation permissions issue detected!"
fi

# Test DynamoDB permissions
echo "🔍 Testing DynamoDB permissions..."
if aws dynamodb list-tables --limit 1 &> /dev/null; then
    echo "✅ DynamoDB permissions look good!"
else
    echo "❌ DynamoDB permissions issue detected!"
fi

# Test EC2 permissions
echo "🔍 Testing EC2 permissions..."
if aws ec2 describe-key-pairs --key-names $1 &> /dev/null; then
    echo "✅ EC2 key pair '$1' exists and is accessible!"
else
    echo "⚠️ EC2 key pair '$1' not found or insufficient permissions!"
    echo "   Make sure to create this key pair in the AWS console."
fi

# Check if IAM instance profile exists
echo "🔍 Testing IAM instance profile..."
ENVIRONMENT="${1:-development}"
PROFILE_NAME="SolarSystemInstanceProfile-${ENVIRONMENT}"

if aws iam get-instance-profile --instance-profile-name $PROFILE_NAME &> /dev/null; then
  echo "✅ Instance profile $PROFILE_NAME exists!"
else
  echo "⚠️ Instance profile $PROFILE_NAME not found!"
  echo "You may need to run the setup-ec2-role job first."
fi

echo "✅ AWS credentials test complete!"
