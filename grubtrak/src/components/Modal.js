import React, {useState} from "react";
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { MdClose } from 'react-icons/md';
import { useRef, useCallback, useEffect } from "react";
import axios from 'axios';
import "./Modal.css";
import larvae from "./larvae.png";
import hatchery from "./hatchery.png";
import Dropdown from "../Dropdown.js";


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
  border-radius: 19px;
`;

const ModalWrapper = styled.div`
  position: absolute;
  width: 800px;
  height: 500px;
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
  width: 800px;
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
  border-color: #E57C55;
  padding-left: 5px;
`;

const ModalContent = styled.div`
  position: relative;
  top: 20px;
  height: 75%;
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

    var myStorage = window.localStorage;
    const [hatcheryName, setHatcheryName] = useState('');
    const [substrateWeight, setSubstrateWeight] = useState('');
    const [feedWeight, setFeedWeight] = useState('');
    const [hatcheryDensity, setHatcheryDensity] = useState('--');
    const [hatchSelected, hatchSetSelected] = useState("Selection");
    const hatcheryOptions = ["17” L x 6” W x 10” H", "10” L x 4” W x 6” H", "4” L x 4” W x 3” H"];
    const [numSelected, numSetSelected] = useState("Selection");
    const numberOptions = ["1000 Larvae", "2000 Larvae", "3000 Larvae"];
    const [feedSelected, feedSetSelected] = useState("Selection");
    const feedTypeOptions = ["Food Waste", "Non-Food Waste"];

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

    function getTrueHatcheryVolumeValue(stringVol) {
      let trueVolume = 0;
      // Gets rid of all non-alphanumeric characters "17” L x 6” W x 10” H" ---> 17610
      // But now, how do we know where one number ends and one begins? Kind of a workaround.
      stringVol = stringVol.replace(/\D/g,'');

      // If selections 1 is selected then the first two digits represent length and we account for a 
      //      two digit height.
      // If selection 2 is selected then the first two digits represent length and we account for a 
      //      One digit height.
      // If selection 3 is selected then the first digit represents length.
      // Again, specific to these values only, will not work for all string fashioned like above.
      if(stringVol.charAt(0) == '4'){
        trueVolume = Number(stringVol.slice(0,0)) * Number(stringVol.slice(1,1)) * Number(stringVol.slice(2,2));
      } else if (stringVol.charAt(0) == '1' && stringVol.charAt(1) == '7') {
        trueVolume = Number(stringVol.slice(0,2)) * Number(stringVol.slice(2,3)) * Number(stringVol.slice(3,5));
      } else {
        trueVolume = Number(stringVol.slice(0,2)) * Number(stringVol.slice(2,3)) * Number(stringVol.slice(3,4));
      }
      return trueVolume;
    }
    function reset() {
      setShowModal(prev => !prev);
      setHatcheryName('');
      hatchSetSelected("Selection");
      numSetSelected("Selection");
      feedSetSelected("Selection");
    }

    function createHatcheryAndReset() {
      
      // Needs to be changed for values with more than 4 digits say "1000 Larvae" vs. "10,000 Larvae"
      const numLarvae = Number(numSelected.slice(0,4));
      // Calculating volume so that hatcheryVolume enters database as a number
      const hatcheryVolume = getTrueHatcheryVolumeValue(hatchSelected);

      const hatchery = {
        hatcheryName: hatcheryName,
        user_id: JSON.parse(myStorage.getItem('currentUser'))._id, 
        hatcheryVolume: hatcheryVolume,
        numLarvae: numLarvae,
        feedType: feedSelected,
        feedWeight: feedWeight,
        substrateWeight: substrateWeight,
      }

      console.log(hatchery);
      
      axios.post('http://localhost:4000/api/createhatchery', hatchery)
          .then(res => console.log(res.data))
      
      
      setShowModal(prev => !prev);
      setHatcheryName('');
      hatchSetSelected("Selection");
      numSetSelected("Selection");
      feedSetSelected("Selection");

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


    //if no existing hatcheries
    //if the name is filled
    //if both the selections are selected
    //if next is clicked
    //return something wit that content

    //
  
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
                        Select the size of your <br></br>WUNDERgrubs hatchery kit
                        <br></br>
                        <img src={hatchery} className="hatchery-small-icon" alt="Hatchery"/>
                        <Dropdown selected={hatchSelected} setSelected={hatchSetSelected} options={hatcheryOptions}/>
                      </div>

                      <div className='number-section'>
                        Select the number of larvae <br></br>included in your hatchery kit
                        <br></br>
                        <img src={larvae} className="larvae-small-icon" alt="Larvae"/>
                        <Dropdown selected={numSelected} setSelected={numSetSelected} options ={numberOptions}/>
                      </div>

                      <div className='number-section'>
                      <div type='text' className='large-text'>Hatchery Specifications</div>
                          <div type='text' className='small-text'>Substrate Weight (lb.)</div>
                          <input type = 'text' 
                            placeholder='Enter Weight' 
                            onChange={(e) => setSubstrateWeight(e.target.value)} 
                            value={substrateWeight}
                            className='specifications-input'> 
                          </input>
                          
                          <div type='text' className='small-text'>Feed Weight (lb.)</div>
                          <input type = 'text' 
                            placeholder='Enter Weight' 
                            onChange={(e) => setFeedWeight(e.target.value)} 
                            value={feedWeight}
                            className='specifications-input'> 
                          </input>

                          <div type='text' className='small-text'>Feed Type</div>

                          <Dropdown selected={feedSelected} setSelected={feedSetSelected} options={feedTypeOptions}/>
                      </div>
                      
                      {/* <div className='density-section'> Calculated Hatchery Density <br></br> {hatcheryDensity}
                      </div> */}
                  </div>

                  {/* <div className="specifications">
                  <div className='specifications-section'>Hatchery Specifications</div>
                  </div> */}

                  {/* <div className='density-section'> Calculated Hatchery Density <br></br> {hatcheryDensity}</div> */}

                <div className="controls">
                    <button className='cancel-btn' onClick={reset}>Cancel</button>
                    <button className='next-btn' onClick={createHatcheryAndReset}>Next</button>
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