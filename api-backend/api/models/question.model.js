const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    qId: String,
    qText: String,
    required: Boolean,
    type: String,
    options: {
            optId: String,
            optText: String,
            nextqId: String
        },
    // questionnaire: {type: Schema.ObjectId, ref: 'Questionnaire'}
});