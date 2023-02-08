const mongoose = require('mongoose');

const sessionSchema = mongoose.Schema({
    _id: String,
    questionnaireId: String,
    answers: [{
        qId: String,
        optId: String
    }]
});