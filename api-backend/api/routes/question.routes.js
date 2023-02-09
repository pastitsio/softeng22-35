const express = require("express");
const router = express.Router();

const formatData = require('../helpers/helpers').formatData;

const questionController = require('../controllers/question.controller');


router.get("/:questionId", async (req, res, next) => {
    const format = req.query.format;
    const questionId = req.params.questionId;

    try {
        const question = await questionController.getQuestion(questionId);
        res.status(200).send(formatData(format, question));
    } catch (err) { next(err) }
})

router.get("/:questionnaireId/:questionId", async (req, res, next) => {
    const format = req.query.format;
    const questionnaireId = req.params.questionnaireId;
    const questionId = req.params.questionId;

    try {
        const question = await questionController.getQuestionnaireQuestion(questionnaireId, questionId);
        res.status(200).send(formatData(format, question));
    } catch (err) { next(err); };
})

router.post("/:questionId", (req, res, next) => {
    const _id = req.body.questionId;
    const qText = req.body.qText;
    const required = req.body.required;
    const type = req.body.type;
    const options = req.body.options;

    questionController.postQuestion(_id, qText, required, type, options)
        .then(() => {
            log('Question uploaded.');
            res.status(200).json({
                success: true,
                message: `Question[${_id}] uploaded.`
            });
        })
        .catch(next);
})

module.exports = router;
