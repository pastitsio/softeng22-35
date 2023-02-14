import React, { useEffect, useState } from "react";
// import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
// import { Questionnaire } from "../../components";

import './answer.css'

import test_input from './test_input/test.json';

function refreshResults(qs, val) {
  var clickedItem = val.target.value;
  var visibleCards;
  if (clickedItem !== "*") {
    visibleCards = qs.filter(q => q.keywords.includes(clickedItem)).map(q => q._id);
  } else {
    visibleCards = qs.map(q => q._id);
  }
  return visibleCards;
}

function Filters({ qs }) {
  var questionnaires = qs;

  const [isVisible, setIsVisible] = useState(questionnaires.map(q => q._id));

  var keywords = new Set();
  questionnaires.forEach(question => question.keywords.forEach(keywords.add, keywords));

  return (
    <>
      <div className="intelliQ__answer_filters_header">
        <h2>Filter per keyword</h2>
      </div>
      <div className="intelliQ__answer_filters_container">
        <div className="intelliQ__answer_filters_container-buttons">
          <label key="all" className="btn btn-primary" >No filter
            <input type="radio" className="btn-check" value="*" onClick={clickValue => setIsVisible(refreshResults(questionnaires, clickValue))} />
          </label>
          {keywords && Array.from(keywords).map((kw) => (
            < label key={kw} className="intelliQ__answer_filters_container-buttons_button btn" > {kw}
              < input type="radio" id={kw} className="btn-check" value={kw} onClick={clickValue => setIsVisible(refreshResults(questionnaires, clickValue))} />
            </label>
          ))}
        </div >
      </div >

      <Cards qs={questionnaires} isVisible={isVisible} />
    </>
  );
}

function Cards({ qs, isVisible }) {


  var questionnaires = qs;
  questionnaires.forEach(questionnaire => {
    if (isVisible.includes(questionnaire._id)) {
      questionnaire.style = { display: "" };
    } else {
      questionnaire.style = { display: "none" };
    }
  })

  return (
    <>
      <div className="intelliQ__answer_cards_header">
        <h2>Questionnaires</h2>
      </div>
      <div className="intelliQ__answer_cards_container">
        {questionnaires && questionnaires.map((questionnaire) => (
          <div id={questionnaire._id} className="intelliQ__answer_cards_container-card card" style={questionnaire.style} key={questionnaire._id}>
            <div className="intelliQ__answer_cards_container-card-body card-body" >
              <h5 className="intelliQ__answer_cards_container-card-title card-title">{questionnaire.questionnaireTitle}</h5>
              <p className="intelliQ__answer_cards_container-card-text card-text">{questionnaire.keywords.join(', ')}</p>
              <Link to={questionnaire._id} className="btn btn-primary">Answer this!</Link>
              <Outlet />
            </div >
          </div>
        ))}
      </div >
    </>
  )
}


const Answer = () => {
  const [questionnaires, setQuestionnaires] = useState(test_input);

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


  return (
    <div className="Answer">
      <Filters qs={questionnaires} />
    </div>
  );

}

export default Answer;