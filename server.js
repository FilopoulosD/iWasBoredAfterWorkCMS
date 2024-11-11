// Import the required packages and modules.
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const dotenv = require("dotenv");

// Load environment variables
dotenv.config({ path: './config/.env' })

// Define models
const app = express();

// Bodyparser middleware for handling JSON data
app.use(bodyParser.json());

// Connect to DB
connectDB();

// Define routes
app.get('/', (req, res) => {
    res.send('Welcome to IWasBoredAfterWork CMS!');
});

// Start the server
app.listen(3000, () => console.log('Server running on port 3000'));
