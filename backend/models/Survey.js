const mongoose = require('mongoose');

const SurveySchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    responses: [{ type: String }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Survey', SurveySchema);
