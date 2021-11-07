import React from "react";
import "./Impact.css";
import Navbar from './components/Navbar/Navbar';
import VNavbar from './components/VNavbar/VNavbar';
import GlobalStyle from "./globalStyles";
import larvae from "./images/larvae2.png";

function Impact() {
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

            <div className="Mid-panel">
                <h1 className='Mid-panel-content'>Impact Reports</h1>
            </div>
            <div className="Dashboard">
                <div className="Hatchery">Hatchery #1
                    <div className="HatcheryDetails">
                        <div className="HatcherySpecs">
                            <img src={larvae} className="larvae-small-icon" alt="Larvae"/>
                            <div>Larvae Count: 1000</div>
                            <div>Hatchery Mass: _ kg</div>
                        </div>
                        <button className="generate">Generate Impact Report</button>
                    </div>
                    
                </div>
            </div>
            <GlobalStyle />
        </div>
    );
}

export default Impact;