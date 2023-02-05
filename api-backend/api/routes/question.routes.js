const express = require("express");
const router = express.Router();

const Questionnaire = require("../models/questionnaire.model");
const Question = require("../models/question.model");

router.get("/:questionnaireId/:questionId", (req, res, next) => {
  const questionnaireId = req.params.questionnaireId;
  const questionId = req.params.questionId;

  res.status(200).json({
    quiestonnaire: "Here it should be an object from the database.", // TODO: fetch json from database.
    questionnaireId: questionnaireId,
    questionId: questionId,
  }); // 200: success
});

router.post("/:question")

module.exports = router;
