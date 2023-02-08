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
    } catch (err) { throw err; };
});

router.get("/:questionnaireId/:questionId", async (req, res, next) => {
    const format = req.query.format;
    const questionnaireId = req.params.questionnaireId;
    const questionId = req.params.questionId;

    try {
        const question = await questionController.getQuestionnaireQuestion(questionnaireId, questionId);
        res.status(200).send(formatData(format, question));
    } catch (err) { throw err; };
});

router.post("/:questionId", questionController.postQuestion);

module.exports = router;
