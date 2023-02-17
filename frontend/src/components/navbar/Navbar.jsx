import React from "react";
// import { RiMenu3Line, RiCloseLin } from 'react-icons/ri';
import { Link } from "react-router-dom";

import logo from '../../assets/logo_navbar.svg';
import './navbar.css';

const Navbar = () => {
  return (
    <div className="intelliQ__navbar">
      <div className="intelliQ__navbar-links">
        <div className="intelliQ__navbar-links_logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="intelliQ__navbar-links_container">
          <p><Link to="/">Home</Link></p>
          <p><Link to="upload">Upload</Link></p>
          <p><Link to="answer">Answer</Link></p>
          {/*<p><a href="#about">About</a></p> */}
        </div>
      </div>
      {/* <div className="intelliQ__navbar-sign">
        <p>Sign In</p>
        <button type="button">Sign Up</button>
      </div> */}
    </div>
  )
}

export default Navbar