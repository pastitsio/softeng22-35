import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import './surveyResults.css'

const SurveyResults = () => {
  const location = useLocation();
  const data = location.state.data;


  return (
    <div className='SurveyResults='>
      <div key="header" className='intelliQ__SurveyResults-header'><h2>Your Answers</h2></div>
      <div className="intelliQ__SurveyResults-accordion accordion" id="accordionExample">
        {data && data.map((row, index) => (
          <>
            <div className="accordion-item" >
              <h2 className="accordion-header" id={`item${index}`}>
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-controls={`collapse${index}`}>
                  <strong>{row.question}</strong>
                </button>
              </h2>
              <div id={`collapse${index}`} key={`collapse${index}`} className="accordion-collapse collapse show" aria-labelledby={`heading${index}`} data-bs-parent="#accordionExample">
                <div className="accordion-body" key={`body${index}`}>
                  <div className="intelliQ__SurveyReuslts-accordion_answer"><strong>Η απάντησή σας:</strong> {row.answer}</div>
                </div>
              </div>
            </div>
          </>
        ))}
        <div className='intelliQ__SurveyReuslts-home_nav'><Link to="/"><u>Back to Home page</u></Link></div>
      </div>
    </div>
  )
}

export default SurveyResults