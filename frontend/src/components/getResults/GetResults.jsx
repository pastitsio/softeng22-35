import React from "react";
import $ from "jquery";
import { StylesManager, Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.css";
import "./index.css";
import { json } from "./json"
StylesManager.applyTheme("defaultV2");
function SurveyComponent() {
    const survey = new Model(json);
    $("#loadingIndicator").hide();
survey.onCompleting.add(function() {
    survey.completedHtml = "<p style='font-size:24px;'>Thank you for completing the survey!<p>",
    $("#loadingIndicator").show();
});
survey.onComplete.add(function (sender) {
    $.get("https://api.surveyjs.io/private/Surveys/getSurveyPublicResults/5af48e08-a0a5-44a5-83f4-1c90e8e98de1", function (data) {
        const jsonResult = JSON.stringify(data.Data, null, 4); // Format the JSON string with 4 spaces
        document.body.innerText = jsonResult; // Display the JSON string on the screen
    });
});


    return (<Survey model={survey} />);
}
export default SurveyComponent;