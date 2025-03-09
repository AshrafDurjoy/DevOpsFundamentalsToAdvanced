const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const AWS = require('aws-sdk');

const app = express();

// Configure AWS SDK - this will use EC2 instance role when deployed
AWS.config.update({ region: process.env.AWS_REGION || 'us-east-1' });

// Create DynamoDB document client
const dynamoDB = new AWS.DynamoDB();
const tableName = process.env.DYNAMODB_TABLE || 'solar-system-planets-development';

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// API to get all planets
app.get('/api/planets', async (req, res) => {
  try {
    const params = {
      TableName: tableName
    };
    
    const data = await dynamoDB.scan(params).promise();
    
    if (!data.Items || data.Items.length === 0) {
      return res.json([]);
    }
    
    const planets = data.Items.map(item => ({
      id: parseInt(item.id.N),
      name: item.name.S,
      description: item.description.S,
      image: item.image.S,
      velocity: item.velocity.S,
      distance: item.distance.S
    }));
    
    res.json(planets);
  } catch (error) {
    console.error('Error fetching planets:', error);
    res.status(500).json({ error: 'Failed to fetch planets', details: error.message });
  }
});

// API to get a specific planet by ID
app.get('/api/planets/:id', async (req, res) => {
  try {
    const params = {
      TableName: tableName,
      Key: {
        id: { N: req.params.id }
      }
    };
    
    const data = await dynamoDB.getItem(params).promise();
    
    if (!data.Item) {
      return res.status(404).json({ error: 'Planet not found' });
    }
    
    const planet = {
      id: parseInt(data.Item.id.N),
      name: data.Item.name.S,
      description: data.Item.description.S,
      image: data.Item.image.S,
      velocity: data.Item.velocity.S,
      distance: data.Item.distance.S
    };
    
    res.json(planet);
  } catch (error) {
    console.error('Error fetching planet:', error);
    res.status(500).json({ error: 'Failed to fetch planet', details: error.message });
  }
});

// Server setup
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// For testing purposes
module.exports = app;