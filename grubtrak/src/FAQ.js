import React from "react";
import "./FAQ.css";
import Navbar from './components/Navbar/Navbar';
import VNavbar from './components/VNavbar/VNavbar';
import GlobalStyle from "./globalStyles";


function FAQ() {
    // function backToHome(event) {
    //     event.preventDefault();

    //     window.location = '/Login'
    // }

    return (
        <div className="Home-header">

            <div className="Left-panel">
                <VNavbar />
            </div>

            <div className="Top-panel">
                <Navbar className="Top-panel-content"/>
            </div>

            <div className="mp">
                <h1 className='Mid-panel-content'>FAQ</h1>
                    <h5 className='q'>Where can I edit my login details or signout?</h5>
                    <p className='a'>Check the settings tab in the left navigation bar</p>
                    <h5 className='q'>What are carbon emissions?</h5>
                    <p className='a'>Google it</p>
                    <h5 className='q'></h5>
                    <p className='a'></p>
                    <h5 className='q'></h5>
                    <p className='a'></p>
                
            </div>
            <GlobalStyle />
        </div>
    );
}

export default FAQ;