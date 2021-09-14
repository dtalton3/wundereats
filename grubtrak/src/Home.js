import React from "react";
//import Button from "react-bootstrap/Button";
//import Navbar from './Navbar.js';
//import {Link} from 'react-router-dom';
import "./Home.css";
// import "./Navbar.css";


function Home() {
    function backToHome(event) {
        event.preventDefault();

        window.location = '/login'

    }
    return (
        <div className="Home-header">

            <div className="Left-panel">
                <label> [Navigation Panel 1]</label>
            </div>

            <div className="Top-panel">
                {/* <Navbar /> */}
                <label className="Black-label"> [Navigation Panel 2]</label>
            </div>

            <div className="Dashboard">
                <h1 className="Dash-content">You have no connections. Add other Grub Trackers to see their impacts and how it compares to yours.</h1>
                {/* making dashboard */}
                {/* <Button className="Back-button">
                    <Link to="/" className="Link-style">Back</Link>
                </Button> */}

                <input type = 'submit'
                        className='btn btn-danger btn-block'
                        value='Login'
                        onClick={backToHome}>
                </input>

            </div>

            
        </div>
    );
}

export default Home;