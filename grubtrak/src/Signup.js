import React, { useState } from "react";
import axios from 'axios';
import "./Signup.css";
import {Link} from 'react-router-dom';
import wundergrubs_logo from "./images/wundergrubs.png";
 
function Signup() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //user can't submit form until all fields have been populated with a character
    function validateForm() {
        return fullName.length > 0 && username.length > 0 && email.length > 0 && password.length > 0;
    }
    
     /** 
      * Function that registers user into system so their credentials can log them in
      * 
      * @param {*} event - event object that determines certain app functions
      */
    function handleSubmit(event) {
        event.preventDefault();

        const registered = {
                    fullName: fullName,
                    username: username,
                    email: email,
                    password: password
        }
        
        axios.post('http://localhost:4000/api/signup', registered)
            .then(res => console.log(res.data))

        window.location = '/Home';
    }

    return (
        <div>
            <div className='Signup-container'>
                <div className='form-div'>
                    <img src={wundergrubs_logo} alt="GrubLogo"></img>

                    <form onSubmit={handleSubmit}>
                        <label className="input-titles">
                            First and Last Name
                        </label>
                        
                        <br />

                        <input type = 'text' 
                        placeholder='Enter Full Name' 
                        onChange={(e) => setFullName(e.target.value)} 
                        value={fullName}
                        className='input'> 
                        </input>

                        <br />

                        <label className="input-titles">
                            GrubTrak Username
                        </label>

                        <br />
                        
                        <input type = 'text' 
                        placeholder='Enter Username' 
                        onChange={(e) => setUsername(e.target.value)} 
                        value={username}
                        className='input'> 
                        </input>

                        <br />

                        <label className="input-titles">
                            E-mail
                        </label>
                        <br />
                        <input type = 'text' 
                        placeholder='Enter E-mail' 
                        onChange={(e) => setEmail(e.target.value)} 
                        value={email}
                        className='input'> 
                        </input>

                        <br />
                        <label className="input-titles">
                            Password
                        </label>
                        <br />
                        <input type = 'text' 
                        placeholder='Enter Password' 
                        onChange={(e) => setPassword(e.target.value)} 
                        value={password}
                        className='input'> 
                        </input>
                        <br />

                        <br />

                        <input type = 'submit'
                        className = "input2"
                        value='Register'
                        disabled={!validateForm()}>
                        </input>
                        <br />
                        <Link className="login-link" to="/Login"> Already have an account? Login here</Link>

                        <br />

                    </form>
                </div>
            </div>   
        </div>
    );

}

export default Signup;