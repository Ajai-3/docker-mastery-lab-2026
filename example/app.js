const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Get MongoDB URI from environment variables or use a default
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/myapp';

// Connect to MongoDB
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Successfully connected to MongoDB!'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send(`
    <h1>Hello from Docker!</h1>
    <p>If you are seeing this, your Node.js container is running successfully.</p>
    <p>Check your container logs to verify the MongoDB connection.</p>
  `);
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
