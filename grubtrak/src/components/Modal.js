import React, {useState} from "react";
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { MdClose } from 'react-icons/md';
import { useRef, useCallback, useEffect } from "react";
import "./Modal.css";




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
  
    const keyPress = useCallback(
      e => {
        if (e.key === 'Escape' && showModal) {
          setShowModal(false);
          console.log('I pressed');
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
                  <h1>Select Hatchery Stage</h1>
                  <div className="hatchery-selections">
                      <div className='beetle-box'>Beetle</div>
                      <div className='egg-box'>Egg</div>
                      <div className='larvae-box'>Larvae</div>
                      <div className='pupae-box'>Pupae</div>
                  </div>
                <div className="controls">
                    <button className='cancel-btn' onClick={() => setShowModal(prev => !prev)}>Cancel</button>
                    <button className='next-btn'>Next</button>
                </div>
                </ModalContent>
                
                <CloseModalButton
                  aria-label='Close modal'
                  onClick={() => setShowModal(prev => !prev)}
                />
              </ModalWrapper>
            </animated.div>
          </Background>
        ) : null}
      </>
    );
}


export default Modal;