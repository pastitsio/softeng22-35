const express = require('express');
const router = express.Router();

// ONLY this type of requests are accepted, the rest are routed to app.js middleware.
router.get('/:questionnaireID/:questionID/:session/:optionID', (req, res, next) => {
    const questionnaireId = req.params.questionnaireID;
    const questionID = req.params.questionID;
    const session = req.params.session;
    const optionID = req.params.optionID;
    res.status(200).json({
            quiestonnaire: 'Here it should be an object from the database.', // TODO: fetch json from database.
            questionnaireId: questionnaireId
        }); // 200: success
});

module.exports = router;