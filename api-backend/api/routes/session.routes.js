const express = require("express");
const router = express.Router();

const formatData = require('../helpers/helpers').formatData;

const sessionController = require('../controllers/session.controller');


router.get("/", async (req, res, next) => {
    const format = req.query.format;
    const onlyIds = (req.query.onlyIds.toLowerCase() === 'true') ? true : false;

    try {

        const sessions = await sessionController.getAllSessions(onlyIds);
        res.status(200).send(formatData(format, sessions));
    } catch (err) { next(err) }
})