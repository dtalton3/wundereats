import React, { useState } from "react";
//import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import "./Signup.css";
import {Link} from 'react-router-dom';
import grub from "./images/grub.jpeg";
 
function Signup() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function validateForm() {
        return fullName.length > 0 && username.length > 0 && email.length > 0 && password.length > 0;
    }
    
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

        window.location = '/home';
    }


    return (
        <div>
            <div className='Signup-container'>
                <div className='form-div'>
                    <img src={grub}></img>

                    <form onSubmit={handleSubmit}>
                        <formLabel className="input-titles">
                            First and Last Name
                        <br />
                        </formLabel>
                        <input type = 'text' 
                        placeholder='Enter Full Name' 
                        onChange={(e) => setFullName(e.target.value)} 
                        value={fullName}
                        className='input'> 
                        </input>

                        <br />

                        <formLabel className="input-titles">
                            GrubTrak Username
                        </formLabel>
                        <br />
                        <input type = 'text' 
                        placeholder='Enter Username' 
                        onChange={(e) => setUsername(e.target.value)} 
                        value={username}
                        className='input'> 
                        </input>

                        <br />

                        <formLabel className="input-titles">
                            E-mail
                        </formLabel>
                        <br />
                        <input type = 'text' 
                        placeholder='Enter E-mail' 
                        onChange={(e) => setEmail(e.target.value)} 
                        value={email}
                        className='input'> 
                        </input>

                        <br />
                        <formLabel className="input-titles">
                            Password
                        </formLabel>
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
                        className = "create-button"
                        value='Register'
                        disabled={!validateForm()}>
                        </input>
                        <br />
                        <Link className="login-link" to="/login"> Already have an account? Login here</Link>

                        

                        <br />

                    </form>
                </div>
            </div>   
        </div>
    );

}

export default Signup;