const express = require("express");
const multer = require('multer')
const fs = require('fs')
const router = express.Router();

const Questionnaire = require('../models/questionnaire.model');
const questionnaireController = require('../controllers/questionnaire.controller');

const Question = require('../models/question.model');
const questionController = require('../controllers/question.controller');

router.post('/', multer({ filename: (req, file, cb) => { cb(null, file.originalname) }, dest: "./uploads", })
    .single('file'), async (req, res, next) => {

        var error = new Error();

        var rawData = fs.readFileSync('./uploads/' + req.file.filename);
        var inputData = JSON.parse(rawData);
        var quIdArray = [];

        inputData.questions instanceof Array;
        await Promise.all( // upload questions in parallel
            inputData.questions.map(async (question) => {

                // parse question input data
                let quId, qText, required, qType;
                try {
                    quId = question._id;
                    qText = question.qText;
                    required = question.required;
                    qType = question.type;

                    var options = [];
                    question.options instanceof Array;
                    question.options.forEach(opt => {
                        options.push({
                            optId: opt.optID,
                            optText: opt.opttxt,
                            nextqId: opt.nextqID
                        })
                    })
                } catch (err) { error.message = 'Error parsing JSON data on question level.'; throw error; }

                // upload question
                await questionController.postQuestion(quId, qText, required, qType, options)
                    .then(() => { quIdArray.push(quId); })
                    .catch(err => { error.message += `Question[${quId}] error uploading |`; });
            }))

        // parse questionnaire input data
        let QId, questionnaireTitle, keywords, questions;
        try {
            QId = inputData.questionnaireID;
            questionnaireTitle = inputData.questionnaireTitle;
            keywords = inputData.keywords;
            questions = quIdArray;
        } catch (err) { error.message = 'Error parsing JSON data on questionnaire level.'; throw error; }

        questionnaireController.postQuestionnaire(QId, questionnaireTitle, keywords, questions)
            .catch(next);

        res.status(200).json({
            success: true,
            message: `Uploaded Questionnaire[${_id} with questions[${quIdArray}].`
        });
    }
)


module.exports = router;