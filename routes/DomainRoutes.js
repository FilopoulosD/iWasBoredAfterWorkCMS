const express = require('express');
const router = express.Router();
const Domain = require('../models/Domain');

// Create a new domain
router.post('/domains', async (req, res) => {
    try {
        const domain = new Domain(req.body);
        await domain.save();
        res.status(201).json(domain);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all domains
router.get('/domains', async (req, res) => {
    try {
        const domains = await Domain.find().populate('templateId');
        res.json(domains);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
