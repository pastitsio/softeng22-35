import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

function refreshResults(qs, val) {
  var clickedItem = val.target.value;
  var visibleCards;
  if (clickedItem !== "*") {
    visibleCards = qs.filter(q =>
      q.keywords
        .includes(clickedItem))
        .map(q => q._id);
  } else {
    visibleCards = qs.map(q => q._id);
  }
  return visibleCards;
}

const Filters = ({ qs }) => {

  const [isVisible, setIsVisible] = useState([]);

  useEffect(() => {
    const setup = () => {
      let qIds = qs.map(q => q._id);
      setIsVisible(qIds)
    }

    setup();

  }, [qs])


  var keywords = new Set();
  qs.forEach(question => question.keywords.forEach(keywords.add, keywords));

  return (
    <>
      <div className="intelliQ__answer_filters_header">
        <h2>Filter per keyword</h2>
      </div>
      <div className="intelliQ__answer_filters_container">
        <div className="intelliQ__answer_filters_container-buttons">
          <label key="all" className="btn btn-primary" >No filter
            <input type="radio" className="btn-check" value="*" onClick={clickValue => setIsVisible(refreshResults(qs, clickValue))} />
          </label>
          {keywords && Array.from(keywords).sort().map((kw) => (
            < label key={kw} className="intelliQ__answer_filters_container-buttons_button btn" > {kw}
              < input type="radio" id={kw} className="btn-check" value={kw} onClick={clickValue => setIsVisible(refreshResults(qs, clickValue))} />
            </label>
          ))}
        </div >
      </div >

      <Cards qs={qs} isVisible={isVisible} />
    </>
  );
}

const Cards = ({ qs, isVisible }) => {
  qs.forEach(questionnaire => {
    questionnaire.style = {
      display: isVisible.includes(questionnaire._id)
        ? "table-cell"
        : "none"
    };
  })

  return (
    <>
      <div className="intelliQ__answer_cards_header">
        <h2>Questionnaires</h2>
      </div>
      <div className="intelliQ__answer_cards_container">
        {qs && qs.map((questionnaire) => (
          <div id={questionnaire._id} className="intelliQ__answer_cards_container-card card" style={questionnaire.style} key={questionnaire._id}>
            <div className="intelliQ__answer_cards_container-card-body card-body" >
              <h5 className="intelliQ__answer_cards_container-card-title card-title">{questionnaire.questionnaireTitle}</h5>
              <p className="intelliQ__answer_cards_container-card-text card-text">{questionnaire.keywords.join(', ')}</p>
              <Link to={questionnaire._id} className="btn btn-primary">Answer</Link>
              <Outlet />
            </div >
          </div>
        ))}
      </div >
    </>
  )
}

export default Filters;