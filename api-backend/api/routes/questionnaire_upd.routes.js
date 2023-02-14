const express = require("express");
const multer = require('multer')
const fs = require('fs')
const router = express.Router();

const Questionnaire = require('../models/questionnaire.model');
const questionnaireController = require('../controllers/questionnaire.controller');

const Question = require('../models/question.model');
const questionController = require('../controllers/question.controller');

// router.post('/', multer({ filename: (req, file, cb) => { cb(null, file.originalname) }, dest: "./uploads", }).single('file'), async function (req, res) {
router.post('/', multer({ filename: (req, file, cb) => { cb(null, file.originalname) }, dest: "./uploads", }).single('file'), async (req, res, next) => {

    var error = new Error();

    var rawData = fs.readFileSync('./uploads/' + req.file.filename);
    var inputData = JSON.parse(rawData);
    var quIdArray = [];
    inputData.questions instanceof Array;
    await Promise.all( // upload questions in parallel
        inputData.questions.map((question) => {
            let quId, qText, required, qType, options = [];
            try {
                // parse question input data
                quId = Object.values(question)[0];
                qText = question.qtext;
                required = (question.required.toLowerCase() === "true") ? true : false;
                qType = question.type;

                // parse options
                question.options instanceof Array;
                question.options.forEach(opt => {
                    options.push({
                        optId: opt.optID,
                        optText: opt.opttxt,
                        nextqId: opt.nextqID
                    })
                })
            } catch (err) {
                error.message += err.message + '| Error parsing JSON data on question level. |';
            }
            // upload question
            questionController.postQuestion(quId, qText, required, qType, options);
            // return each quId as a promise. 
            return quId;
        }))
        .then(quIds => { quIdArray = quIds; }) // Promise.all() returns all promises in an array.
        .catch(err => { error.message += err.message + `| Question #[${err.index}] error uploading. |`; }); // find where there was an error using err.index

    // parse questionnaire input data
    let QId, questionnaireTitle, keywords, questions;
    try {
        QId = inputData.questionnaireID;
        questionnaireTitle = inputData.questionnaireTitle;
        keywords = inputData.keywords;
        questions = quIdArray;
    } catch (err) {
        error.message += err.message + '| Error parsing JSON data on questionnaire level. |';
        throw error;
    }

    // upload questionnaire
    questionnaireController.postQuestionnaire(QId, questionnaireTitle, keywords, questions)
        .then(() => {
            // All's Well That Ends Well
            res.status(200).json({
                success: true,
                message: `Uploaded Questionnaire [${QId}] with questions [${questions}].`
            });
        })
        .catch(err => {
            error.message += err.message;
            next(error);
        });
})


module.exports = router;