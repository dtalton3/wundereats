import React, {useState} from "react";
import "./UserHatcheries.css";
import larvae from "./components/larvae2.png";
import hatchery from "./components/hatch2.png";
// import EditModal from './components/Modal.js';
import GlobalStyle from "./globalStyles";
import styled from "styled-components";
import Modal from './components/Modal.js';
import axios from 'axios';
// import GlobalStyle from "./globalStyles";


function UserHatcheries({ hatcheryInfo, name, size, larvaeCount, density }) {
    // const [showEditModal, setShowEditModal] = useState(true);


    const [showModal, setShowModal] = useState(false);
    function openModal(event) {
        event.preventDefault();
        setShowModal(prev => !prev);
    }

    // function openEditModal(event) {
    //     event.preventDefault();
    //     setShowEditModal(prev => !prev);
    // }

    // function consoleTest(even) {
    //     console.log("test from consoleTest");
    //     return <div>
    //         <div className="tester"> </div>
    //     </div>
    // }
    function deleteHatchery() {
        const userInfo = localStorage.getItem("currentUser");
        const userID = JSON.parse(userInfo)._id;
        const hatchery = hatcheryInfo;

        axios.delete('http://localhost:4000/api/delete-hatchery/' + userID + "/" + hatchery)
          .then(res => console.log(res.data))
      

    }


    const PopUpButton = styled.button`
    position: absolute;
    width: 240px;
    background-color: transparent;
    background-color: #fc5459;
    border: solid;
    border-color: black;
    box-sizing: border-box;
    border-radius: 10px;
    color: #white;
    margin: 0;
    padding: 10; 
    font-family: 'Arial', sans-sreif;
    right: 270px;
    top: 10px;
    `;

    const PopUpButton2 = styled.button`
    position: absolute;
    width: 240px;
    background-color: transparent;
    background-color: #ee2d35;
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
                <PopUpButton2 onClick={deleteHatchery}> Delete Hatchery</PopUpButton2>
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