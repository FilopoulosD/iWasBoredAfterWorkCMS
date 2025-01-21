const express = require('express');
const app = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

app.get('/register', async (req, res) => {
    try {
        res.render('pages/register');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const newUser = new User({ username, email, password });
        await newUser.save();
        // User registered successfully!
        res.redirect('/api/login');
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/login', async (req, res) => {
    try {
        res.render('pages/login', {
            title: 'Login Page', // Explicitly set the page title
            cssFile: 'login', // Explicitly set the css file
            layout: 'layouts/dashboardLayout', // Explicitly set the layout
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res
                .status(400)
                .json({ error: 'No user found with that username' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Wrong password' });

        const token = jwt.sign(
            { id: user._id, name: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Set token as cookie
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/logout', async (req, res) => {
    res.clearCookie('token');
    res.redirect('/api/login');
});

app.get('/users', async (req, res) => {
    try {
        res.render('pages/dashboardUsers', {
            title: "User's Page",
            cssFile: 'users',
            layout: 'layouts/dashboardLayout',
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = app;
