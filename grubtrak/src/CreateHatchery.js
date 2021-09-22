import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function CreateHatchery() {
    const [hatcheryName, setHatcheryName] = useState('');
    // const [dimensions, setDimensions] = useState('')
    // const [grubCount, setgrubCount] = useState('')
    // const [density, seDensity] = useState('')
    // const [feedType, setFeedType] = useState('')
    // const [feedWeight, setFeedWeight] = useState('')
    // const [substrateType, setSubstrateType] = useState('')
    // const [substrateWeight, setSubstrateWeight] = useState('')


    function validateName() {
        return hatcheryName.length > 0 && hatcheryName.length < 20;
    }

    // Close the dropdown menu if the user clicks outside of it
    window.onclick = function(event) {
        if (!event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        //add uuid generation here

        const created = {
            hatcheryName: hatcheryName
        }

        axios.post('http://localhost:4000/api/createhatchery', created)
        .then(res => console.log(res.data))

        window.location = './home';
    }

    return (
        <div>
            <div className='container'>
                <div className='header'>
                    <h1> Create New Hatchery </h1>
                </div>
                <br />
                <div className= 'header'> 
                    <h4> Name Hatchery </h4>
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
                        <br />

                        {/* <div className= 'header'> 
                            <h4> Set Hatchery Dimensions </h4>
                        </div>
                        <label for="hatchery-dims">Select Hatchery Kit Size: </label>
                        <br />
                        <select name="hatchery-dims" id="hatchery-dims">
                            <option value="small kit">10" x 12" x 4"</option>
                            <option value="medium kit">14" x 16" x 6"</option>
                            <option value="large-kit">20" x 18" x 8"</option>
                        </select>
                        {/* need to figure out how to store this somehow */}
                        
                        <br />
                        <br />

                        {/* <div className= 'header'> 
                            <h4> Grub Count</h4>
                        </div>
                        <label for="grub-count">Select Starting Number of Grubs: </label>
                        <br />
                        <select name="grub-count-" id="grub-count">
                            <option value="100">100 Larvae</option>
                            <option value="500">500 Larvae</option>
                            <option value="750">750 Larvae</option>
                        </select> */}

                        <input type = 'text' 
                            placeholder='Hatchery Dimensions' 
                            onChange={(e) => setHatcheryName(e.target.value)} 
                            value={hatcheryName}
                            className='form-control form-group '> 
                        </input>      
                        <br />
                        <br /> 

                        <input type = 'submit'
                        className='btn btn-danger btn-block'
                        value='Save Changes'
                        disabled={!validateName()}>
                        </input>

                        <br />

                    </form>
                </div>
            </div>   
        </div>
    )
}

export default CreateHatchery;