import React, {useState} from "react";
import Navbar from './components/Navbar/Navbar';
import VNavbar from './components/VNavbar/VNavbar'
import axios from 'axios';
import "./Home.css";
import Modal from './components/Modal.js';
import GlobalStyle from "./globalStyles";
import styled from "styled-components";
import UserHatcheries from "./UserHatcheries.js";
// social media related import statements
// import fb from "./grubtrak/src/images/fb.png";
// import fb from "/Users/samkofi/Desktop/wundereats/grubtrak/src/images/fb.png";


function Home() {
    const [hatcheriesList, setHatcheriesList] = useState([]);
    var userInfo = localStorage.getItem("currentUser");
    //console.log(userInfo);
    var userID = JSON.parse(userInfo)._id;
    // console.log(userID);
    console.log('hatcheries/:_' + userID);
    
    const getHatcheries = (e) => {
        e.preventDefault();
        axios.get('http://localhost:4000/api/hatcheries/' + userID)
        .then(hatcheries => {
            console.log(hatcheries.data);
            setHatcheriesList(hatcheries.data);
        
        });
    }

    const [showModal, setShowModal] = useState(false);
    const userHatcheriesExist = true;

    // function to open the hatchery creation modal
    function openModal(event) {
        event.preventDefault();
        setShowModal(prev => !prev);
    }

    const PopUpButton = styled.button`
    background-color: transparent;
    border-style: none;
    box-sizing: border-box;
    color: #21b5bc;
    margin: 0;
    padding: 0; 
    font-family: 'Arial', sans-sreif;
    `;

    if (userHatcheriesExist){
        return (

            <div className="Home-header">
                <div className="Left-panel">
                    <VNavbar />
                    {/* code to show social media icons. didn't finish in time */}
                    {/* <div class="social_media">
                        <a href="https://www.facebook.com/wundergrubs/"><i class="fab fa-facebook-f"></i>fb</a>
                        <a href="https://twitter.com/wundergrubs"><i class="fab fa-twitter"></i>tw</a>
                        <a href="https://www.instagram.com/wundergrubs/"><i class="fab fa-instagram"></i>ig</a>
                    </div> */}
                </div>
                <div className="Top-panel">
                    <Navbar className="Top-panel-content"/>
                </div>

                <div className="Mid-panel">
                    <h1 className='Mid-panel-content'>My Hatcheries</h1>
                    <PopUpButton className='Mid-panel-refresh-hatchery'onClick={getHatcheries}>+ Refresh Hatcheries</PopUpButton>
                    <PopUpButton className='Mid-panel-create-hatchery'onClick={openModal}> + Create New Hatchery</PopUpButton>
                </div>

                <div className="Dashboard">
                    {
                    hatcheriesList.length >= 1 ? hatcheriesList.map((hatchery, indx) => {
                        console.log(hatchery._id);
                        return <UserHatcheries key={indx} hatcheryInfo={hatchery._id} name={hatchery.hatcheryName} size={hatchery.hatcheryDimensions} larvaeCount={"Larvae Count: " + hatchery.numLarvae} density={hatchery.hatcheryDensity + " kg/m^3"}/>
                    })
                    :''
                    }
                    <Modal showModal={showModal} setShowModal={setShowModal}></Modal>
                    
                </div>
                <GlobalStyle />
            </div>
        );
    } else {
        return (
            <div className="Home-header">
                <div className="Left-panel">
                    <VNavbar />
                </div>
                <div className="Top-panel">
                    <Navbar className="Top-panel-content"/>
                </div>
                <div className="Mid-panel">
                    <h1 className='Mid-panel-content'>My Hatcheries</h1>
                </div>
                <div className="Dashboard">
                    <PopUpButton className='Dash-content'onClick={openModal}> + Create New Hatchery</PopUpButton>
                    <Modal showModal={showModal} setShowModal={setShowModal}></Modal>
                </div>
                <GlobalStyle />
            </div>
        );
    }
}

export default Home;