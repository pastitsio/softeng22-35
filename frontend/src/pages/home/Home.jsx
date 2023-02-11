import React from 'react'
import { Header } from '../../containers'
import { Navbar } from '../../components'

import './Home.css'

// import Upload from './pages/Upload';
// import Answer from './pages/Answer';
// import About from './pages/About';

const Home = () => {
  
  return (
    <div className="Home">
      <div className="gradient__bg ">
        <Navbar />
        <Header />
      </div>
    </div>
  )
};

export default Home;