import React, {useState} from "react";
import "./Settings.css";
import Navbar from './components/Navbar/Navbar';
import VNavbar from './components/VNavbar/VNavbar';
import GlobalStyle from "./globalStyles";
import Switch from './components/Switch/Switch'

/**
 * Function to display user settings/notifications
 * NOTE: there are no functionalities on this page, none of the 
 * buttons work and nothing saves into database
 * 
 * @returns a empty form for users to change their data at any time
 */
function Settings() {
    const [isToggled, setIsToggled] = useState(false);
    return (
        <div className="Home-header">

            <div className="Left-panel">
                <VNavbar />
            </div>

            <div className="Top-panel">
                <Navbar className="Top-panel-content"/>
            </div>

            <div className="mp">
                <h1 className='Mid-panel-content'>Settings</h1>
                <h1 className='sub'>Account</h1>
                    <h5 className='content'>First Name</h5>
                    <input placeholder="First name"/> 
                    <h5 className='content'>Last Name</h5>
                    <input placeholder="Last name"/> 
                    <h5 className='content'>Email</h5>
                    <input placeholder="Email"/>
                    <button>Update info</button>
                <h1 className='sub'>Change Password</h1>
                    <h5 className='content'>New Password</h5>
                    <input placeholder=""/> 
                    <button>Change password</button>
                <h1 className='sub'>Notifications</h1>
                    <div className="notif">
                        <Switch rounded ={true} 
                        istoggled={isToggled} 
                        onToggle={()  => setIsToggled(!isToggled)}/>
                    </div>
                <button>Sign out</button>
            </div>
            <GlobalStyle />
        </div>
    );
}

export default Settings;