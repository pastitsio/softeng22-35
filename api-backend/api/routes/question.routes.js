const colors = require('colors/safe');
const express = require("express");
const router = express.Router();

const Questionnaire = require("../models/questionnaire.model");
const Question = require("../models/question.model");
const mongoose = require("mongoose");

const log = colors.cyan.underline


router.get("/:questionnaireId/:questionId", (req, res, next) => {
    const questionnaireId = req.params.questionnaireId;
    const questionId = req.params.questionId;

        res.status(200).json({
        quiestonnaire: "Here it should be an object from the database.", // TODO: fetch json from database.
        questionnaireId: questionnaireId,
        questionId: questionId,
    }); // 200: success
});

router.post("/:questionId", (req, res, next) => {
    const questionId = req.params.questionId;
    const question = new Question({
        _id: questionId,
        qText: req.body.qText,
        required: req.body.required,
        type: req.body.type,
        options: req.body.options
    })
    question.save()
        .then(result => {
            console.log(log(`Uploaded question with id ${questionId}.`))
            res.status(200).json({
                message: `Uploaded question with id ${questionId}.`
            });
        })
        .catch(error => console.log(error));
})

module.exports = router;
