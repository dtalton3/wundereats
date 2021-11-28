import React, {useState} from "react";
import "./UserHatcheries.css";
import larvae from "./components/larvae2.png";
import hatchery from "./components/hatch2.png";
import EditModal from './components/Modal.js';
import GlobalStyle from "./globalStyles";
import styled from "styled-components";
import Modal from './components/Modal.js';
// import GlobalStyle from "./globalStyles";


function UserHatcheries({ name, size, larvaeCount, density }) {
    const [showEditModal, setShowEditModal] = useState(true);


    const [showModal, setShowModal] = useState(false);
    function openModal(event) {
        event.preventDefault();
        setShowModal(prev => !prev);
    }

    function openEditModal(event) {
        event.preventDefault();
        setShowEditModal(prev => !prev);
    }

    function consoleTest(even) {
        console.log("test from consoleTest");
        return <div>
            <div className="tester"> </div>
        </div>
    }
    const PopUpButton = styled.button`
    position: absolute;
    background-color: transparent;
    background-color: #e57c55;
    border: solid;
    border-color: black;
    box-sizing: border-box;
    border-radius: 10px;
    color: #white;
    margin: 0;
    padding: 10; 
    font-family: 'Arial', sans-sreif;
    right: 15px;
    top: 10px;
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
                </div>
                <PopUpButton onClick={openModal}> Edit Hatchery</PopUpButton>
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
                <Modal showModal={showModal} setShowModal={setShowModal}></Modal>
            </div>
            <GlobalStyle />
        </div>
    );
}

export default UserHatcheries;