import React from "react";
import Navbar from './components/Navbar/Navbar';
import "./Home.css";


function About() {
    function backToHome(event) {
        event.preventDefault();

        window.location = '/login'

    }
    return (
        <div className="Home-header">

            <div className="Left-panel">
            </div>

            <div className="Top-panel">
                <Navbar />
            </div>

            <div className="Dashboard">
                <h1 className="Dash-content">About Page</h1>

                <input type = 'submit'
                        className='btn btn-danger btn-block'
                        value='Login'
                        onClick={backToHome}>
                </input>

            </div>

            
        </div>
    );
}

export default About;