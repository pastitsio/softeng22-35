const express = require("express");
const multer = require('multer')
const fs = require('fs')
const router = express.Router();



router.post('/', multer({ filename: (req, file, cb) => { cb(null, file.originalname) }, dest: "./uploads", }).single('file'), function (req, res) {

    let rawdata = fs.readFileSync('./uploads/' + req.file.filename);
    let sentdata = JSON.parse(rawdata);
    var sentquestions = sentdata.questions;
    var qIdArray = [];
    for (let i = 0; i < sentdata.questions.length; i++) {
        qIdArray.push(sentdata.questions[i][Object.keys(sentdata.questions[i])[0]])
    }
    var createdQuestionnaire = {
        _id: sentdata.questionnaireID,
        questionnaireTitle: sentdata.questionnaireTitle,
        keywords: sentdata.keywords,
        questions: qIdArray
    };

    console.log(createdQuestionnaire);


    res.status(200).json({
        status: "ok"
    })
});


module.exports = router;