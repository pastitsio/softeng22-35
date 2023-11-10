const Question = require('../models/question.model');
const questionnaireController = require('./questionnaire.controller');

const getQuestion = async function (questionId) {
    try {
        var question = await Question.findById(questionId).lean();
    } catch (err) { throw err; }
    if (question === null) {
        throw new Error(`Question[${questionId}] does NOT exist.`);
    }
    return question;
}

const getQuestionnaireQuestion = async function (questionnaireId, questionId) {
    try { // get questionnaire
        var questionnaire = await questionnaireController.getQuestionnaire(questionnaireId);
    } catch (err) { throw err }
    // check if it contains question's id
    if (questionnaire.questions?.includes(questionId) === false) {
        throw new Error(`Question[${questionId}] not in Questionnaire[${questionnaireId}]`);
    }

    try { // get question
        var question = await this.getQuestion(questionId);
    } catch (err) { throw err; }

    return { ...question, questionnaireId: questionnaireId };

}

const postQuestion = (_question) => {
    const question = new Question({ ..._question });
    return question.save();
}

module.exports = {
    getQuestion,
    getQuestionnaireQuestion,
    postQuestion
}