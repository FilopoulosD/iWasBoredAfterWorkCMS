// Import the required packages and modules.
const express = require('express');
const vhost = require('vhost');
const dotenv = require('dotenv');
// Load environment variables
dotenv.config({ path: './config/.env' });

const hbs = require('hbs');
const path = require('path');
const authMiddleware = require('./middleware/authMiddleware');
const connectDB = require('./config/database');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const app = express(); // Initialize Express app

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Set handlebars as view engine and the directory for templates
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials')); // Register partials directory

// Bodyparser middleware for handling JSON and URL-encoded data
app.use(express.json()); // to handle JSON requests
app.use(express.urlencoded({ extended: true })); // to handle URL-encoded form submissions

app.use(cookieParser()); // App use cookie parser to retrieve json webtoken

connectDB(); // Connect to MongoDB

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


// Site 1 App (for site1.com)
const site1App = express();

site1App.get('/', (req, res) => {
    res.send('Welcome to Site 1!');
});

// Site 2 App (for site2.com)
const site2App = express();

site2App.get('/', (req, res) => {
    res.send('Welcome to Site 2!');
});

// Map domain to specific app
app.use(vhost('site1.com', site1App));  // Requests to site1.com will be handled by site1App
app.use(vhost('site2.com', site2App));

// Root endpoint
app.get('/', authMiddleware, (req, res) => {
    const token = req.cookies.token;
    let userName = 'Guest';

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            userName = decoded.name; // Extract the user's name
        } catch (err) {
            console.error('Invalid token:', err);
        }
    }

    res.render('pages/dashboard', {
        title: 'Home Page', // Explicitly set the page title
        cssFile: 'dashboard', // Explicitly set the css file
        layout: 'layouts/dashboardLayout', // Explicitly set the layout
        userName
    });
});

// Start the server
app.listen(3000, () =>
    console.log('Server running on port 3000.\nVisit: http://localhost:3000 !'),
);
