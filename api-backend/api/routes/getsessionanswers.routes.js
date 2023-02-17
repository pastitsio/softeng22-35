const express = require("express");
const router = express.Router();

const formatData = require('../helpers/helpers').formatData;

const sessionController = require('../controllers/session.controller');

router.get('/:questionnaireId/:sessionId', async (req, res, next) => {
    const format = req.query.format;
    const questionnaireId = req.params.questionnaireId;
    const sessionId = req.params.sessionId;

    try {
        const sessionAnswers = await sessionController.getSessionAnswers(questionnaireId, sessionId);
        res.status(200).send(formatData(format, sessionAnswers));
    } catch (err) { next(err) };


})

module.exports = router;