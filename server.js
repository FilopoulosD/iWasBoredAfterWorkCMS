// Import the required packages and modules.
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const dotenv = require("dotenv");

// Load environment variables
dotenv.config({ path: './config/.env' })

// Initialize Express app
const app = express();

// Bodyparser middleware for handling JSON data
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Import routes
const templateRoutes = require('./routes/templateRoutes');
const domainRoutes = require('./routes/domainRoutes');
const contentRoutes = require('./routes/contentRoutes');

// Use routes
app.use('/api', templateRoutes);
app.use('/api', domainRoutes);
app.use('/api', contentRoutes);

// Root endpoint
app.get('/', (req, res) => {
    res.send('Welcome to IWasBoredAfterWork CMS!');
});

// Start the server
app.listen(3000, () => console.log('Server running on port 3000'));
