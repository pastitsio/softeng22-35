const questionController = require('../controllers/question.controller');

const Session = require('../models/session.model');

exports.getAllSessions = async (onlyIds = false) => {
    var sessions = [];
    for await (const ses of Session.find()) { // for every session
        if (onlyIds === true) {
            sessions.push(ses._id);
        } else {
            sessions.push(ses);
        }
    }
    return sessions;
}


exports.getSessionAnswers = async (questionnaireId, sessionId) => {
    try { // fetch session
        var session = await Session.findById(sessionId).exec();
    } catch (err) { throw err; }

    if (session === null) {
        throw new Error(`Session[${sessionId}] does NOT exist.`)
    }

    // find questionnaire
    const questionnaire = session.questionnaires
        .find(q => q.questionnaireId === questionnaireId);
    if (questionnaire === undefined) {
        throw new Error(`Questionnaire[${questionnaireId}] not in Session[${sessionId}].`)
    }

    return {
        questionnaireId: questionnaireId,
        session: sessionId,
        answers: questionnaire.answers
    }

}

exports.getQuestionAnswers = async (questionnaireId, questionId) => {
    var ret = [];

    for await (const session of Session.find()) { // for every session
        // find session containing questionnaire
        var sessionQuestionnaire = session.questionnaires
            .find(q => (q.questionnaireId === questionnaireId));

        if (sessionQuestionnaire) {
            // find answers containing questionId
            if (sessionQuestionnaire.answers) {
                var answer = sessionQuestionnaire.answers
                    .find(ans => ans.questionId === questionId);

                ret.push({
                    session: session._id,
                    ans: answer.optionId
                });
            }
        }
    }

    if (ret.length !== 0) {
        return {
            questionnaireId: questionnaireId,
            questionId: questionId,
            ret
        };
    } else {
        throw new Error(`No matching Questionnaire[${questionnaireId}] and Question[${questionId}] answered`);
    }
}

exports.postQuestinnaireQuestionSessionOption = async (req, res, next) => {
    const questionnaireId = req.params.questionnaireId;
    const questionId = req.params.questionId;
    const sessionId = req.params.sessionId;
    const optionId = req.params.optionId;

    try {
        var question = await questionController
            .getQuestionnaireQuestion(questionnaireId, questionId); // error if not found.

        // error if question.option is not valid.
        if (question.options.every(opt => opt._id !== optionId)) {
            throw new Error(`Option[${optionId}] not in Question[${questionId}].`)
        }

        const sessionAnswer = { questionId: questionId, optionId: optionId };
        var session = await Session // try to fetch; if not exists, create with sessionId.
            .findOneAndUpdate(
                { _id: sessionId }, {},
                { new: true, upsert: true }
            ).lean();

        var sesQuestionnaireIdx = session.questionnaires
            .findIndex(q => q.questionnaireId === questionnaireId); // find Questionnaire index

        var myQuestionnaire;
        if (sesQuestionnaireIdx === -1) {
            // questionnaire never replied in session, init entry
            myQuestionnaire = { questionnaireId: questionnaireId, answers: [] };
        } else {
            // if replied, fetch entry and remove it from array since it'll be updated.
            myQuestionnaire = session.questionnaires[sesQuestionnaireIdx];
            session.questionnaires.splice(sesQuestionnaireIdx, 1);
        }

        // Update answers
        if ((myQuestionnaire.answers.length === 0) || // no answers given or
            (myQuestionnaire.answers.every(a => a.optionId !== optionId))) { // answer not given before.
            myQuestionnaire.answers.push(sessionAnswer);
        }

        // update session questionnaires.
        session.questionnaires.push(myQuestionnaire);
        await Session.updateOne(
            { _id: sessionId },
            {
                $set: {
                    questionnaires: session.questionnaires
                }
            });

        res.status(200).json({
            success: true,
            message: `Answer ${questionnaireId} ${questionId} ${sessionId} ${optionId} uploaded.`
        });

    } catch (err) { next(err); }
}