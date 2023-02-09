const express = require("express");
const router = express.Router();
const Session = require('../models/session.model')


router.post("/:questionnaireId", async function (req, res, err) {

    Session.deleteOne({ questionnaireID: req.params.questionnaireId }).catch(err)
    //     (err) => {
    //     if (err) {
    //         console.log(err)
    //         res.status(500).json({
    //             status: err
    //         })
    //     }
    // }
});
// 200: success
// "questionnaireID":"QQ000","session":"ATBP","answers":[{"qID":"P00","ans":"mail@mail.com"},{},{},{},{},{}]}



module.exports = router;