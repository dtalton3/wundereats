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
                {/* <div class="social_media">
          <a href="#"><i class="fab fa-facebook-f"></i>fb</a>
          <a href="#"><i class="fab fa-twitter"></i>tw</a>
          <a href="#"><i class="fab fa-instagram"></i>ig</a>
      </div>     */}
            </nav>
         )
     }
 }

 export default VNavbar