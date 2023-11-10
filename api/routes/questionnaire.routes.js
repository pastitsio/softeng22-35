const express = require("express");
const router = express.Router();

const formatData = require('../utilities').formatData;

const questionnaireController = require('../controllers/questionnaire.controller');

router.get("/:questionnaireId", async (req, res, next) => {
    const format = req.query.format;
    const questionnaireId = req.params.questionnaireId;
    const onlyIds = req.query.onlyIds === undefined ? false: true;

    try {
        const questionnaire = await questionnaireController.getQuestionnaire(questionnaireId, onlyIds);
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

router.get("/", async (req, res, next) => {
    const format = req.query.format;
    try {
        const questionnaires = await questionnaireController.getAll();
        res.status(200).send(formatData(format, questionnaires));
    } catch (err) { next(err) };
})

module.exports = router;