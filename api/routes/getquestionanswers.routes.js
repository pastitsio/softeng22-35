const express = require("express");
const router = express.Router();

const formatData = require('../utilities').formatData;

const sessionController = require('../controllers/session.controller');


router.get('/:questionnaireId/:questionId', async (req, res, next) => {
    const format = req.query.format;
    const questionnaireId = req.params.questionnaireId;
    const questionId = req.params.questionId;

    try {
        const questionAnswers = await sessionController.getQuestionAnswers(questionnaireId, questionId);
        res.status(200).send(formatData(format, questionAnswers));
    } catch (err) { next(err) };

})

module.exports = router;
