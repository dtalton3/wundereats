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
                    <h5 className='q'>Where can I edit my account information?</h5>
                    <p className='a'>The user settings are located in the Settings tab of the navigation panel to the left of your screen.</p>
                    <h5 className='q'>What are carbon emissions?</h5>
                    <p className='a'>There are both natural and human sources of carbon dioxide emissions. Natural sources include <br></br> 
                    decomposition, ocean release and respiration. Human sources come from activities like cement <br></br> 
                    production, deforestationas well as the burning of fossil fuels like coal, oil and natural gas.</p>
                    <h5 className='q'>How do I signout of the app?</h5>
                    <p className='a'>The signout button is located in the Settings tab of the navigation panel to the left of your screen.</p>
                
            </div>
            <GlobalStyle />
        </div>
    );
}

export default FAQ;