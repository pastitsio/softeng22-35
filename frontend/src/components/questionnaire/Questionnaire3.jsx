import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { StylesManager, Model } from "survey-core";
import { Survey as SurveyUI } from 'survey-react';
// import * as SurveyCreator from "survey-creator";
import "survey-core/defaultV2.css";

import { convertDbInputToSurveyJs } from './utils';

import './questionnaire.css'

StylesManager.applyTheme("bootstrap");


const Questionnaire = () => {
  const navigate = useNavigate();
  let params = useParams();
  let questionnaireId = params.questionnaireId;
  const [questionnaire, setQuestionnaire] = useState([]);

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      let url = `${process.env.REACT_APP_API_SERVER_URL}/questionnaire/${questionnaireId}`;
      console.log(`GET ${url}`);
      const response = await fetch(url);
      // const response = await fetch(test_input);
      const json = await response.json();
      // set state with the result
      setQuestionnaire(json);
    }

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);;
  }, [questionnaireId]);


  if (questionnaire.length !== 0) {
    var surveyQuestionnaire = {
      title: questionnaire.questionnaireTitle,
      checkErrorsMode: "onValueChanged",
      showQuestionNumbers: true,
    }
    surveyQuestionnaire.elements = convertDbInputToSurveyJs(questionnaire.questions);

    // console.log(surveyQuestionnaire.elements);
    var survey = new Model(surveyQuestionnaire); // create new survey js questionnaire
    survey.onComplete.add(async () => {
      let data = survey.getPlainData();
      console.log(data);
      let sessionId = Math.floor(Math.random() * 10000);
      var previewResults = [];

      for (let i = 0; i < data.slice(1).length; i++) {
        const ans = data.slice(1)[i];

        let questionId = ans.name, qText = ans.title, optionId = ans.value, optionText = ans.displayValue;
        if (optionId === undefined) {
          continue; // empty anwers due to not enabled.
        }

        previewResults.push({
          question: qText,
          answer: optionText
        });

        let url = `${process.env.REACT_APP_API_SERVER_URL}/doanswer/${questionnaireId}/${questionId}/${sessionId}/${optionId}`;
        setTimeout(() => {
          console.log(`POST ${url}`);
          fetch(url, { method: 'POST' })
          .then(async response => {
            const json = await response.json();
            console.log(json);
          })
          .catch(console.err)
        }, 1000);
      }

      navigate('/surveyResults', { state: { data: previewResults } });

    })
    return (
      <div className="Questionnaire">
        <SurveyUI id="survey" model={survey} />
      </div>
    )
  } else { return null; }
}


export default Questionnaire
