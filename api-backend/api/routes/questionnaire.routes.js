const bodyParser = require("body-parser");
const colors = require('colors/safe');
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const log = colors.cyan.underline

const Questionnaire = require('../models/questionnaire.model');

router.get("/:questionnaireId", (req, res, next) => {
    const questionnaireId = req.params.questionnaireId;

    Questionnaire.find({questionnaireId: questionnaireId})
        .exec()
        .then(doc => {
            console.log(`Just got this ${doc.questionnaireId}`);
            res.status(200).json(doc);
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: "Error fetching data.",
                error: error
            })
        });
});

// test
router.post('/', (req, res, next) => {
    const questionnaire = new Questionnaire({
        _id: new mongoose.Types.ObjectId(),
        questionnaireId: req.body.questionnaireId,
        questionnaireTitle: req.body.questionnaireTitle,
        keywords: req.body.keywords
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
