const questionController = require('../controllers/question.controller');

const Session = require('../models/session.model');


exports.getSessionAnswers = async (questionnaireId, sessionId) => {
    try { // fetch session
        var session = await Session.findById(sessionId).exec();
    } catch (err) { throw err; }

    if (session === null) {
        throw new Error(`Session[${sessionId}] does NOT exist.`)
    }

    // find questionnaire
    const questionnaire = session.questionnaires.find(q => q.questionnaireId === questionnaireId);
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
        var sQ = session.questionnaires.find(q => (q.questionnaireId === questionnaireId));

        if (sQ) {
            // find answers containing questionId
            if (sQ.answers) {
                var answer = sQ.answers.find(ans => ans.qID === questionId);
                ret.push({
                    session: session._id,
                    ans: answer.optID
                });
            }
        }
    }

    if (ret.length !== 0) {
        return {
            questionnaireId: questionnaireId,
            questionID: questionId,
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
        var question = await questionController.getQuestionnaireQuestion(questionnaireId, questionId); // error if not found.

        if (question.options.some(opt => opt.optId === optionId)) { // error if question option is not valid.

            const sessionAnswer = { qID: questionId, optID: optionId };

            var session = await Session // fetch, if not exists, create with sessionId.
                .findOneAndUpdate(
                    { _id: sessionId }, {},
                    { new: true, upsert: true }
                ).lean();

            // session.questionnaires instanceof Array;
            var sQindex = session.questionnaires.findIndex(q => q.questionnaireId === questionnaireId); // find Q index
            var myQ;

            if (sQindex === -1) {
                // questionnaire never replied in session, init entry
                myQ = { questionnaireId: questionnaireId, answers: [] };
            } else {
                // if replied, fetch entry and remove it from array since it'll be updated.
                myQ = session.questionnaires[sQindex];
                session.questionnaires.splice(sQindex, 1);
            }

            // Update answers
            if ((myQ.answers.length === 0) || // no answers given or
                (myQ.answers.every(a => a.optID !== optionId))) { // answer not given before.
                myQ.answers.push(sessionAnswer);
            }

            // update session questionnaires.
            session.questionnaires.push(myQ);
            await Session.updateOne(
                { _id: sessionId },
                {
                    $set: {
                        questionnaires: session.questionnaires
                    }
                });

            res.status(200).json({
                success: true,
                message: "Answer uploaded."
            });
            // } catch (err) { throw new Error("Problem uploading answer.") };
        } else {
            throw new Error(`Option[${optionId}] not in Question[${questionId}].`)
        }
    } catch (err) { next(err); }
}