import React, { useState } from "react";
//import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import "./Login.css";
import grub from "./images/grub.jpeg";
import {Link} from 'react-router-dom';

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }
    
    function handleSubmit(event) {
        event.preventDefault();

        const registered = {
                    username: username,
                    password: password
        }
        
        axios.post('http://localhost:4000/api/signup', registered)
            .then(res => console.log(res.data))

        
        window.location = '/home';

        // setUsername('');
        // setPassword('');
    }

    return (
        <div className='Login-container'>
            <div className='form-div'>
                <img src={grub}></img>
                <br />
                <form onSubmit={handleSubmit}>
                    <formLabel className="input-titles">
                            Username
                    </ formLabel>
                    <br />
                    <input type = 'text' 
                    placeholder='Enter username or e-mail' 
                    onChange={(e) => setUsername(e.target.value)} 
                    value={username}
                    className='input'> 
                    </input>

                    <br />
                    <formLabel className="input-titles">
                            Password
                    </ formLabel>
                    <br />

                    <input type = 'text' 
                    placeholder='Enter password' 
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password}
                    className='input'> 
                    </input>

                    <br />
                    <Link className="login-link" to="/login"> 
                        Forgot username or password?
                    </Link>


                    <br />
                    <br />

                    <input type = 'submit'
                    className='create-button'
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