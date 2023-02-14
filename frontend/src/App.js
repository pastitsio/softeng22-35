import React from 'react'
import { Routes, Route } from 'react-router-dom';

import { Home, Upload, History, Results } from './pages';

const App = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path='upload' element={<Upload />} />
      <Route path='history' element={<History />} />
      <Route path='results/:questionnaireId/:sessionId' element={<Results />} />
    </Routes>
  )
};

export default App;