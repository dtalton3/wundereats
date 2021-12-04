import React from "react";
import "./Home.css";
import Navbar from './components/Navbar/Navbar';
import VNavbar from './components/VNavbar/VNavbar';
import GlobalStyle from "./globalStyles";


function About() {
    return (
        <div className="Home-header">

            <div className="Left-panel">
                <VNavbar />
            </div>

            <div className="Top-panel">
                <Navbar className="Top-panel-content"/>
            </div>

            <div className="Mid-panel">
                <h1 className='Mid-panel-content'>More About GrubTrak!</h1>
                <h1 className='Mid-panel-content'> ... </h1>

            </div>
            <GlobalStyle />
        </div>
    );
}

export default About;