const express = require("express");
const multer = require('multer')
const fs = require('fs')
const router = express.Router();

const questionnaireController = require('../../controllers/questionnaire.controller');
const questionController = require('../../controllers/question.controller');

router.post('/', multer({
  filename: (req, file, cb) => { cb(null, file.originalname) },
  dest: "./uploads",
}).single('file'),
  async (req, res, next) => {

    var error = new Error();

    var rawData = fs.readFileSync('./uploads/' + req.file.filename);
    var inputData = JSON.parse(rawData);
    var questionIdArray = [];

    await Promise.all( // upload questions in parallel
      inputData.questions.map((_question) => {
        const question = {
          _id: null,
          questionText: "",
          required: false,
          questionType: "",
          options: []
        };

        try {
          // parse question input data
          question['_id'] = _question.questionId;
          question['questionText'] = _question.questionText;
          question['required'] = (_question.required.toLowerCase() === "true") ? true : false;
          question['questionType'] = _question.questionType;

          // parse options
          _question.options.forEach(option => {
            question['options'].push({
              _id: option.optionId,
              optionText: option.optionText,
              nextQuestionId: option.nextQuestionId
            })
          })
        } catch (err) {
          error.message += err.message + '| Error parsing JSON data on question level. |';
        }

        // upload question
        questionController
          .postQuestion(question);
        // return each questionId as a promise. 
        return question['_id'];
      }))
      .then(questionIds => {
        questionIdArray = questionIds; // Promise.all() returns all promises in an array.
      })
      .catch(err => {
        error.message += err.message + `| Question #[${err.index}] error uploading. |`;
      }); // find where there was an error using err.index

    // parse questionnaire input data
    const questionnaire = {
      _id: null,
      questionnaireTitle: "",
      keywords: [],
      questions: []
    }
    try {
      questionnaire['_id'] = inputData.questionnaireId;
      questionnaire['questionnaireTitle'] = inputData.questionnaireTitle;
      questionnaire['keywords'] = inputData.keywords;
      questionnaire['questions'] = questionIdArray;
    } catch (err) {
      error.message += err.message + '| Error parsing JSON data on questionnaire level. |';
      throw error;
    }

    // upload questionnaire
    questionnaireController.postQuestionnaire(questionnaire)
      .then(() => {
        // All's Well That Ends Well
        res.status(200).json({
          success: true,
          message: `Uploaded Questionnaire[${questionnaire['_id']}] ` +
                   `with questions[${questionnaire['questions']}].`
        });
      })
      .catch(err => {
        error.message += err.message;
        next(error);
      });
  })


module.exports = router;