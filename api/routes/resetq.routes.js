const express = require("express");
const router = express.Router();
const Session = require('../models/session.model')


router.post("/:questionnaireId", async function (req, res, err) {
    var i = 0
    for await (const session of Session.find()) {
        // console.log(session._id)
        var seshas = session.questionnaires.filter(q => q.questionnaireId === req.params.questionnaireId)
        if (seshas.length != 0) {
            console.log(session._id)

            Session.updateOne({ "_id": session._id }, { "$pull": { "questionnaires": { "questionnaireId": req.params.questionnaireId } } }, (err, session) => {
                if (err) {
                    return res.status(500).json({
                        status: "failed",
                        message: err
                    })
                }
            })
        }

    }
    return res.status(200).json({
        status: "OK"
    })
});




module.exports = router;




