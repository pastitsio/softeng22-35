const express = require("express");
const router = express.Router();
const Session = require('../../models/session.model')


router.post("/:questionnaireId", async function (req, res, err) {
  const questionnaireId = req.params.questionnaireId;
  var sessionsUpdated = 0;
  try {
    const sessions = await Session.find();

    for (const session of sessions) {
      const sesHas = session
        ?.questionnaires
        ?.filter(q => q.questionnaireId === questionnaireId);

      if (sesHas.length !== 0) {
        sessionsUpdated += 1;

        await Session.findOneAndUpdate(
          { "_id": session._id },
          {
            $pull: {
              "questionnaires": {
                "questionnaireId": questionnaireId
              }
            }
          }
        );
      }
    }

    return res.status(200).json({
      status: "success",
      message: `#[${sessionsUpdated}] sessions updated successfully`
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: err.message
    });
  }
});




module.exports = router;




