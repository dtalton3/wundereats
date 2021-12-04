
 import React from 'react';
 import { MenuItems } from "./MenuItems";
 import './Navbar.css';
 import wundergrubs_logo from "../wundergrubs.png";
 

// Container file for the top/horizontal navigation bar 
function Navbar () {
    return(
        <div className="NavbarItems">
            <img src={wundergrubs_logo} className="Grub-logo"alt="Grub-logo"></img>
            <ul className="nav-menu">
                {MenuItems.map((item, index) => {
                    return (
                        <li key={index}>
                            <a className={item.cName} href={item.url}>
                            {item.title}
                            </a>
                        </li>
                    )
                })}       
            </ul>
        </div>
    )
 }

 export default Navbar
