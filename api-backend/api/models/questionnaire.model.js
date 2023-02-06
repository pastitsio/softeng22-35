const mongoose = require('mongoose');

const questionnaireSchema = mongoose.Schema({
    _id: String,
    questionnaireTitle: {type: String, required: true},
    keywords: [String],
    questions: [String]
});

module.exports = mongoose.model('Questionnaire', questionnaireSchema);