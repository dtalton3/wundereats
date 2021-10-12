import React, {useState} from "react";
import Navbar from './components/Navbar/Navbar';
import VNavbar from './components/VNavbar/VNavbar'
import "./Home.css";
import Modal from './components/Modal.js';
import GlobalStyle from "./globalStyles";
import styled from "styled-components";


function Home() {
    // function backToHome(event) {
    //     event.preventDefault();

    //     window.location = '/Login'
    // }

    const [showModal, setShowModal] = useState(false);
    const [userHatcheriesExist, setUserHatcheriesExists] = useState(false);

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

    if (userHatcheriesExist == 'true'){
        return ("hi");
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
                    

                    {/* <h1>+ Create New Hatchery</h1> */}
                    {/* making dashboard */}
                    {/* <Button className="Back-button">
                        <Link to="/" className="Link-style">Back</Link>
                    </Button> */}
                    {/*
                    <input type = 'submit'
                            className='btn btn-danger btn-block'
                            value='Login'
                            onClick={backToHome}>
                    </input> */}
                </div>
                <GlobalStyle />
            </div>
        );
    }
}

export default Home;