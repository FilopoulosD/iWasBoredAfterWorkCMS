const express = require('express');
const app = express.Router();
const Template = require('../models/Template');

// Create a new template
app.post('/templates', async (req, res) => {
    try {
        const template = new Template(req.body);
        await template.save();
        res.status(201).json(template);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

  // Get all templates
app.get('/templates', async (req, res) => {
    try {
        const templates = await Template.find();
        res.send('Welcome to Templates Dashboard!');
        //res.json(templates);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
  
module.exports = app;