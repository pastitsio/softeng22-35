const mongoose = require('mongoose');

const sessionSchema = mongoose.Schema({
    _id: String,
    questionnaires: [{
        questionnaireId: String,
        answers: [{
            qID: String,
            optID: String
        }]
    }]
});

module.exports = mongoose.model('Session', sessionSchema);
