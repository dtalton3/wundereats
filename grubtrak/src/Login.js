import React, { useState } from "react";
import axios from 'axios';
import "./Login.css";
import wundergrubs_logo from "./images/wundergrubs.png";
import {Link} from 'react-router-dom';
// import Alert from 'react-bootstrap/Alert'

/**
 * Function that handles the login event for users wanting to login to the app
 * 
 * @returns the login form for users to fill their credentials with
 */
function Signup() {
    
    var [username, setUsername] = useState('');
    var [password, setPassword] = useState('');
    var [flag, setFlag] = useState(0);
    var myStorage = window.localStorage;
    
    // user cannot attempt to login with blank fields 
    function validateForm() {
        return username.length > 0 && password.length > 0;
    }
    
    /**
     * retrieves users in database and determines if credentials match what use inputted on form
     * 
     * @param {*} event - event object that determines certain app functions
     */
    function handleSubmit(event) {
        event.preventDefault(); 

        const login = {
                    username: username,
                    password: password
        }
        axios.get('http://localhost:4000/api/login')
        .then((users) => {
            var usersArr = users.data
            var authenticated = false;
            for (let i = 0; i < usersArr.length; i++) {
                let user = usersArr[i];
                if (user.username === login.username && user.password === login.password)  {
                    authenticated = true;
                    myStorage.setItem('currentUser', JSON.stringify(user));
                    window.location = '/Home';
                }
            }
            if (!authenticated) {
                setFlag(1);
                console.log("The username and/or password you’ve entered is incorrect.");
            }
        });     
    }

    /**
     * If credentials are invalid, display alert
     * 
     * @returns null - no action is to be taken to show alert
     */
    function PoorCreds() {
        if(flag > 0){
            return (
                <div class="alert alert-warning alert-dismissible fade show">
                    <strong>Invalid Credentials</strong> The username and/or password you’ve entered is incorrect
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>
            );
        }
        return null;
    }
      
    return (
        <div className='Login-container'>
            <div className='form-div'>
                <img src={wundergrubs_logo} alt="GrubLogo"></img>
                <br />
                <form onSubmit={handleSubmit}>
                    <label className="input-titles">
                            Username
                    </label>
                    <br />
                    <input type = 'text' 
                    placeholder='Enter username or e-mail' 
                    onChange={(e) => setUsername(e.target.value)} 
                    value={username}
                    className='input'> 
                    </input>

                    <br />
                    <label className="input-titles">
                            Password
                    </label>
                    <br />

                    <input type = 'password' 
                    placeholder='Enter password' 
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password}
                    className='input'> 
                    </input>
                    <br />
                    <Link className="login-link" to="/login"> 
                        Forgot username or password?
                    </Link>

                    <PoorCreds/>

                    <br />
                    <br />

                    <input type = 'submit'
                    className='input2'
                    value='Login'
                    disabled={!validateForm()}>
                    </input>

                    <br />
                    <Link className="login-link" to="/"> 
                        Don't have an account? Signup here
                    </Link>

                    <br />

                </form>
            </div>
        </div>
    );
}

export default Signup;
