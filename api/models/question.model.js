const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    _id: String,
    questionText: String,
    required: Boolean,

    questionType:  {'type':String, 'enum': ['profile', 'question'] },
    options: [{
        _id: String,
        optionText: String,
        nextQuestionId: String
    }],


});

module.exports = mongoose.model('Question', questionSchema);