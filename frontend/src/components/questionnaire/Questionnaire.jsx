import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { refreshResults, unparametrize } from './utils';
import './questionnaire.css'

function postToUrlAndGo(urls) {
  let count = 0;
  const intervalId = setInterval(() => {
    if (count === urls.length - 1) {
      clearInterval(intervalId);
    }
    let url = urls[count];
    console.log(`POST ${url}`);
    fetch(url, { method: 'POST' })
      .then(response => {
        return response.json();
      })
      .then(json => {
        console.log(json);
      })
      .catch(console.err)
    count++;

  }, 1500);
}

function handleSubmit(event, questionnaireId, questions, navigate) {
  event.preventDefault();
  const sessionId = Math.floor(Math.random() * 10000);

  let data = [], urls = [];
  for (let qi = 0; qi < questions.length; qi++) {
    const question = questions[qi];
    let checkedOptions = question.options.filter(option => document.getElementById(option.optId).checked);

    if (checkedOptions.length < 1) {
      if (question.required === true) {
        alert(`H ερώτηση [${question.qText}] ΠΡΕΠΕΙ να απαντηθεί!`);
        return;
      }
    } else if (checkedOptions.length > 1) {
      alert(`More than 2 options active for Question[${question.qText}]`);
      return;
    } else { // all valid
      let option = checkedOptions[0];
      data.push({ question: question.qText, answer: option.optText });
      urls.push(
        `${process.env.REACT_APP_API_SERVER_URL}/doanswer/${questionnaireId}/${question._id}/${sessionId}/${option.optId}`
      )

    }
  }
  postToUrlAndGo(urls); // lazy post because of mongodb lock dependency
  navigate('/surveyResults', { state: { data: data } });
};


const Questionnaire = () => {
  const navigate = useNavigate();
  let params = useParams();
  let questionnaireId = params.questionnaireId;
  const [questionnaire, setQuestionnaire] = useState([]);
  const [_questions, setQuestions] = useState([]);
  const [isVisible, setIsVisible] = useState([]);

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      let url = `${process.env.REACT_APP_API_SERVER_URL}/questionnaire/${questionnaireId}`;
      console.log(`GET ${url}`);
      const response = await fetch(url);
      const json = await response.json();
      // set state with the result
      setQuestionnaire(json);
      setQuestions(json.questions);
      setIsVisible([json.questions[0]._id]);
    }
    // call the function
    fetchData()      // make sure to catch any error
      .catch(console.error);;
  }, [questionnaireId]);

  let questions = unparametrize(_questions);

  // init
  questions.forEach(question => {
    if (isVisible.includes(question._id)) {
      question.style = { display: "" };
    } else {
      question.style = { display: "none" };
    }
  })

  return (
    <div className="Questionnaire">
      <div className="intelliQ__Questionnaire-title">
        <h2> {questionnaire.questionnaireTitle} </h2>
      </div>
      <form onSubmit={event => handleSubmit(event, questionnaireId, questions, navigate)}>
        <div className="form-group">
          {
            questions.map((q) => (
              <div className="card" style={q.style} key={q._id} id={q._id} required={q.required}>
                <div className="card-body" >
                  <h5 className="card-title">- {q.qText}</h5>
                  <div className="buttons col">
                    {q.options.map(opt => (
                      <div key={opt.optId} className="form-check" id={`form-check${opt.optId}`}>
                        <input className="form-check-input" type="radio" name={`flexRadio${q._id}`} next={opt.nextqId} id={opt.optId} onClick={clickValue => setIsVisible(refreshResults(q._id, clickValue, isVisible))} />
                        <label className="form-check-label" >
                          {opt.optText}
                        </label>
                      </div>
                    ))
                    }
                  </div>
                </div >
              </div>
            ))
          }
        </div>
        <div className="submitButton"><button className="btn btn-primary" type="submit" >Submit</button></div>
      </form>
    </div >
  )

}
export default Questionnaire
