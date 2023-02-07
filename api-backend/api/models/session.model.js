const mongoose = require('mongoose');

const sessionSchema = mongoose.Schema({
    _id: String,
    questionnaireId: String,
    answers: [{ type: String, ref: 'Question' }],
});

module.exports = mongoose.model('Session', sessionSchema);