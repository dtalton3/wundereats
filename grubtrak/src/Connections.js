import React from "react";
import "./Home.css";
import Navbar from './components/Navbar/Navbar';
import VNavbar from './components/VNavbar/VNavbar';
import GlobalStyle from "./globalStyles";

/**
 * Unused files since the connections page was pushed out as a future implementation goal
 * 
 * @returns a dashboard style similar to hatcheries that displays user connections
 */
function Connections() {
    return (
        <div className="Home-header">

            <div className="Left-panel">
                <VNavbar />
            </div>

            <div className="Top-panel">
                <Navbar className="Top-panel-content"/>
            </div>

            <div className="Mid-panel">
                <h1 className='Mid-panel-content'>Connections</h1>
            </div>
            <GlobalStyle />
        </div>
    );
}

export default Connections;