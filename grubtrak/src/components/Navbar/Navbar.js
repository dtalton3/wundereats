 import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
 import { MenuItems } from "./MenuItems"
 import './Navbar.css'
 

function Navbar () {
    return(
        <nav className="NavbarItems">
            <h1 className="navbar-logo"></h1>
            <ul className="nav-menu">
                {MenuItems.map((item, index) => {
                    return (
                        <li key={index}>
                            <a className={item.cName} href={item.url}>
                            {item .title}
                            </a>
                        </li>
                    )
                })}       
            </ul>     
        </nav>
    )
 }

 export default Navbar
