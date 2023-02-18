import React from "react";
import { Link } from "react-router-dom";
import './pageNotFound.css';

const PageNotFound = () => {
    return (
        <div className="PageNotFound">
            <h2>Not found!</h2>
            <div className="home_nav"><Link to="/"><u>Back to home page</u></Link></div>
        </div>
    )
};

export default PageNotFound;