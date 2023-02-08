const bodyParser = require("body-parser");
const colors = require('colors/safe');
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const formatData = require('../helpers/helpers').formatData;

const log = (x) => { console.log(colors.cyan.underline(x)); }

const Questionnaire = require('../models/questionnaire.model');
const Question = require('../models/question.model');
const Session = require('../models/session.model');

router.get('/:questionnaireId/:session', (req, res, next) => {
    const format = req.query.format;
    const questionnaireId = req.params.questionnaireId;
    const session = req.params.session;

    Session.findById(session)
        .exec()
        .then(ses => {
            try {
                var formattedData = formatData(format, {
                    session: session,
                    questionnaireId: ses.questionnaireId,
                    answers: ses.answers
                });
                res.status(200).send(formattedData);
            } catch (error) { next(error); };
        })
        .catch(error => {
            next(new Error(`Session[${session}] not found`))
        });
})