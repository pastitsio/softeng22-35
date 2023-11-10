const express = require("express");
const router = express.Router();

const formatData = require('../utilities').formatData;

const questionController = require('../controllers/question.controller');

router.post("/", async (req, res, next) => {
    const question = req.body;

    try {
        await questionController.postQuestion(question);
        res.status(200).json({
            success: true,
            message: `Question[${question?.questionId}] uploaded.`
        });
    } catch (err) { next(err) };
})


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
        const question = await questionController
            .getQuestionnaireQuestion(questionnaireId, questionId);
        res.status(200).send(formatData(format, question));
    } catch (err) { next(err) };
})

module.exports = router;
