const express = require('express');
const router = express.Router();
const Template = require('../models/Template');

// Create a new template
router.post('/templates', async (req, res) => {
    try {
        const template = new Template(req.body);
        await template.save();
        res.status(201).json(template);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

  // Get all templates
router.get('/templates', async (req, res) => {
    try {
        const templates = await Template.find();
        res.json(templates);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
  
module.exports = router;