const mongoose = require('mongoose');


const questionnaireSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    questionnaireId: String,
    questionnaireTitle: String,
    keywords: [String],
    // questions: {type: Schema.ObjectId, ref: 'Question'} // assuming you name your model User     
});

module.exports = mongoose.model('Questionnaire', questionnaireSchema);