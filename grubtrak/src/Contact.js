import React from "react";
import "./Contact.css";
import Navbar from './components/Navbar/Navbar';
import VNavbar from './components/VNavbar/VNavbar';
import GlobalStyle from "./globalStyles";

/**
 * Function that populates the Contact Us page
 * 
 * @returns a form [NOT IMPLEMENTED] that accepts user input to email contact wundergrubs
 */
function Contact() {
    return (
        <div className="Home-header">

            <div className="Left-panel">
                <VNavbar />
            </div>

            <div className="Top-panel">
                <Navbar className="Top-panel-content"/>
            </div>

            <div className="Mid-panel">
                <h1 className='Mid-panel-content'>Contact Us</h1>
                <h2 className="Subheading">Please reach out with any questions, 
                comments or inquiries. We're happy to chat and will reach out 
                shortly.  Thanks for your patience!</h2> 
                    <form className ="form">
                        <label>Name</label>
                        <input placeholder=""/>

                        <label>Email*</label>
                        <input placeholder=""/>

                        <label>Phone Number </label>
                        <input placeholder=""/>
                 
                        <label>Message </label>
                        <textarea placeholder=""></textarea>
                        <button classname="submit">Send</button>
                    </form>
                
            </div>

            <GlobalStyle />
        </div>
    );
}

export default Contact;