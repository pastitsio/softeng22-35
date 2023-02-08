const questionController = require('../controllers/question.controller');
const Session = require('../models/session.model');

exports.postQuestinnaireQuestionSessionOption = async (questionnaireId, questionId, sessionId, optionId) => {
    try {
        const question = await questionController.getQuestionnaireQuestion(questionnaireId, questionId);
        if (question.options.array.some(opt => opt.optId === optionId)) {
            const session = new Session({
                _id: sessionId,
                questionnaireId: questionnaireId,
                // TODO
            });
        }
    } catch (err) { throw err; }

}