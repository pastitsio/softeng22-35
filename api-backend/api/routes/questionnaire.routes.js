const bodyParser = require("body-parser");
const colors = require('colors/safe');
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const helpers = require('../helpers/helpers');

const log = (x) => {console.log(colors.cyan.underline(x));}

const Questionnaire = require('../models/questionnaire.model');
const Question = require('../models/question.model');

router.get("/:questionnaireId", (req, res, next) => {
    const questionnaireId = req.params.questionnaireId;
    const format = req.query.format;
    
    Questionnaire.findById(questionnaireId)
        .exec()
        .then(doc => {
            Question.find({ '_id': { $in: doc.questions } })
                .exec()
                .then(questions => {
                    try {
                        var formattedData = helpers.formatData(format, {
                            questionnaireId: doc._id,
                            questionnaireTitle: doc.questionnaireTitle,
                            keywords: doc.keywords,
                            questions: questions
                        });
                        res.status(200).send(formattedData);
                    } catch (error) { next(error); };
                });
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
            log(result);
            res.status(200).json({
                success: true,
                message: "Questionnaire uploaded",
                // createdQuestionnaire: questionnaire
            });
        })
        .catch(error => {
            if (error) {
                if (error.name === 'MongoServerError' && error.code === 11000) {
                    return res.status(422).send({
                        success: false,
                        message: 'id already exist!'
                    });
                }
                res.status(422).send(err);
            }
        });

});

module.exports = router;