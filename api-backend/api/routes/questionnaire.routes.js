const express = require("express");
const router = express.Router();

const formatData = require('../helpers/helpers').formatData;

const questionnaireController = require('../controllers/questionnaire.controller');

router.get("/:questionnaireId", async (req, res, next) => {
    const format = req.query.format;
    const questionnaireId = req.params.questionnaireId;

    try {
        const questionnaire = await questionnaireController.getQuestionnaire(questionnaireId);
        res.status(200).send(formatData(format, questionnaire));
    } catch (err) { next(err) };
});

// for testing
router.post('/', (req, res, next) => {
    const _id = req.body.questionnaireId;
    const questionnaireTitle = req.body.questionnaireTitle;
    const keywords = req.body.keywords;
    const questions = req.body.questions;
    
    questionnaireController.postQuestionnaire(_id, questionnaireTitle, keywords, questions)
        .then(() => {
            res.status(200).json({
                success: true,
                message: `Questionnaire[${_id}] uploaded.`,
                // createdQuestionnaire: questionnaire
            });
        })
        .catch(next);
});

module.exports = router;