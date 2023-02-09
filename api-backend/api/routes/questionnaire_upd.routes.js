const express = require("express");
const multer = require('multer')
const fs = require('fs')
const router = express.Router();

const Questionnaire = require('../models/questionnaire.model');
const Question = require('../models/question.model');

router.post('/', multer({ filename: (req, file, cb) => { cb(null, file.originalname) }, dest: "./uploads", }).single('file'), async function (req, res) {

    let rawdata = fs.readFileSync('./uploads/' + req.file.filename);
    let sentdata = JSON.parse(rawdata);
    var sentquestions = []
    var qIdArray = [];

    for (let i = 0; i < sentdata.questions.length; i++) {
        qIdArray.push(sentdata.questions[i][Object.keys(sentdata.questions[i])[0]])
        sentquestions.push(new Question({
            _id: sentdata.questions[i][Object.keys(sentdata.questions[i])[0]],
            qText: sentdata.questions[i].qtext,
            required: sentdata.questions[i].required,
            qType: sentdata.questions[i].type,
            options: [{
                optId: sentdata.questions[i].options[0].optID,
                optText: sentdata.questions[i].options[0].opttxt,
                nextqId: sentdata.questions[i].options[0].nextqID
            }],
        }))
    }

    var createdQuestionnaire = new Questionnaire({
        _id: sentdata.questionnaireID,
        questionnaireTitle: sentdata.questionnaireTitle,
        keywords: sentdata.keywords,
        questions: qIdArray
    });

    let errorOccurred = false;

    await createdQuestionnaire.save().then().catch((err) => {
        if (err) {
            if (err.name === 'MongoServerError' && err.code === 11000) {
                if (!errorOccurred) {
                    errorOccurred = true;
                    res.status(422).json({
                        success: false,
                        message: 'id already exist!'
                    });
                }
            } else if (!errorOccurred) {
                errorOccurred = true;
                res.status(500).json({
                    uccess: false,
                    message: err
                })
            }
        }
    });

    for (let i = 0; i < sentquestions.length; i++) {
        await sentquestions[i].save().then().catch((err) => {
            if (err) {
                if (err.name === 'MongoServerError' && err.code === 11000) {
                    if (!errorOccurred) {
                        errorOccurred = true;
                        res.status(422).json({
                            success: false,
                            message: 'id already exist!'
                        });
                    }
                } else if (!errorOccurred) {
                    errorOccurred = true;
                    res.status(500).json({
                        uccess: false,
                        message: err
                    })
                }
            }
        });
    }
    if (!errorOccurred) {
        res.status(200).json({
            uccess: true,
            message: 'The questionnaire was successfully uploaded'
        })
    }


});


module.exports = router;