const express = require('express');
const app = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

app.get('/register', async (req, res) => {
    try {
        res.render('register');
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
        res.render('login');
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

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.status(200).json({ token, message: 'Login successful!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = app;
