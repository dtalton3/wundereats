
 import React from 'react';
 import { MenuItems } from "./MenuItems";
 import './Navbar.css';
 import wunda from "../wunda.png";
 

function Navbar () {
    return(
        <div className="NavbarItems">
            <img src={wunda} className="Grub-logo"alt="Grub-logo"></img>
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
