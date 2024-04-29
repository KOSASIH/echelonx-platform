const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const Web3 = require('web3');

// Load environment variables from .env file
dotenv.config();

// Initialize the Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to the blockchain network
const web3 = new Web3(process.env.BLOCKCHAIN_URL);

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to EchelonX Blockchain!');
});

// Add blockchain routes
app.use('/blockchain', require('./routes/blockchain'));

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Blockchain server is running on port ${PORT}`);
});
