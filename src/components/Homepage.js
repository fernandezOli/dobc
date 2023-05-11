import { React, /*useContext, useState*/ } from 'react';
import { useNavigate } from "react-router-dom";
//import { AuthContext } from './AuthProvider';

import explorerImg from '../assets/img/explorer.jpg';

import schemaImg from '../assets/img/schema.jpg';
import cadenasImg from '../assets/img/cadenas.png';

import '../assets/css/global.css';
import '../assets/css/Homepage.css';

//import slideText from '../assets/slides.json';

const Homepage = () => {
  //const [slideStep, setSlideStep] = useState(0);
  //const [titleSlide, setTitleSlide] = useState(slideText.us[0].title);
  //const [textSlide, setTextSlide] = useState(slideText.us[0].text);

  //const authInfos = useContext(AuthContext);
  const navigate = useNavigate();

  //console.log("slideText: ",slideText.us[0].text);
  //**** Buttons ****
  async function loadExplorer() {
    console.log('-- loadExplorer --');
    navigate("/explorer", { replace: true });
    /*
    const userAddress = await authInfos._connectWallet();
    //console.log('userAddress: ', userAddress);
    if (userAddress === null) return;
    // check si disk
    //console.log('check if have disk: ', userAddress[0]);
    const haveDisk = await authInfos.diskRegistryClass.diskExist(userAddress[0]);
    console.log('have disk: ', haveDisk);
    if(haveDisk) navigate("/explorer", { replace: true });
    */
  }

  /*
  async function btnSignUp() {
    console.log('-- btnSignUp --');
  }
  */

  /*
  async function slideNext() {
    //console.log('-- slideNext --');
    if (slideText.us[(slideStep+ 1)] === undefined) {
      setTitleSlide(slideText.us[0].title);
      setTextSlide(slideText.us[0].text);
      setSlideStep(0);
      return;
    }
    setTitleSlide(slideText.us[(slideStep+ 1)].title);
    setTextSlide(slideText.us[(slideStep+ 1)].text);
    setSlideStep(slideStep + 1);
  }
  */

  return (
    <div className="App Homepage">
      <header className="App-header Homepage-header">
        <div className="Homepage-header-title">Immutable Decentralized Disk Storage</div>
        <div className="Homepage-header-subtitle">The most easy way to store any files on web3</div>
      </header>
        {/* Slide left */}
        {/*
      <div id="slide" className="Homepage-slide">
        <div id="slide-left" className="Homepage-slide-left">
          <div style={{padding: "10px 5px 10px 20px", textAlign: "left"}}>
            <h1>{titleSlide}</h1>
            <h3 dangerouslySetInnerHTML={{__html: textSlide}}></h3>
          </div>

          <div className="Homepage-slide-button"><button className="App-button" onClick={() => slideNext()}>Next {'>>'}</button></div>
        </div>

        <div id="slide-right" className="Homepage-slide-right">
          <img src={explorerImg} alt="" style={{maxHeight: "500px"}}></img>
        </div>
      </div>*/}
        {/* Slide right */}

      {/*<div className="Homepage-menu">
        <button className="App-button Homepage-button" style={{marginRight: "25px"}} onClick={() => btnLogin()}>Demo</button>
      </div>*/}
        {/* <button className="App-button Homepage-button" style={{marginLeft: "25px"}} onClick={() => btnSignUp()}>Sign up</button> */}

      {/* Details (slides) */}

      <div className="Homepage-detail">
        {/* left */}
        <div className="Homepage-detail-left">
          <div style={{padding: "10px 5px 10px 20px", textAlign: "left"}}>
            <div className="Homepage-detail-title">WELCOME TO THE ERA OF STORAGE 3.0</div>
            <div className="Homepage-detail-text">
              A decentralized storage solution based on Blockchain and ipfs, for security, preservation and online identification.
            </div>
          </div>
        </div>
        {/* right */}
        <div className="Homepage-detail-right">
          <img src={schemaImg} alt="" style={{maxHeight: "500px"}}></img>
        </div>
      </div>

      <div className="Homepage-detail">
        {/* left */}
        <div className="Homepage-detail-left">
          <img src={cadenasImg} alt="" style={{maxHeight: "500px"}}></img>
        </div>
        {/* right */}
        <div className="Homepage-detail-right">
          <div style={{padding: "10px 5px 10px 20px", textAlign: "left"}}>
            <div className="Homepage-detail-title">SECURITY STORAGE 3.0</div>
            <div className="Homepage-detail-text">
              - Never lose your data, store for ever.<br/><br/>
              - Protect about the ravages a hacker can make by encrypting your data.<br/><br/>
              - Nobody can modify or delete your data.
            </div>
          </div>
        </div>
      </div>

      <div className="Homepage-detail">
        {/* left */}
        <div className="Homepage-detail-left">
          <div style={{padding: "10px 5px 10px 20px", textAlign: "left"}}>
            <div className="Homepage-detail-title">EASY TO USE</div>
            <div className="Homepage-detail-text">
              - Use it like a hard disk<br/><br/>
              - Organise your datas by creating folders.<br/><br/>
              - Upload any file.<br/><br/>
              - Create links to existing ipfs files.
            </div>
          </div>
        </div>
        {/* right */}
        <div className="Homepage-detail-right">
          <img src={explorerImg} alt="" style={{maxHeight: "500px"}}></img>
        </div>
      </div>

      <div id="footer" className="Homepage" style={{paddingBottom: "50px"}}>
        <button className="App-button Homepage-button" style={{marginRight: "25px"}} onClick={() => loadExplorer()}>Try the Demo</button>
      </div>

    </div>
  );
};

export default Homepage;

