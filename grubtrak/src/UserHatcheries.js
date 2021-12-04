import React, {useState} from "react";
import "./UserHatcheries.css";
import larvae from "./images/larvae2.png";
import hatchery from "./images/hatch2.png";
import GlobalStyle from "./globalStyles";
import styled from "styled-components";
import EditModal from './components/EditModal.js';
import axios from 'axios';

/**
 * Function that populates the hatchery dashboard with cards that display each of a user's hatcheries with their data
 * This method is called in Home.js on line 79 for each existing ahtchery
 * 
 * @param {*} set of variables dependent on which hatchery is to be displayed 
 * @returns the hatchery card that displays on the dashboard with the specified hatchery's data
 */
function UserHatcheries({ hatchery_ID, name, size, larvaeCount, density }) {
    var myStorage = window.localStorage; 
    
    const [showEditModal, setShowEditModal] = useState(false);

    /**
     * Function that opens the edit modal when a user clicks 'Edit hatchery'
     * 
     * @param {*} event - object that determines certain app functions
     * @param {*} hatcheryID - the unique ID of the specified hatchery whose values will be updated based on user input
     */
    function openEditModal(event, hatcheryID) {
        hatcheryID = hatchery_ID;
        myStorage.setItem('currentHatch', hatchery_ID);
        event.preventDefault();
        setShowEditModal(prev => !prev);
    }

    /**
     * Deletes the specified hatchery (after refreshing the hatcheries)
     */
    function deleteHatchery() {
        const userInfo = localStorage.getItem("currentUser");
        const userID = JSON.parse(userInfo)._id;
        const hatchery = hatchery_ID;

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