const express = require('express');
const router = express.Router();

const sessionController = require('../controllers/session.controller');

// ONLY this type of requests are accepted, the rest are routed to app.js middleware.
router.post('/:questionnaireId/:questionId/:session/:optionId', 
            sessionController.postQuestinnaireQuestionSessionOption);

module.exports = router;