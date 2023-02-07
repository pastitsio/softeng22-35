const colors = require('colors/safe');
const express = require("express");
const router = express.Router();

const helpers = require('../helpers/helpers');

const Questionnaire = require("../models/questionnaire.model");
const Question = require("../models/question.model");


const log = (x) => { console.log(colors.cyan.underline(x)); }


router.get("/:questionnaireId/:questionId", (req, res, next) => {
    const questionnaireId = req.params.questionnaireId;
    const questionId = req.params.questionId;
    const format = req.query.format;

    Questionnaire.findById(questionnaireId)
        .exec()
        .then(questionnaire => {
            if (questionnaire.questions.includes(questionId) === false) {
                return res.status(400).json({
                    success: false,
                    message: `Question[${questionId}] not in questionnaire[${questionnaireId}].`
                });
            }
            
            Question.findById(questionId)
                .exec()
                .then(question => {
                    try{
                        var formattedData = helpers.formatData(
                            format,
                            {questionnaireId: questionnaireId, question}
                        );
                        res.status(200).send(formattedData);
                    }
                    catch (error) { next(error); };
                })
            

        })
        .catch();

});

router.post("/:questionId", (req, res, next) => {
    const question = new Question({
        _id: req.params.questionId,
        qText: req.body.qText,
        required: req.body.required,
        type: req.body.type,
        options: req.body.options
    })

    question
        .save()
        .then(result => {
            log('Question uploaded.');
            res.status(200).json({
                success: true,
                message: 'Question uploaded.'
            });
        })
        .catch(error => {
            if (error) {
                if (error.name === 'MongoServerError' && error.code === 11000) {
                    return res.status(422).json({
                        success: false,
                        message: 'id already exist!'
                    });
                }
                res.status(422).send(err);
            }
        });
})

module.exports = router;
