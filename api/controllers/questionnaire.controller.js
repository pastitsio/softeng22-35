const Questionnaire = require('../models/questionnaire.model');
const questionController = require('./question.controller');

exports.getAll = async () => {
    try {
        return await Questionnaire.find().lean();
    } catch (err) { throw err; }
}

exports.getQuestionnaire = async (questionnaireId, onlyIds = true) => {
    try {
        var questionnaire = await Questionnaire.findById(questionnaireId).exec();
    } catch (err) { throw err; }

    if (questionnaire === null) {
        throw new Error(`Questionnaire[${questionnaireId}] does NOT exist.`);
    }

    var _questions = [];
    if (onlyIds === false) {
        // replace ids with actual questions
        try {
            _questions = await Promise
                .all(questionnaire['questions']
                    .map(questionController.getQuestion)); // fetch questions
        } catch (err) { throw err; }

        // questions = questions
        //     .filter(n => n)
        // .map(({ options, ...rest }) => rest) // remove options field from object
    }

    return {
        questionnaireId: questionnaireId,
        questionnaireTitle: questionnaire.questionnaireTitle,
        keywords: questionnaire.keywords,
        questions: onlyIds ? questionnaire.questions : _questions
    };
}

exports.postQuestionnaire = (_questionnaire) => {
    const questionnaire = new Questionnaire({ ..._questionnaire });
    return questionnaire.save();// save on DB
}

// module.exports = {
//     getAll,
//     getQuestionnaire,
//     postQuestionnaire
// }