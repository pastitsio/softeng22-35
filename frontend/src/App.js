import React from 'react'
import { Routes, Route } from 'react-router-dom';

import { Home, Upload } from './pages';

const App = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path='/upload' element={<Upload />} />
    </Routes>
  )
};

export default App;