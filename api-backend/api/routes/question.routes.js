const express = require("express");
const router = express.Router();

router.get("/:questionnaireID/:questionID", (req, res, next) => {
  const questionnaireID = req.params.questionnaireID;
  const questionID = req.params.questionID;
  res.status(200).json({
    quiestonnaire: "Here it should be an object from the database.", // TODO: fetch json from database.
    questionnaireID: questionnaireID,
    questionID: questionID,
  }); // 200: success
});

module.exports = router;
