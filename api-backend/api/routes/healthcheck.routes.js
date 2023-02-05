
const express = require("express");
const router = express.Router();

const server = require('../server');
// API call for testing the connection with the database

router.get("/", (req, res, next) => {
    server.connection.ping(function (err) {
        if (err) {
            res.status(200).json({
                status: "Failed",
                dbconnection: err.message

            });
        }
        else {
            res.status(200).json({
                status: "OK",
                dbconnection: "Connected to " + server.connection.config,

            });
        }

    });// 200: success



});

module.exports = router;