 import React from 'react'
 import { vMenuItems } from "./VMenuItems"
 import './VNavbar.css'
 
 class VNavbar extends React.Component{
     render() {
         return(
            <nav className="vNavbarItems">
                <ul className="vnav-menu">
                    {vMenuItems.map((item, index) => {
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
 }

 export default VNavbar