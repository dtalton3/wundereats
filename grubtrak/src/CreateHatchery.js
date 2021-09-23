import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

 
function CreateHatchery() {
    
    const [hatcheryName, setHatcheryName] = useState('');
    const [password, setPassword] = useState('');
    
    var myStorage = window.localStorage; // May use this to persist a logged-in user across pages
    
    function validateForm() { 
        return hatcheryName.length > 0;
    }
    
    function handleSubmit(event) {
        event.preventDefault();
        const hatchery = {
            hatcheryName: hatcheryName
        }
        console.log("This was the username " + hatcheryName)
        
        axios.post('http://localhost:4000/api/createhatchery', hatchery)
            .then((req) => {
                console.log(req.data);});

    }

    return (
        <div>
            <div className='container'>
                <div className='header'>
                    <h1> Create a hatchery! </h1>
                </div>

                <div className='form-div'>
                    <form onSubmit={handleSubmit}>
                        
                        <input type = 'text' 
                        placeholder='Hatchery Name' 
                        onChange={(e) => setHatcheryName(e.target.value)} 
                        value={hatcheryName}
                        className='form-control form-group '> 
                        </input>

                        <br />

                        <input type = 'submit'
                        className='btn btn-danger btn-block'
                        value='Create!'>
                        </input>

                        <br />

                    </form>
                </div>
            </div>   
        </div>
    );

}

export default CreateHatchery;