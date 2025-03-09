# CloudFormation Stack Troubleshooting Guide

If you encounter `ROLLBACK_COMPLETE` status when deploying the Solar System EC2 stack, follow these steps to identify and resolve the issue:

## Common Causes of CloudFormation Failures

1. **IAM Instance Profile Not Found**: 
   - Error: `Profile [SolarSystemInstanceProfile-development] not found`
   - Solution: Ensure the `setup-ec2-role` job completes successfully before the `provision-ec2` job runs

2. **Key Pair Not Found**:
   - Error: `The key pair 'solar-system-keypair' does not exist`
   - Solution: Verify the EC2_KEY_NAME secret matches an existing key pair in your AWS account

3. **AMI Not Available**:
   - Error: `The image id '[ami-xxxxxxxxx]' does not exist`
   - Solution: Update the AMI ID to one available in your region

4. **Missing Permissions**:
   - Error: `User: [arn] is not authorized to perform: [action]`
   - Solution: Ensure your IAM user has the necessary permissions

## Troubleshooting Steps

### 1. Check Stack Events

Examine the stack events to find the specific error:

```bash
aws cloudformation describe-stack-events --stack-name solar-system-ec2-development \
  --query 'StackEvents[?ResourceStatus==`CREATE_FAILED` || ResourceStatus==`UPDATE_FAILED`].[LogicalResourceId,ResourceStatusReason]' \
  --output table
```

### 2. Verify IAM Instance Profile

Confirm the IAM profile exists:

```bash
aws iam get-instance-profile --instance-profile-name SolarSystemInstanceProfile-development
```

### 3. Verify Key Pair

Check if your key pair exists:

```bash
aws ec2 describe-key-pairs --key-names YOUR_KEY_NAME
```

### 4. Delete Failed Stack

If needed, delete the stack and retry:

```bash
aws cloudformation delete-stack --stack-name solar-system-ec2-development
aws cloudformation wait stack-delete-complete --stack-name solar-system-ec2-development
```

### 5. Manual Deployment Order

When troubleshooting, run the workflow jobs in this order:
1. Debug job
2. Test job
3. setup-dynamodb job
4. setup-ec2-role job (critical for EC2 instance profile)
5. provision-ec2 job
6. deploy-to-ec2 job
