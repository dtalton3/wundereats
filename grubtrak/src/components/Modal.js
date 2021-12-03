import React, {useState} from "react";
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { MdClose } from 'react-icons/md';
import { useRef, useCallback, useEffect } from "react";
import axios from 'axios';
import "./Modal.css";
import larvae from "../images/larvae.png";
import hatchery from "../images/hatchery.png";
import substrate from "../images/substrate.png";
import foodwaste from "../images/foodwaste.png";
import Dropdown from "../Dropdown.js";

const HatcheryCalculations = require("./HatcheryCalculations.js");
var myStorage = window.localStorage;

const Background = styled.div`
  bottom: 0px;
  right: 30px;
  height: calc(100vh - 30vh);
  width: calc(100vw - 25vw);
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
`;

const ModalWrapper = styled.div`
  position: absolute;
  width: 900px;
  height: calc(100vh - 32vh);
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;

  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HatcheryName = styled.div`
  width: 900px;
  height: 50px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #EBCBBD;
  color: white;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
  border-style: solid;
  border-color: #fc5459;
  padding-left: 5px;
`;

const ModalContent = styled.div`
  position: relative;
  top: 20px;
  height: 90%;
  display: grid;
  flex-direction: column;
  justify-content: center;
  padding-left: 10px;
  padding-right: 10px;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  h1 {
    position:relative;
  }
  p {
    margin-bottom: 1rem;
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

function Modal({showModal, setShowModal}) {
    const [hatcheryName, setHatcheryName] = useState('');
    const [substrateWeight, setSubstrateWeight] = useState('');
    const [feedWeight, setFeedWeight] = useState('');
    // const [hatcheryDensity, setHatcheryDensity] = useState('--');
    const [hatchSelected, hatchSetSelected] = useState("Select kit");
    const hatcheryOptions = ["18 x 10.4 x 13.9 cm", "34.6 x 21 x 12.4 cm", "67.3 x 40.6 x 16.8 cm"]; 
    const [numSelected, numSetSelected] = useState("Select grubs");
    const numberOptions = ["100", "500", "1000", "5000"];
    const [feedSelected, feedSetSelected] = useState("Select feed");
    const feedTypeOptions = ["Food Waste: Any", "Styrofoam", "Paper", "Plastic"];
    const [substrateSelected, substrateSetSelected] = useState("Select substrate");
    const substrateTypeOptions = ["Rolled Oats", "Wheat Bran", "Hops", "Hemp"];

    const modalRef = useRef();
  
    const animation = useSpring({
      config: {
        duration: 250
      },
      opacity: showModal ? 1 : 0,
      transform: showModal ? `translateY(0%)` : `translateY(-100%)`
    });
  
    const closeModal = e => {
      if (modalRef.current === e.target) {
        setShowModal(false);
      }
    };

    function reset() {
      setShowModal(prev => !prev);
      setHatcheryName('');
      hatchSetSelected("Selection");
      numSetSelected("Selection");
      feedSetSelected("Selection");
      // setHatcheryDensity('0');
    }

    function editHatchery() {

      // Needs to be changed for values with more than 4 digits say "1000 Larvae" vs. "10,000 Larvae"
      const numLarvae = Number(numSelected);
      console.log(myStorage.getItem('currentHatch'));

      //calculating grub mass for emissions calculation
      let grubMass = HatcheryCalculations.getGrubMass(numSelected);

      // Calculating volume so that hatcheryVolume enters database as a number
      let hatcheryVolume = HatcheryCalculations.getTrueHatcheryVolumeValue(hatchSelected);

      // Calculating density for database storage
      let hatcheryDensity = HatcheryCalculations.getHatcheryDensity(hatcheryVolume, grubMass, substrateWeight, feedWeight);

      // Calculating hatchery emissions to store in database for retrieval later
      let hatcheryEmissions = HatcheryCalculations.getEmissionsCalculationsFromGrubMass(grubMass);
      const userInfo = localStorage.getItem("currentUser");
      const userID = JSON.parse(userInfo)._id;

      console.log(hatcheryName);
      const hatchery = {
        user_id: userID,
        hatcheryName: hatcheryName,
        hatcheryVolume: hatcheryVolume,
        hatcheryDensity: hatcheryDensity.toFixed(1),
        hatcheryDimensions: hatchSelected,
        numLarvae: numLarvae,
        feedType: feedSelected,
        feedWeight: feedWeight,
        subtrateType: substrateSelected,
        substrateWeight: substrateWeight,
        emissions : hatcheryEmissions
      }

      axios.put('http://localhost:4000/api/edit-hatchery/' + userID + '/' + myStorage.getItem('currentHatch'), hatchery)
          .then(res => console.log(res.data))
      

      setShowModal(prev => !prev);
      setHatcheryName('');
      hatchSetSelected("Selection");
      numSetSelected("Selection");
      feedSetSelected("Selection");
      substrateSetSelected("Selection");
    }
    function createHatcheryAndReset() {
      
      // Needs to be changed for values with more than 4 digits say "1000 Larvae" vs. "10,000 Larvae"
      const numLarvae = Number(numSelected);

      //calculating grub mass for emissions calculation
      let grubMass = HatcheryCalculations.getGrubMass(numSelected);

      // Calculating volume so that hatcheryVolume enters database as a number
      let hatcheryVolume = HatcheryCalculations.getTrueHatcheryVolumeValue(hatchSelected);

      // Calculating density for database storage
      let hatcheryDensity = HatcheryCalculations.getHatcheryDensity(hatcheryVolume, grubMass, substrateWeight, feedWeight);

      // Calculating hatchery emissions to store in database for retrieval later
      let hatcheryEmissions = HatcheryCalculations.getEmissionsCalculationsFromGrubMass(grubMass);

      const userInfo = localStorage.getItem("currentUser");
      const userID = JSON.parse(userInfo)._id;

      const hatchery = {
        user_id: userID,
        hatcheryName: hatcheryName,
        hatcheryVolume: hatcheryVolume,
        hatcheryDensity: hatcheryDensity.toFixed(1),
        hatcheryDimensions: hatchSelected,
        numLarvae: numLarvae,
        feedType: feedSelected,
        feedWeight: feedWeight,
        subtrateType: substrateSelected,
        substrateWeight: substrateWeight,
        emissions : hatcheryEmissions
      }

      console.log(hatchery);
      
      axios.post('http://localhost:4000/api/createhatchery', hatchery)
          .then(res => console.log(res.data))
      
      setShowModal(prev => !prev);
      setHatcheryName('');
      hatchSetSelected("Selection");
      numSetSelected("Selection");
      feedSetSelected("Selection");
      substrateSetSelected("Selection");

      //window.location = '/Home';

      // console.log( hatcheryName + " " + hatchSelected  + " " + numSelected + " " + feedSelected + " " + feedWeight + " " + substrateWeight)
      
    }
  
    const keyPress = useCallback(
      e => {
        if (e.key === 'Escape' && showModal) {
          setShowModal(false);
          console.log('Escape pressed');
        }
      },
      [setShowModal, showModal]
    );
  
    useEffect(
      () => {
        document.addEventListener('keydown', keyPress);
        return () => document.removeEventListener('keydown', keyPress);
      },
      [keyPress]
    );
    
    return (
      <>
        {showModal ? (
          <Background onClick={closeModal} ref={modalRef}>
            <animated.div style={animation}>
              <ModalWrapper showModal={showModal}>
                <HatcheryName>
                    <input type = 'text' 
                        placeholder='Enter Name for New Hatchery' 
                        onChange={(e) => setHatcheryName(e.target.value)} 
                        value={hatcheryName}
                        className='input'> 
                    </input>
                </HatcheryName>
                
                {/* <ModalImg src={grub} alt='camera' /> */}
                <ModalContent>
                  <div className="hatchery-selections">

                      <div className='number-section'> 
                        Select your hatchery dimensions <br></br> (centimeters) <br></br>
                        <br></br> 
                        <img src={hatchery} className="hatchery-small-icon" alt="Hatchery"/>
                        <Dropdown selected={hatchSelected} setSelected={hatchSetSelected} options={hatcheryOptions}/>
                      </div>

                      <div className='number-section'>
                        Select your hatchery <br></br> starter grubs amount<br></br> 
                        <br></br>
                        <img src={larvae} width={135} height={135} className="hatchery-small-icon" alt="Larvae"/>
                        <Dropdown selected={numSelected} setSelected={numSetSelected} options ={numberOptions}/>
                      </div>

                      <div className='number-section'>
                        Weight of substrate used (kg)
                          <input type = 'text' 
                            placeholder='Enter Weight' 
                            onChange={(e) => setSubstrateWeight(e.target.value)} 
                            value={substrateWeight}
                            className='specifications-input'>                         
                          </input>
                          
                        <img src={substrate} className="larvae-small-icon" alt="Larvae"/>
                        <br></br> 
                        Select substrate type                        
                        <Dropdown selected={substrateSelected} setSelected={substrateSetSelected} options={substrateTypeOptions}/>
                      </div>

                     <div className='number-section'>
                       Weight of feed used (kg)
                          <input type = 'text' 
                            placeholder='Enter Weight' 
                            onChange={(e) => setFeedWeight(e.target.value)} 
                            value={feedWeight}
                            className='specifications-input'> 
                          </input>  

                        <img src={foodwaste} className="larvae-small-icon" alt="Larvae"/>                        
                        <br></br> 
                        Select feed type
                        <Dropdown selected={feedSelected} setSelected={feedSetSelected} options={feedTypeOptions}/>
                      </div>

                  </div>

                <div className="controls">               
                    <button className='cancel-btn' onClick={reset}>Cancel</button>
                    <button className='next-btn' onClick={createHatcheryAndReset}>Save</button>
                </div>
                
                </ModalContent>
                <CloseModalButton
                  aria-label='Close modal'
                  onClick={reset}
                />
              </ModalWrapper>
            </animated.div>
          </Background>
        ) : null}
      </>
    );
}

export default Modal;