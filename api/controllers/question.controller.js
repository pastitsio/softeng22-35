const Question = require('../models/question.model');
const questionnaireController = require('./questionnaire.controller');

exports.getQuestion = async function (questionId) {
    try {
        var question = await Question.findById(questionId).exec();
    } catch (err) { throw err; }
    if (question === null) {
        throw new Error(`Question[${questionId}] does NOT exist.`);
    }
    return question;
}

exports.getQuestionnaireQuestion = async function (questionnaireId, questionId) {
    try { // get questionnaire
        var questionnaire = await questionnaireController.getQuestionnaire(questionnaireId);
    } catch (err) { throw err; }

    questionnaire.questions instanceof Array;
    if (questionnaire.questions.includes(questionId) === false) {
        throw new Error(`Question[${questionId}] not in Questionnaire[${questionnaireId}]`);
    }

    try { // get question
        var question = await this.getQuestion(questionId);
    } catch (err) { throw err; }

    question.questionnaireId = questionnaireId; // add field

    return question;

}

exports.postQuestion = (questionId, qText, required, type, options) => {
    const question = new Question({
        _id: questionId,
        qText: qText,
        required: required,
        type: type,
        options: options,
    })

    // upload on DB
    return question.save();
}