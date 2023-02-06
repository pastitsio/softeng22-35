const bodyParser = require("body-parser");
const colors = require('colors/safe');
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const log = colors.cyan.underline

const Questionnaire = require('../models/questionnaire.model');
const Question = require('../models/question.model');
const { json } = require("body-parser");

router.get("/:questionnaireId", (req, res, next) => {
    const questionnaireId = req.params.questionnaireId;

    Questionnaire.findById(questionnaireId)
        .exec()
        .then(doc => {
            console.log(doc.questions);
            // res.status(200).json({
            //     returnedQuestionnaire: doc
            // })
            Question.find({'_id' : { $in: doc.questions}})
                .exec()
                .then(qs => {
                    res.status(200).json({
                        questionnaire: {
                            questionnaireId: doc._id,
                            questionnaireTitle: doc.questionnaireTitle,
                            keywords: doc.keywords,
                            questions: qs                
                        }
                    });
                })
                ;
        })
        .catch(error => {
            next(new Error(`questionnaireId: ${questionnaireId} not found`))
        });
    
});

// test
router.post('/', (req, res, next) => {
    const questionnaire = new Questionnaire({
        _id: req.body.questionnaireId,
        questionnaireTitle: req.body.questionnaireTitle,
        keywords: req.body.keywords,
        questions: req.body.questions
    });

    // save on DB
    questionnaire.save()
        .then(result => {
            console.log(log(result));
            res.status(200).json({
                message: "Handling POST request to /questionnaire",
                createdQuestionnaire: questionnaire
            });
        })
        .catch(error => console.log(error));

});

module.exports = router;