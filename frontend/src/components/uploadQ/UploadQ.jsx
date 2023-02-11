import React from "react";
import { StylesManager, Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { json } from "./json";
StylesManager.applyTheme("modern");

function UploadQ() {
  const survey = new Model(json);
  survey
    .onClearFiles
    .add(function (survey, options) {
      // Code to remove files stored on your service
      // SurveyJS Service doesn't allow to remove files
      options.callback("success");
    });

  survey
    .onUploadFiles
    .add((survey, options) => {
      var formData = new FormData();
      options
        .files
        .forEach(function (file) {
          formData.append(file.name, file);
        });
      var xhr = new XMLHttpRequest();
      xhr.responseType = "json";
      xhr.open("POST", "https://");
      xhr.onload = function () {
        var data = xhr.response;
        options.callback("success", options.files.map(file => {
          return {
            file: file.name
          };
        }));
      };
      xhr.send(formData);
    });

  
  return (<Survey model={survey} />);
}

export default UploadQ;