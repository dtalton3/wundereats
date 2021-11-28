import React, {useState} from "react";
import Navbar from './components/Navbar/Navbar';
import VNavbar from './components/VNavbar/VNavbar'
import axios from 'axios';
import "./Home.css";
import Modal from './components/Modal.js';
import GlobalStyle from "./globalStyles";
import styled from "styled-components";
import UserHatcheries from "./UserHatcheries.js";

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
    // axios.get('http://localhost:4000/api/hatcheries/' + userID)
    // .then(hatcheries => setHatcheriesList(hatcheries.data)
    // //     hatcheriesOfUser = hatcheries.data;
    // //     console.log(hatcheries.data);
    // //     console.log(hatcheriesOfUser);
    // );

    const [showModal, setShowModal] = useState(false);
    const userHatcheriesExist = true;

    function openModal(event) {
        event.preventDefault();
        setShowModal(prev => !prev);
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

    if (userHatcheriesExist){
        return (
            // <div>
            //     <h1> Hatchery Test </h1>
            //     <button onClick={getHatcheries}>Get Hatcheries</button>
            //         {
            //         hatcheriesList.length >= 1 ? hatcheriesList.map((hatchery, indx) => {
            //             return <p key={indx}> This is the name: {hatchery.hatcheryName}</p>
            //         })
            //         :'No existing hatcheries. Create one!'
            //         }
            // </div>
            <div className="Home-header">
                <div className="Left-panel">
                    <VNavbar />
                </div>
                <div className="Top-panel">
                    <Navbar className="Top-panel-content"/>
                </div>

                <div className="Mid-panel">
                    <h1 className='Mid-panel-content'>My Hatcheries</h1>
                    <PopUpButton className='Mid-panel-refresh-hatchery'onClick={getHatcheries}>+ Load Hatcheries</PopUpButton>
                    <PopUpButton className='Mid-panel-create-hatchery'onClick={openModal}> + Create New Hatchery</PopUpButton>
                </div>

                <div className="Dashboard">
                {/* <button onClick={getHatcheries}>Refresh Hatcheries</button> */}
                    {
                    hatcheriesList.length >= 1 ? hatcheriesList.map((hatchery, indx) => {
                        // return <p key={indx}> This is the name: {hatchery.hatcheryName}</p>
                        return <UserHatcheries key={indx} name={hatchery.hatcheryName} size={hatchery.hatcheryDimensions} larvaeCount={"Larvae Count: " + hatchery.numLarvae} density={hatchery.hatcheryDensity + " kg/m^3"}/>
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
                    {/* <UserHatcheries /> */}
                    <PopUpButton className='Dash-content'onClick={openModal}> + Create New Hatchery</PopUpButton>
                    <Modal showModal={showModal} setShowModal={setShowModal}></Modal>
                </div>
                <GlobalStyle />
            </div>
        );
    }
}

export default Home;