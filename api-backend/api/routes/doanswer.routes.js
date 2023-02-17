const express = require('express');
const router = express.Router();

const sessionController = require('../controllers/session.controller');

router.post('/:questionnaireId/:questionId/:sessionId/:optionId', 
            sessionController.postQuestionnaireQuestionSessionOption);

module.exports = router;