import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home, Upload, Answer } from './pages';
import { Navbar, Questionnaire } from './components';

import './App.css';


const App = () => {
  return (
    < BrowserRouter >
      <div className="gradient__bg ">
        <Navbar />
      </div>
      <Routes>
        <Route index element={<Home />} />
        <Route path='upload' element={<Upload />} />
        <Route path='answer' element={<Answer />} />
        <Route path='answer/:id' element={<Questionnaire />} /> {/*A nested route!*/}
        {/* </Route> */}
      </Routes>
    </BrowserRouter >

  )
};

export default App;