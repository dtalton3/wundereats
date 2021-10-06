import React, { useState } from "react";
//import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import "./Login.css";
import grub from "./images/grub.jpeg";
import {Link} from 'react-router-dom';

function Signup() {
    
    var [username, setUsername] = useState('');
    var [password, setPassword] = useState('');
    var myStorage = window.localStorage;
    function validateForm() {
        return username.length > 0 && password.length > 0;
    }
    
    function handleSubmit(event) {
        event.preventDefault(); // <- beware

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
                if (user.username == login.username && user.password == login.password)  {
                    authenticated = true;
                    myStorage.setItem('currentUser', user);
                    window.location = '/Home';
                }
            }
            if (!authenticated) {
                console.log("The username and/or password you’ve entered is incorrect.");
                //frontend: put a lil popup showing that they login creds wrong.
            }
        });
    }

    return (
        <div className='Login-container'>
            <div className='form-div'>
                <img src={grub} alt="GrubLogo"></img>
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