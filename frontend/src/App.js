import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home, Upload, Answer, History, PageNotFound } from './pages';
import { Navbar, Questionnaire, SessionAnswers, SurveyResults } from './components';

import './App.css';


const App = () => {
  return (
    < BrowserRouter >
      <div className="gradient__bg ">
        <Navbar />
      </div>
      <Routes>
        <Route index element={<Home />} />
        <Route path='answer' element={<Answer />} />
        <Route path='answer/:questionnaireId' element={<Questionnaire />} /> {/*A nested route!*/}
        <Route path='history' element={<History />} />
        <Route path='sessionAnswers/:questionnaireId/:sessionId' element={<SessionAnswers />} />
        <Route path='surveyResults' element={<SurveyResults />} />
        <Route path='upload' element={<Upload />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter >

  )
};

export default App;