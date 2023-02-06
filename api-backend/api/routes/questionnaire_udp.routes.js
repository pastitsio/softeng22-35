const express = require("express");
const multer = require('multer')
const fs = require('fs')
const router = express.Router();



router.post('/', multer({ filename: (req, file, cb) => { cb(null, file.originalname) }, dest: "./uploads", }).single('file'), function (req, res) {

    let rawdata = fs.readFileSync('./uploads/'+req.file.filename);
    let student = JSON.parse(rawdata);
    console.log(student);
    res.status(200).json({
        status: "ok"
    })
});


module.exports = router;