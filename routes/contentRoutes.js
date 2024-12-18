const express = require('express');
const router = express.Router();
const Content = require('../models/Content');

// Create content for a domain
router.post('/content', async (req, res) => {
    try {
        const content = new Content(req.body);
        await content.save();
        res.status(201).json(content);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get content by domain ID
router.get('/content/:domainId', async (req, res) => {
    try {
        const content = await Content.findOne({ domainId: req.params.domainId }).populate('templateId');
        res.json(content);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;