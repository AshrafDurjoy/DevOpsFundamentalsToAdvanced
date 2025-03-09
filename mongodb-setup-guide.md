# MongoDB Setup Guide for Solar System Application

This guide explains how to set up MongoDB for the Solar System application. MongoDB is the database that stores information about planets in our Solar System application.

## Option 1: MongoDB Atlas (Recommended for Beginners)

MongoDB Atlas is a fully-managed cloud database service that's free to get started. This is the easiest option for beginners.

### Step 1: Create a MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and click "Try Free"
2. Sign up with your email or Google/GitHub account
3. Complete the welcome survey (or skip it)

### Step 2: Create a Free Cluster

1. Choose "Shared" (Free) option
2. Select your preferred cloud provider (AWS, Google Cloud, or Azure)
3. Choose a region closest to your users/EC2 instance
4. Click "Create Cluster" (creation will take 1-3 minutes)

### Step 3: Set Up Database Access

1. While the cluster is being created, click on "Database Access" in the left menu
2. Click "Add New Database User"
3. Choose "Password" for Authentication Method
4. Enter a username and password (save these securely!)
5. Under "Database User Privileges," select "Read and write to any database"
6. Click "Add User"

### Step 4: Configure Network Access

1. Click on "Network Access" in the left menu
2. Click "Add IP Address"
3. For development, you can click "Allow Access from Anywhere" (not recommended for production)
4. For production, add the specific IP of your EC2 instance
5. Click "Confirm"

### Step 5: Get Your Connection String

