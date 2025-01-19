// Import the required packages and modules.
const express = require('express');

const dotenv = require('dotenv');
dotenv.config({ path: './config/.env' });

const hbs = require('hbs');
const path = require('path');
const authMiddleware = require('./middleware/authMiddleware');
const connectDB = require('./config/database');
// Load environment variables

// Initialize Express app
const app = express();

// Set handlebars as view engine and the directory for templates
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Bodyparser middleware for handling JSON and URL-encoded data
app.use(express.json()); // to handle JSON requests
app.use(express.urlencoded({ extended: true })); // to handle URL-encoded form submissions

// Connect to MongoDB
connectDB();

// Import routes
const templateRoutes = require('./routes/templateRoutes');
const domainRoutes = require('./routes/domainRoutes');
const contentRoutes = require('./routes/contentRoutes');
const apiRoutes = require('./routes/apiRoutes');

// Use routes
app.use('/api', templateRoutes);
app.use('/api', domainRoutes);
app.use('/api', contentRoutes);
app.use('/api', apiRoutes);

// Root endpoint
app.get('/', authMiddleware, (req, res) => {
    res.send('Welcome to IWasBoredAfterWork CMS!');
});

// Start the server
app.listen(3000, () => console.log('Server running on port 3000'));
