import React from 'react';
import {Link} from 'react-router-dom';
import Navbario from 'react-bootstrap/Navbar';
import "./Navbar.css";

function Navbar() {
    return(
        <div className="nav" fixed="top">
            <ul>
                <li><a class="active" href="#home">Home</a></li>
                <li><a href="#news">News</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#about">About</a></li>
            </ul>
            
            {/* <ul className="ul">
                <li><a class="active" href="#home">Home</a></li>
                <li><a href="#news">News</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul> */}


            {/* <ul>
                <li>
                    <Link to="/home">Home</Link>
                </li>
                <li>
                    <Link to="/hatcheries">My Hatcheries</Link>
                </li>
            </ul> */}
        </div>
    );
}

export default Navbar;