1. Go back to "Database" in the left menu
2. Click "Connect" on your cluster
3. Select "Connect your application"
4. Copy the connection string (it will look like `mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
5. Replace `<password>` with your actual password and `myFirstDatabase` with `solar-system`

### Step 6: Import Initial Data

1. Download and install [MongoDB Database Tools](https://www.mongodb.com/try/download/database-tools)
2. Create a JSON file named `planets.json` with the following content:

```json
[
  {
    "name": "Mercury",
    "id": 1,
    "description": "Mercury is the smallest and innermost planet in the Solar System. It is named after the Roman deity Mercury, the messenger of the gods.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Mercury_in_color_-_Prockter07-edit1.jpg/1024px-Mercury_in_color_-_Prockter07-edit1.jpg",
    "velocity": "47.87 km/s",
    "distance": "57.91 million km"
  },
  {
    "name": "Venus",
    "id": 2,
    "description": "Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Venus-real_color.jpg/1024px-Venus-real_color.jpg",
    "velocity": "35.02 km/s",
    "distance": "108.2 million km"
  },
  {
    "name": "Earth",
    "id": 3,
    "description": "Earth is the third planet from the Sun and the only astronomical object known to harbor life.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/The_Blue_Marble_%28remastered%29.jpg/1024px-The_Blue_Marble_%28remastered%29.jpg",
    "velocity": "29.78 km/s",
    "distance": "149.6 million km"
  },
  {
    "name": "Mars",
    "id": 4,
    "description": "Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System. It is often referred to as the 'Red Planet'.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/1024px-OSIRIS_Mars_true_color.jpg",
    "velocity": "24.13 km/s",
    "distance": "227.9 million km"
  },
  {
    "name": "Jupiter",
    "id": 5,
    "description": "Jupiter is the fifth planet from the Sun and the largest planet in the Solar System. It is a gas giant with a mass 2.5 times that of all the other planets combined.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Jupiter%2C_image_taken_by_NASA%27s_Hubble_Space_Telescope%2C_June_2019_-_Edited.jpg/1024px-Jupiter%2C_image_taken_by_NASA%27s_Hubble_Space_Telescope%2C_June_2019_-_Edited.jpg",
    "velocity": "13.07 km/s",
    "distance": "778.5 million km"
  },
  {
    "name": "Saturn",
    "id": 6,
    "description": "Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is a gas giant with an average radius about nine times that of Earth.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saturn_during_Equinox.jpg/1024px-Saturn_during_Equinox.jpg",
    "velocity": "9.69 km/s",
    "distance": "1.434 billion km"
  },
  {
    "name": "Uranus",
    "id": 7,
    "description": "Uranus is the seventh planet from the Sun. It has the third-largest planetary radius and fourth-largest planetary mass in the Solar System.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Uranus2.jpg/1024px-Uranus2.jpg",
    "velocity": "6.81 km/s",
    "distance": "2.871 billion km"
  },
  {
    "name": "Neptune",
    "id": 8,
    "description": "Neptune is the eighth and farthest known Solar planet from the Sun. It is the fourth-largest planet by diameter, the third-most-massive planet, and the densest giant planet.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg/1024px-Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg",
    "velocity": "5.43 km/s",
    "distance": "4.495 billion km"
  },
  {
    "name": "Sun",
    "id": 9,
    "description": "The Sun is the star at the center of the Solar System. It is a nearly perfect sphere of hot plasma, heated to incandescence by nuclear fusion reactions in its core.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg/1024px-The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg",
    "velocity": "220 km/s",
    "distance": "0 km (center of the solar system)"
  }
]
```

3. Import the data using MongoDB Database Tools:
   ```bash
   mongoimport --uri="your_connection_string" --collection=planets --file=planets.json --jsonArray
   ```

## Option 2: Self-Hosted MongoDB on EC2

If you prefer to host MongoDB on the same EC2 instance as your application, follow these steps:

### Step 1: Install MongoDB on EC2

Connect to your EC2 instance via SSH and install MongoDB:

**For Amazon Linux 2:**
```bash
# Create a repository file
sudo tee /etc/yum.repos.d/mongodb-org-5.0.repo > /dev/null <<EOF
[mongodb-org-5.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/amazon/2/mongodb-org/5.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-5.0.asc
EOF

# Install MongoDB
sudo yum install -y mongodb-org

# Start and enable MongoDB service
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify it's running
sudo systemctl status mongod
```

**For Ubuntu:**
```bash
# Import the MongoDB public key
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -

# Create a list file for MongoDB
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list

# Reload local package database
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb-org

# Start and enable MongoDB service
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify it's running
sudo systemctl status mongod
```

### Step 2: Configure MongoDB Security

By default, MongoDB only listens to localhost. For a production environment, you should:

1. Create an admin user:
   ```bash
   mongosh
   ```

   Then in the MongoDB shell:
   ```javascript
   use admin
   db.createUser({
     user: "adminUser",
     pwd: "securePassword",  // Use a strong password
     roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
   })
   ```

2. Enable authentication in MongoDB:
   ```bash
   sudo nano /etc/mongod.conf
   ```

   Add or modify the security section:
   ```yaml
   security:
     authorization: "enabled"
   ```

3. Restart MongoDB:
   ```bash
   sudo systemctl restart mongod
   ```

### Step 3: Create Database and User for the Application

1. Connect to MongoDB with your admin user:
   ```bash
   mongosh admin -u adminUser -p
   ```

2. Create a database and user for Solar System application:
   ```javascript
   use solar-system
   db.createUser({
     user: "solar-user",
     pwd: "solarPassword",  // Use a strong password
     roles: [ { role: "readWrite", db: "solar-system" } ]
   })
   ```

3. Import the planets data:
   ```bash
   # Download the planets.json file
   curl -o planets.json https://raw.githubusercontent.com/yourusername/DevOpsFundamentalsToAdvanced/main/solar-system-main/data/planets.json

   # Import the data
   mongoimport --db=solar-system --collection=planets --file=planets.json --jsonArray --username=solar-user --password=solarPassword --authenticationDatabase=solar-system
   ```

### Step 4: Configure Connection String for Application

When using localhost MongoDB, your connection string will be:
```
mongodb://solar-user:solarPassword@localhost:27017/solar-system
```

## Option 3: AWS DocumentDB

For a more managed AWS-native solution, you can use DocumentDB, which is AWS's MongoDB-compatible database service. This is more advanced but provides better integration with other AWS services.

### Step 1: Create an AWS DocumentDB Cluster

1. Go to the AWS Management Console
2. Navigate to DocumentDB
3. Click "Create"
4. Configure your cluster:
   - Choose a cluster identifier (e.g., `solar-system-db`)
   - Set instance class (t3.medium is the smallest available)
   - Set number of instances (1 for development)
   - Configure credentials (username and password)
   - Configure VPC and subnet groups (use the same VPC as your EC2 instance)
   - Click "Create cluster"

### Step 2: Configure Security Group

Ensure your EC2 instance's security group can access the DocumentDB cluster:

1. Go to the DocumentDB cluster details
2. Note the security group ID
3. Go to EC2 → Security Groups
4. Select the DocumentDB security group
5. Add an inbound rule allowing MongoDB port (27017) from your EC2 security group

### Step 3: Configure TLS and Connect

AWS DocumentDB requires TLS. To connect:

1. Download the CA certificate:
   ```bash
   wget https://s3.amazonaws.com/rds-downloads/rds-combined-ca-bundle.pem
   ```

2. Create a connection string:
   ```
   mongodb://username:password@your-cluster-endpoint:27017/solar-system?ssl=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false
   ```

## Setting Up GitHub Secrets for MongoDB

After you have your MongoDB set up, add these secrets to your GitHub repository:

1. Go to your GitHub repository
2. Navigate to Settings → Secrets and variables → Actions
3. Add the following secrets:
   - `DEV_MONGO_URI`: Your development MongoDB connection string
   - `DEV_MONGO_USERNAME`: Your development MongoDB username
   - `DEV_MONGO_PASSWORD`: Your development MongoDB password
   - `PROD_MONGO_URI`: Your production MongoDB connection string
   - `PROD_MONGO_USERNAME`: Your production MongoDB username
   - `PROD_MONGO_PASSWORD`: Your production MongoDB password

## Testing Your MongoDB Connection

You can test your MongoDB connection using a simple script:

```javascript
const mongoose = require('mongoose');

// Replace with your connection string
const uri = 'your_mongodb_connection_string';

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB successfully!');
    
    // Try to query the planets collection
    return mongoose.connection.db.collection('planets').countDocuments();
})
.then(count => {
    console.log(`Found ${count} planets in the database`);
    mongoose.connection.close();
})
.catch(err => {
    console.error('Failed to connect to MongoDB', err);
});
```

Save this as `test-mongo.js`, install mongoose (`npm install mongoose`), and run it with Node.js.

## Troubleshooting MongoDB Connectivity

If you encounter connection issues:

1. **Connection refused**:
   - Verify MongoDB is running: `sudo systemctl status mongod`
   - Check if it's listening on the expected port: `sudo netstat -plunt | grep mongo`

2. **Authentication failed**:
   - Verify username and password
   - Check the authentication database (usually specified in the connection string)

3. **Network issues**:
   - Verify security groups/firewalls allow traffic
   - For MongoDB Atlas, check IP whitelist settings
   - For DocumentDB, verify VPC and security group settings

4. **TLS/SSL issues**:
   - Verify your connection string includes the correct SSL parameters
   - For DocumentDB, ensure you're using the correct CA certificate
