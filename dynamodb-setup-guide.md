# DynamoDB Setup Guide for Solar System Application

This guide explains how Amazon DynamoDB is set up for the Solar System application. DynamoDB is a fully managed NoSQL database service provided by AWS that delivers fast and predictable performance with seamless scalability.

## What is DynamoDB?

Amazon DynamoDB is a key-value and document database that provides single-digit millisecond performance at any scale. It's a fully managed, multi-region, multi-active, durable database with built-in security, backup and restore, and in-memory caching.

## Automated Setup with GitHub Actions

Our workflow is configured to automatically set up DynamoDB for your application. The following resources are created:

1. DynamoDB table for storing planet data
2. IAM role for EC2 instances to access DynamoDB
3. Instance profile for attaching the IAM role to EC2 instances

### What Gets Created

When the workflow runs, it creates:

1. **DynamoDB Table**: Named `solar-system-planets-{environment}` (where environment is 'development' or 'production')
2. **IAM Role**: Named `SolarSystemEC2Role-{environment}`
3. **IAM Policy**: Named `SolarSystemDynamoDBAccess-{environment}` 
4. **Instance Profile**: Named `SolarSystemInstanceProfile-{environment}`

### No Manual Setup Required!

The entire setup is automated. You don't need to:
- Install any database software
- Configure database users
- Import data manually
- Set up connection strings

## How the Automated Setup Works

Let's look at how the GitHub Actions workflow automates the DynamoDB setup:

### 1. Creating the DynamoDB Table

```yaml
- name: Create DynamoDB table
  run: |
    ENVIRONMENT="${{ github.event.inputs.environment || 'development' }}"
    TABLE_NAME="solar-system-planets-${ENVIRONMENT}"
    
    # Check if table exists
    if aws dynamodb describe-table --table-name $TABLE_NAME >/dev/null 2>&1; then
      echo "Table $TABLE_NAME already exists"
    else
      aws dynamodb create-table \
        --table-name $TABLE_NAME \
        --attribute-definitions AttributeName=id,AttributeType=N \
        --key-schema AttributeName=id,KeyType=HASH \
        --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5
    fi
```

This creates a DynamoDB table with:
- A numeric primary key named `id`
- Provisioned throughput of 5 read and 5 write capacity units

### 2. Populating the Table with Planet Data

The workflow automatically populates the DynamoDB table with data about planets in our solar system, including:
- Planet names (Mercury, Venus, Earth, etc.)
- Descriptions
- Images
- Orbital velocity
- Distance from sun

### 3. Setting Up IAM Permissions

The workflow creates IAM roles and policies that allow the EC2 instance to access the DynamoDB table without needing to store credentials in the application.

## Data Model

The Solar System application uses a simple data model:

| Attribute   | Type   | Description                           |
|-------------|--------|---------------------------------------|
| id          | Number | Primary key, unique identifier        |
| name        | String | Name of the planet                    |
| description | String | Description of the planet             |
| image       | String | URL to an image of the planet         |
| velocity    | String | Orbital velocity (formatted string)   |
| distance    | String | Distance from the Sun (formatted string) |

## Viewing and Managing DynamoDB Data

You can view and manage your DynamoDB tables using:

1. **AWS Console**:
   - Go to the [DynamoDB Dashboard](https://console.aws.amazon.com/dynamodb/)
   - Select your table (solar-system-planets-development or solar-system-planets-production)
   - Use the "Items" tab to view, add, or modify data

2. **AWS CLI**:
   ```bash
   # List all items in the table
   aws dynamodb scan --table-name solar-system-planets-development
   
   # Get a specific planet by ID
   aws dynamodb get-item --table-name solar-system-planets-development --key '{"id": {"N": "3"}}'
