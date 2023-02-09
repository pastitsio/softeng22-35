const Question = require('../models/question.model');
const Questionnaire = require('../models/questionnaire.model');

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
        var questionnaire = await Questionnaire.findById(questionnaireId);
    } catch (err) { throw err; }

    questionnaire.questions instanceof Array;
    // var q = questionnaire.questions.find(q => q._id == questionId); // check if q Id
    if (questionnaire.questions.includes(questionId) === false) {
        throw new Error(`Question[${questionId}] not in Questionnaire[${questionnaireId}]`);
    }

    try { // get question
        var question = await this.getQuestion(questionId);
    } catch (err) { throw err; }

    question.questionnaireId = questionnaireId; // add field

    return question;

}

exports.postQuestion = (req, res, next) => {
    const questionId = req.params.questionId;
    const question = new Question({
        _id: questionId,
        qText: req.body.qText,
        required: req.body.required,
        type: req.body.type,
        options: req.body.options
    })

    question
        .save()
        .then(() => {
            log('Question uploaded.');
            res.status(200).json({
                success: true,
                message: `Question[${questionId}] uploaded.`
            });
        })
        .catch(next);
}