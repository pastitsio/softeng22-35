const Question = require('../models/question.model');
const Questionnaire = require('../models/questionnaire.model.js');

exports.getQuestion = async function (questionId) {
    try {
        const question = await Question.findById(questionId).exec();
        return question;
    } catch (err) { throw err; }
}

exports.getQuestionnaireQuestion = async function (questionnaireId, questionId) {
    try {
        const questionnaire = await Questionnaire.findById(questionnaireId).exec();
        if (questionnaire.questions.includes(questionId) === false) {
            throw new Error(`Question[${questionId}] not in Questionnaire[${questionnaireId}]`);
        }
        const questionDoc = await Question.findById(questionId).exec();

        var question = questionDoc.toObject(); // mongoose object to js object
        question.questionnaireId = questionnaireId; // add field

        return question;

    } catch (err) { throw err; }
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