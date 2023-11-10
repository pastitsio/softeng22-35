const mongoose = require('mongoose');

const sessionSchema = mongoose.Schema({
    _id: String,
    questionnaires: [{
        questionnaireId: String,
        answers: [{
            questionId: String,
            optionId: String
        }]
    }]
});


module.exports = mongoose.model('Session', sessionSchema);
