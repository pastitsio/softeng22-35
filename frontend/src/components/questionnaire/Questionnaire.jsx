import React from "react";
// import { useParams } from 'react-router-dom';
import { StylesManager, Model } from "survey-core";
import { Survey as SurveyUI } from 'survey-react';
// import * as SurveyCreator from "survey-creator";
import "survey-core/defaultV2.css";

import test_input from './test_input/test.json';

import './questionnaire.css'

StylesManager.applyTheme("bootstrap");

function convertDbInputToSurvey(questionnaire) {
    /*
        In order to take advantage of surveyJs, we need to transform our stored data to 
        match surveyJs accepted input data.    
    */
    var questions = questionnaire.questions;
    var ret = {
        "title": questionnaire.questionnaireTitle,
        "checkErrorsMode": "onValueChanged",
        "showQuestionNumbers": true,
        elements: []
    }
    ret.elements.push({
        "name": "emailvalidator",
        "type": "text",
        "title": "Enter an e-mail address",
        "isRequired": true,
        "validators": [
            { "type": "email" }
        ]
    }) // first question is for email.

    //set questions
    questions.forEach(question => {
        var questionObj = {
            type: "radiogroup",
            name: question._id,
            title: question.qText,
            isRequired: question.required,
            colCount: 1,
            choices: question.options
                .map(({ optText, optId, ...rest }) => ({value:optId, text:optText})) // show optText, result optId
        }

        // construct parametrized options
        var m, matches = [];
        const regex = /(?:(?:\[\*(\w+)\])+)/gm;
        while ((m = regex.exec(questionObj.title)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            matches.push(m.map((match, groupIndex) => match).at(1));
        }

        if (matches.length !== 0) {
            let parametricQuestionId, parametricOptionId;
            [parametricOptionId, parametricQuestionId] = matches;

            let optTextToReplace = questions
                .find(q => q._id === parametricQuestionId)
                .options
                .find(o => o.optId === parametricOptionId).optText;

            questionObj.title = questionObj.title.replace(/\[(\*\w+)\]/m, `[${optTextToReplace}]`);

            let questionToReplace = ret.elements.findIndex(elem => elem.name === parametricQuestionId) + 1; // +1 because first question is email question, hardcoded.
            questionObj.title = questionObj.title.replace(/\[(\*\w+)\]/m, `[${questionToReplace}]`);

            questionObj.enableIf = `{${parametricQuestionId}}='${optTextToReplace}'`;
        }

        ret.elements.push(questionObj);
    })

    return ret;
}


const Questionnaire = () => {
    // let params = useParams()
    // const [questionnaires, setQuestionnaires] = useState([]);

    // useEffect(() => {
    //     // declare the async data fetching function
    //     const fetchData = async () => {
    //         // get the data from the api
    //         // const response = await fetch(process.env.REACT_APP_SERVER_URL + '/questionnaire');
    //         const response = await fetch(test_input);
    //         const json = await response.json();
    //         // set state with the result
    //         setQuestionnaires(json);
    //     }

    //     // call the function
    //     fetchData()
    //         // make sure to catch any error
    //         .catch(console.error);;
    // }, []);

    var questionnaire = convertDbInputToSurvey(test_input);
    console.log(questionnaire);
    

    const survey = new Model(questionnaire); // create new survey js questionnaire
    survey.onComplete.add(() => {
        console.log(survey.data)
    });
    return (
        <div className="Questionnaire">
            <SurveyUI id="survey" model={survey} />
        </div>
    )
}


export default Questionnaire
