const Questionnaire = require('../models/questionnaire.model');
const Question = require('../models/question.model');
const questionController = require('../controllers/question.controller');

exports.getQuestionnaire = async function (questionnaireId) {
    try {
        var questionnaire = await Questionnaire.findById(questionnaireId).exec();
    } catch (err) { throw err; }

    if (questionnaire === null) {
        throw new Error(`Questionnaire[${questionnaireId}] does NOT exist.`);
    }

    try {
        const questions = await Promise
            .all(questionnaire.questions.map(questionController.getQuestion)); // fetch questions
        return {
            questionnaireId: questionnaireId,
            questionnaireTitle: questionnaire.questionnaireTitle,
            keywords: questionnaire.keywords,
            questions: questions
                .filter(n => n)
                .map(e => e.toObject()) // mongoose object to js object
                .map(({ options, ...rest }) => rest) // remove options field from object
        };
    } catch (err) { throw err; }
}

exports.postQuestionnaire = (req, res, next) => {
    const questionnaireId = req.body.questionnaireId
    const questionnaire = new Questionnaire({
        _id: questionnaireId,
        questionnaireTitle: req.body.questionnaireTitle,
        keywords: req.body.keywords,
        questions: req.body.questions
    });

    // save on DB
    questionnaire
        .save()
        .then(() => {
            res.status(200).json({
                success: true,
                message: `Questionnaire[${questionnaireId}] uploaded.`,
                // createdQuestionnaire: questionnaire
            });
        })
        .catch(next);
}