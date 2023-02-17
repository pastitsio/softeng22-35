const Questionnaire = require('../models/questionnaire.model');
const Question = require('../models/question.model');
const questionController = require('../controllers/question.controller');

exports.getAll = async () => {
    var ret = [];
    try {
        for await (const questionnaire of Questionnaire.find()) {
            ret.push(questionnaire);
        }
    } catch (err) { throw err; }
    return ret;
}

exports.getQuestionnaire = async (questionnaireId, onlyIds = true) => {
    try {
        var questionnaire = await Questionnaire.findById(questionnaireId).exec();
    } catch (err) { throw err; }

    if (questionnaire === null) {
        throw new Error(`Questionnaire[${questionnaireId}] does NOT exist.`);
    }

    var questions;
    if (onlyIds === false) {
        // replace ids with actual questions
        try {
            questions = await Promise
                .all(questionnaire.questions.map(questionController.getQuestion)); // fetch questions
        } catch (err) { throw err; }

        questions = questions
            .filter(n => n)
        // .map(({ options, ...rest }) => rest) // remove options field from object
    } else {
        questions = questionnaire.questions;
    }

    questions instanceof Array;
    return {
        questionnaireId: questionnaireId,
        questionnaireTitle: questionnaire.questionnaireTitle,
        keywords: questionnaire.keywords,
        questions: questions
    };
}

exports.postQuestionnaire = (questionnaireId, questionnaireTitle, keywords, questions) => {
    const questionnaire = new Questionnaire({
        _id: questionnaireId,
        questionnaireTitle: questionnaireTitle,
        keywords: keywords,
        questions: questions
    });

    // save on DB
    return questionnaire.save();
}