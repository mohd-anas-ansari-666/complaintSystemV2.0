const express = require('express');
const Survey = require('../models/Survey');
const { auth } = require('../middleware/auth');
const router = express.Router();

// Submit a survey response
router.post('/respond/:id', auth, async (req, res) => {
    try {
        const survey = await Survey.findById(req.params.id);
        survey.responses.push(req.body.response);
        await survey.save();
        res.status(200).json(survey);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Get all surveys
router.get('/', auth, async (req, res) => {
    try {
        const surveys = await Survey.find();
        res.status(200).json(surveys);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
