
 import React from 'react';
 import { MenuItems } from "./MenuItems";
 import './Navbar.css';
 import grub from "./grub.jpeg";
 

function Navbar () {
    return(
        <nav className="NavbarItems">
            <img src={grub} alt="GrubLogo"></img>
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
        </nav>
    )
 }

 export default Navbar
