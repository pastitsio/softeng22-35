const express = require("express");
const { route } = require("./doanswer.routes");
const router = express.Router();

const Session = require('../models/session.model')


router.post("/", (req, res, next) => {

    Session.deleteMany({}, (error) => {
        if (error) {
            res.status(200).json({
                status: 'Failed',
                message: error
            })
        }
        else {
            res.status(200).json({
                status: 'OK'
            })
        }

    })
});// 200: success



module.exports = router;