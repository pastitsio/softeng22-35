import React from 'react'
import logo from '../../assets/logo.svg'
import './home.css'

const Home = () => {

  return (
    <div className="Home">
      <div className="intelliQ__home section__padding" id="home">
        <div className="intelliQ__home-content">
          <h1 className="gradient__text">Welcome to IntelliQ,<br/> the <span className="gradient__text2">smart</span> Questionnaire</h1>
        </div>
        <div className="intelliQ__home-image">
          <img src={logo} className="intelliQ__home-image_logo" alt="logo" />
        </div>

      </div >
    </div>
  )
};

export default Home;