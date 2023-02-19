const express = require("express");
const router = express.Router();

const Session = require('../models/session.model')
const Questionnaire = require('../models/questionnaire.model')
const Question = require('../models/question.model')

router.post("/", async (req, res, next) => {

    try {
        await Session.deleteMany({})
    } catch (error){
        next(error);
    } 
    
    try {
        await Questionnaire.deleteMany({})
    } catch (error){
        next(error);
    } 

    try {
        await Question.deleteMany({})
    } catch (error){
        next(error);    
    } 

    res.status(200).json({
        "status" : "OK",

    })
});// 200: success



module.exports = router;