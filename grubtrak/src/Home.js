import React from "react";
import Button from "react-bootstrap/Button";
import Navbar from './Navbar.js';
import {Link} from 'react-router-dom';
import "./Home.css";
import "./Navbar.css";


function Home() {
    return (
        <div className="Home-header">
            

            <div className="Left-panel">
                <label> Vertical navbar will go here</label>
            </div>

            <div className="Top-panel">
                <Navbar />
            </div>

            <div className="Dashboard">
                <h1 className="Dash-content">You have no connections. Add other Grub Trackers to see their impacts and how it compares to yours.</h1>
                {/* making dashboard */}
                <Button>
                    <Link to="/">Back to Login Button</Link>
                </Button>
            </div>

            
            



        </div>
    );
}

export default Home;