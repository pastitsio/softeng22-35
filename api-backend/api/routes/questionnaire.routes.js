const express = require("express");
const router = express.Router();

const formatData = require('../helpers/helpers').formatData;

const questionnaireController = require('../controllers/questionnaire.controller'); const Question = require('../models/question.model');

router.get("/:questionnaireId", async (req, res, next) => {
    const format = req.query.format;
    const questionnaireId = req.params.questionnaireId;

    try {
        const questionnaire = await questionnaireController.getQuestionnaire(questionnaireId);
        res.status(200).send(formatData(format, questionnaire));
    } catch (err) { next(err) };
});

// for testing
router.post('/', questionnaireController.postQuestionnaire);

module.exports = router;