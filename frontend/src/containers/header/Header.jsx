import React from "react";
import './header.css'
import brain from '../../assets/brain.jpeg';

const Header = () => {
    return (
        <div className="intelliQ__header section__padding" id="home">
            <div className="intelliQ__header-content">
                <h1 className="gradient__text">Welcome to IntelliQ, the smart Questionnaire</h1>
            </div>
            <div className="intelliQ__header-image">
                <img src={brain} alt="brain"/>
            </div>

        </div >
    )
}

export default Header