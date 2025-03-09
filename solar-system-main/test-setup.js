// This file provides mock DynamoDB functionality for tests

// Using sinon for mocking with Mocha/Chai instead of Jest
const sinon = require('sinon');
const AWS = require('aws-sdk');

// Configure AWS SDK for local testing
const configureDynamoDBForTesting = () => {
  // Sample planet data for tests
  const planets = [
    {
      id: { N: '1' },
      name: { S: 'Mercury' },
      description: { S: 'Mercury is the smallest planet in our solar system.' },
      image: { S: 'https://example.com/mercury.jpg' },
      velocity: { S: '47.87 km/s' },
      distance: { S: '57.91 million km' }
    },
    {
      id: { N: '2' },
      name: { S: 'Venus' },
      description: { S: 'Venus is the second planet from the Sun.' },
      image: { S: 'https://example.com/venus.jpg' },
      velocity: { S: '35.02 km/s' },
      distance: { S: '108.2 million km' }
    }
  ];

  // Create a DocumentClient stub
  const documentClientStub = {
    scan: sinon.stub().returns({
      promise: sinon.stub().resolves({ Items: planets })
    }),
    getItem: sinon.stub().callsFake((params) => {
      const id = params.Key.id.N;
      const item = planets.find(p => p.id.N === id);
      return {
        promise: sinon.stub().resolves(item ? { Item: item } : {})
      };
    })
  };

  // Stub the DynamoDB.DocumentClient constructor
  sinon.stub(AWS, 'DynamoDB').returns({
    DocumentClient: sinon.stub().returns(documentClientStub)
  });

  // Set environment variables needed for testing
  process.env.DYNAMODB_TABLE = 'solar-system-planets-test';
  process.env.AWS_REGION = 'us-east-1';
};

// Export the setup function
module.exports = { configureDynamoDBForTesting };
