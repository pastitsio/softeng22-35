const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    _id: String,
    qText: String,
    required: Boolean,

    qType:  {'type':String, 'enum': ['profile', 'question'] },
    options: [{
        optId: String,
        optText: String,
        nextqId: String
    }],


});

module.exports = mongoose.model('Question', questionSchema);