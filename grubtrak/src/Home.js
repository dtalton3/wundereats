import React from "react";
//import Button from "react-bootstrap/Button";
import Navbar from './components/Navbar/Navbar';
import VNavbar from './components/VNavbar/VNavbar'
//import {Link} from 'react-router-dom';
import "./Home.css";
import sort from "./images/sort.JPG";


function Home() {
    function backToHome(event) {
        event.preventDefault();

        window.location = '/login'

    }
    return (
        <div className="Home-header">

            <div className="corner-logo">
                <label>Corner Logo</label>
            </div>
            <div className="Left-panel">
                <VNavbar />
                <label> [Navigation Panel 1]</label> 
            </div>

            <div className="Top-panel">
                <Navbar />
            </div>

            <div className="Title">
                <ul>
                    <li className="My-Hatchery">My Hatcheries</li>
                    <li className="Sort">sort <img src={sort} alt="sort"></img></li>
                </ul>
            </div>

            <div className="Dashboard">
                <h1 className="Dash-content">+ Create New Hatchery</h1>
                {/* making dashboard */}
                {/* <Button className="Back-button">
                    <Link to="/" className="Link-style">Back</Link>
                </Button> */}
                {/*
                <input type = 'submit'
                        className='btn btn-danger btn-block'
                        value='Login'
                        onClick={backToHome}>
                </input> */}

            </div>

            
        </div>
    );
}

export default Home;