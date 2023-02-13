import React from "react";
import { useParams } from 'react-router-dom';
import { StylesManager, Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.css";

import { json } from "./json"
import test_input from './test_input/test.json';

import './questionnaire.css'

StylesManager.applyTheme("modern");

function convertDbInputToSurvey(questionnaire) {
    /*
        In order to take advantage of surveyJs, we need to transform our stored data to 
    
    */
    var questions = questionnaire.questions;
    var ret = {
        "questionnaireTitle": questionnaire.questionnaireTitle,
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

    questions.forEach(question => {
        var questionObj = {
            type: "radiogroup",
            name: question._id,
            title: question.qText,
            isRequired: question.required,
            colCount: 1,
            choices: question.options
                .map(({ optText, ...rest }) => optText) // keep only text
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

            questionObj.title = questionObj.title.replace(/\[(\*\w+)\]/m, `${optTextToReplace}`);

            let questionToReplace = ret.elements.findIndex(elem => elem.name === parametricQuestionId) + 1; // +1 because first question is email question, hardcoded.
            questionObj.title = questionObj.title.replace(/\[(\*\w+)\]/m, `[${questionToReplace}]`);

            questionObj.enableIf = `{${parametricQuestionId}}='${optTextToReplace}'`;
        }

        ret.elements.push(questionObj);
    })

    return ret;
}


const Questionnaire = () => {
    let params = useParams()
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

    // const arr = JSON.parse(json);
    // arr.forEach( obj => renameKey( obj, '_id', 'id' ) );
    // const updatedJson = JSON.stringify( arr );

    const survey = new Model(questionnaire); // create new survey js questionnaire
    return (
        <div className="Questionnaire">
            <div className="intelliQ__Questionnaire-title">
                {questionnaire.questionnaireTitle}
            </div>
            <Survey model={survey} />
            {/* <div className="intelliQ__Questionnaire-survey_container">
                {questionnaire.questions}
            </div> */}
        </div>
    )
}


export default Questionnaire
