import React, {useState} from "react";
import "./UserHatcheries.css";
import larvae from "./components/larvae2.png";
import hatchery from "./components/hatch2.png";
import EditModal from './components/Modal.js';
import styled from "styled-components";
// import GlobalStyle from "./globalStyles";


function UserHatcheries({ name, size, larvaeCount, density }) {
    const [showEditModal, setShowEditModal] = useState(true);

    function openEditModal(event) {
        event.preventDefault();
        setShowEditModal(prev => !prev);
    }
    const PopUpButton = styled.button`
    background-color: transparent;
    border-style: none;
    box-sizing: border-box;
    color: #12545C;
    margin: 0;
    padding: 0; 
    font-family: 'Arial', sans-sreif;
    `;


    // const [showModal, setShowModal] = useState(false);
    // function openModal(event) {
    //     event.preventDefault();
    //     setShowModal(prev => !prev);
    // }

    return(
        <div className="userHatcheriesContainer">
            <div className='userHatcheriesHeading'>
                <div className="userHatcheryName">
                    {name}
                    {/* {size}
                    {larvae}
                    {density} */}
                </div>

                {/* <input type = 'submit'
                    className='create-button' 
                    value='Edit Hatchery'
                    onClick={openEditModal}
                    // onClick={openModal}
                    >
                </input> */}
                <PopUpButton onClick={openEditModal}> Edit Hatchery</PopUpButton>
                <EditModal showEditModal={showEditModal} setShowEditModal={setShowEditModal}></EditModal>
            
            </div>

            <div className="userHatcheriesBody">
                <div className="bodyItem">
                    <img className='hatchery-img' alt="hatchery-img" src={hatchery} />
                    {size} 
                </div>
                <div className="bodyItem">
                    <img className='larvae-img' alt="larvae-img"  src={larvae} />
                    {larvaeCount} 
                </div>
                <div className="bodyItem">
                    Hatchery Density:
                    <br></br>
                    {density} 
                </div>

            </div>
            {/* <Modal showModal={showModal} setShowModal={setShowModal}></Modal> */}
        </div>
    );
}

export default UserHatcheries;