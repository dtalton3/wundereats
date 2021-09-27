import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
 
function Signup() {
    
    var [username, setUsername] = useState('');
    var [password, setPassword] = useState('');
    var myStorage = window.localStorage;
    function validateForm() {
        return username.length > 0 && password.length > 0;
    }
    
    function handleSubmit(event) {
        event.preventDefault();

        const login = {
                    username: username,
                    password: password
        }

        
        
        axios.get('http://localhost:4000/api/login', login)
            .then((res) => {
                console.log(res.data);
                myStorage.setItem('currentUser', res.data)});
        window.location = '/home';

        // setUsername('');
        // setPassword('');
    }

    return (
        <div>
            <div className='container'>
                <div className='header'>
                    <h1> Login </h1>
                </div>

                <div className='form-div'>
                    <form onSubmit={handleSubmit}>
                        
                        <input type = 'text' 
                        placeholder='Username' 
                        onChange={(e) => setUsername(e.target.value)} 
                        value={username}
                        className='form-control form-group '> 
                        </input>

                        <br />

                        <input type = 'text' 
                        placeholder='Password' 
                        onChange={(e) => setPassword(e.target.value)} 
                        value={password}
                        className='form-control form-group '> 
                        </input>

                        <br />

                        <input type = 'submit'
                        className='btn btn-danger btn-block'
                        value='Login'
                        disabled={!validateForm()}>
                        </input>

                        <br />

                    </form>
                </div>
            </div>   
        </div>
    );

}

export default Signup;