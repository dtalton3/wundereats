import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

 
function CreateHatchery() {
    
    const [hatcheryName, setHatcheryName] = useState('');
    const [length, setLength] = useState('');
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [grubCount, setGrubCount] = useState('')
    const [feedType, setFeedType] = useState('');
    const [feedWeight, setFeedWeight] = useState('');
    const [substrateType, setSubstrateType] = useState('');
    const [substrateWeight, setSubstrateWeight] = useState('');
    
    var myStorage = window.localStorage; // May use this to persist a logged-in user across pages
    
    function validateForm() { 
        return hatcheryName.length > 0
         && length.length > 0
         && width.length > 0
         && height.length > 0
         && grubCount.length > 0
         && feedType.length > 0
         && feedWeight.length > 0
         && substrateType.length > 0
         && substrateWeight.length > 0;
    }
    
    function handleSubmit(event) {
        event.preventDefault();
        const hatchery = {
            hatcheryName: hatcheryName,
            dimensions: length, width, height,
            grubCount: grubCount,
            feedType: feedType,
            feedWeight: feedWeight,
            substrateType: substrateWeight,
            substrateWeight: substrateWeight
        }
        console.log("This was the hatchery name " + hatcheryName)
        
        axios.post('http://localhost:4000/api/createhatchery', hatchery)
            .then((res) => {
                console.log(res.data);
                myStorage.setItem('newestHatchery', res.data)
            });
        window.location = '/home';
    }

    return (
        <div>
            <div className='container'>
                <div className='header'>
                    <h1> Create a hatchery! </h1>
                </div>

                <div className='form-div'>
                    <form onSubmit={handleSubmit}>
                        <h3> Name Hatchery </h3>
                        <input type = 'text' 
                        placeholder='Hatchery Name' 
                        onChange={(e) => setHatcheryName(e.target.value)} 
                        value={hatcheryName}
                        className='form-control form-group '> 
                        </input>

                        <br />
                        <br />

                        <h3>Hatchery Dimensions </h3>
                        <h5>Length</h5>
                        <input type = 'text' 
                        placeholder='inches' 
                        onChange={(e) => setLength(e.target.value)} 
                        value={length}
                        className='form-control form-group '> 
                        </input>

                        <br />

                        <h5>Width</h5>
                        <input type = 'text' 
                        placeholder='inches' 
                        onChange={(e) => setWidth(e.target.value)} 
                        value={width}
                        className='form-control form-group '> 
                        </input>
                        
                        <br />

                        <h5>Height</h5>
                        <input type = 'text' 
                        placeholder='inches' 
                        onChange={(e) => setHeight(e.target.value)} 
                        value={height}
                        className='form-control form-group '> 
                        </input>
                        
                        <br />
                        <br />

                        <h3>Initial Grub Count </h3>
                        <input type = 'text' 
                        placeholder='Grub Count' 
                        onChange={(e) => setGrubCount(e.target.value)} 
                        value={grubCount}
                        className='form-control form-group '> 
                        </input>

                        <br />
                        <br />

                        <h3>Feed Type </h3>
                        <input type = 'text' 
                        placeholder='food waste or non-food waste' 
                        onChange={(e) => setFeedType(e.target.value)} 
                        value={feedType}
                        className='form-control form-group '
                        > 
                        </input>                    

                        <br />
                        <br />

                        <h3>Feed Weight </h3>
                        <input type = 'text' 
                        placeholder='lbs' 
                        onChange={(e) => setFeedWeight(e.target.value)} 
                        value={feedWeight}
                        className='form-control form-group '
                        > 
                        </input>    

                        <br />
                        <br />

                        <h3>Substrate Type </h3>
                        <input type = 'text' 
                        placeholder='Oakwood or dried leaves' 
                        // reconfirm this ^^^^^^^^^^^^
                        onChange={(e) => setSubstrateType(e.target.value)} 
                        value={substrateType}
                        className='form-control form-group '
                        > 
                        </input>                    

                        <br />
                        <br />

                        <h3>Substrate Weight </h3>
                        <input type = 'text' 
                        placeholder='lbs' 
                        onChange={(e) => setSubstrateWeight(e.target.value)} 
                        value={substrateWeight}
                        className='form-control form-group '
                        > 
                        </input>                          

                        <br />
                        <br />

                        <input type = 'submit'
                        className='btn btn-danger btn-block'
                        value='Create!'
                        disabled={!validateForm()}>
                        </input>

                    </form>
                </div>
            </div>   
        </div>
    );

}

export default CreateHatchery;