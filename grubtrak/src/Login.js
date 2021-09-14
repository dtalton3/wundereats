import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
 
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