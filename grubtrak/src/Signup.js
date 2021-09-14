import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
 
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

        window.location = '/login';
    }


    return (
        <div>
            <div className='container'>
                <div className='header'>
                    <h1> Sign Up ! </h1>
                </div>

                <div className='form-div'>
                    <form onSubmit={handleSubmit}>
                        <input type = 'text' 
                        placeholder='Full Name' 
                        onChange={(e) => setFullName(e.target.value)} 
                        value={fullName}
                        className='form-control form-group '> 
                        </input>

                        <br />

                        <input type = 'text' 
                        placeholder='Username' 
                        onChange={(e) => setUsername(e.target.value)} 
                        value={username}
                        className='form-control form-group '> 
                        </input>

                        <br />

                        <input type = 'text' 
                        placeholder='E-mail' 
                        onChange={(e) => setEmail(e.target.value)} 
                        value={email}
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
                        value='Submit Slatt'
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