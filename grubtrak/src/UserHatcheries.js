import React, {useState} from "react";
import "./UserHatcheries.css";
import larvae from "./images/larvae2.png";
import hatchery from "./images/hatch2.png";
// import EditModal from './components/Modal.js';
import GlobalStyle from "./globalStyles";
import styled from "styled-components";
import Modal from './components/Modal.js';
import EditModal from './components/EditModal.js';
import axios from 'axios';
// import GlobalStyle from "./globalStyles";


function UserHatcheries({ hatcheryInfo, name, size, larvaeCount, density }) {
    var myStorage = window.localStorage; 
    
    const [showEditModal, setShowEditModal] = useState(false);
    function openEditModal(event, hatcheryID) {
        hatcheryID = hatcheryInfo;
        myStorage.setItem('currentHatch', hatcheryInfo);
        event.preventDefault();
        setShowEditModal(prev => !prev);
    }

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


    return(
        <div className="userHatcheriesContainer">
            <div className='userHatcheriesHeading'>
                <div className="userHatcheryName">
                    {name}
                </div>
                <PopUpButton onClick={openEditModal}> Edit Hatchery</PopUpButton>
                <PopUpButton2 onClick={deleteHatchery}> Delete </PopUpButton2>
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
                <EditModal showModal={showEditModal} setShowModal={setShowEditModal}></EditModal>
            </div>
            <GlobalStyle />
        </div>
    );
}

export default UserHatcheries;