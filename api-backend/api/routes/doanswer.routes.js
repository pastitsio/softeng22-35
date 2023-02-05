const express = require('express');
const router = express.Router();

// ONLY this type of requests are accepted, the rest are routed to app.js middleware.
router.get('/:questionnaireId/:questionId/:session/:optionId', (req, res, next) => {
    const questionnaireId = req.params.questionnaireId;
    const questionId = req.params.questionId;
    const session = req.params.session;
    const optionId = req.params.optionId;
    res.status(200).json({
            quiestonnaire: 'Here it should be an object from the database.', // TODO: fetch json from database.
            questionnaireId: questionnaireId
        }); // 200: success
});

module.exports = router;