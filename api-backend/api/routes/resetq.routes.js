const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {

    res.status(200).json({
        "status": "OK", "dbconnection": "Database connected and ready to use"
    })

});// 200: success



module.exports = router;