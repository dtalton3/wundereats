import React, {useState} from "react";
import "./Impact.css";
import Navbar from './components/Navbar/Navbar';
import VNavbar from './components/VNavbar/VNavbar';
import GlobalStyle from "./globalStyles";
import axios from 'axios';
import styled from "styled-components";
import ImpactHatcheries from "./ImpactHatcheries";

function Impact() {

    const [hatcheriesList, setHatcheriesList] = useState([]);
    const PopUpButton = styled.button`
    background-color: transparent;
    border-style: none;
    box-sizing: border-box;
    color: #21b5bc;
    margin: 0;
    padding: 0; 
    font-family: 'Arial', sans-sreif;
    `;

    var userInfo = localStorage.getItem("currentUser");
    var userID = JSON.parse(userInfo)._id;

    const getHatcheries = (e) => {
        e.preventDefault();
        axios.get('http://localhost:4000/api/hatcheries/' + userID)
        .then(hatcheries => {
            console.log(hatcheries.data);
            setHatcheriesList(hatcheries.data);
        });
    }

    return (
        <div className="Home-header">

            <div className="Left-panel">
                <VNavbar />
            </div>

            <div className="Top-panel">
                <Navbar className="Top-panel-content"/>
            </div>

            <div className="Mid-panel">
                <h1 className='Mid-panel-content'>Impact Reports</h1>
                <PopUpButton className='Mid-panel-refresh-hatchery'onClick={getHatcheries}>+ Refresh Hatcheries</PopUpButton>
            </div>
            <div className="Dashboard">
                {
                hatcheriesList.length >= 1 ? hatcheriesList.map((hatchery, indx) => {
                    // return <p key={indx}> This is the name: {hatchery.hatcheryName}</p>
                    return <ImpactHatcheries key={indx} name={hatchery.hatcheryName} larvaeCount={hatchery.numLarvae} />
                })
                :''
                }
            </div>
            <GlobalStyle />
        </div>
    );
}

export default Impact;