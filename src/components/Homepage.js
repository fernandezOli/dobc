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

      <div className="Homepage-div-title Homepage-detail-title">
        <div style={{ backgroundColor: "aqua" }}>
          Data Access
        </div>
        <div className="Homepage-detail" style={{width: "100%", paddingLeft: "0px", marginTop: "10px"}}>
          <div className="Homepage-detail-four" style={{ marginRight: "10px" }}>
            <div>Explorer</div>
            <div className="Homepage-detail-text-four">With the Explorer, you can access to your data.</div>
          </div>
          <div className="Homepage-detail-four" style={{ marginRight: "10px" }}>
            <div>API</div>
            <div className="Homepage-detail-text-four">With the API, you can access to the data directly just like any other web link.
            You can use it for js, css, pictures, video, ...</div>
            <div className="Homepage-detail-text-four">(comming soon)</div>
          </div>
          <div className="Homepage-detail-four" style={{ marginRight: "10px" }}>
            <div>Classes</div>
            <div className="Homepage-detail-text-four">With the javascript classes, you can access to your disk from your own UI.</div>
            <div className="Homepage-detail-text-four">(comming soon)</div>
          </div>
          <div className="Homepage-detail-four">
            <div>Library</div>
            <div className="Homepage-detail-text-four">With the solidity librairies, you can access to your disk from your own contract.</div>
            <div className="Homepage-detail-text-four">(comming soon)</div>
          </div>
        </div>
      </div>

      <div className="Homepage-div-title Homepage-detail-title">
        <div style={{backgroundColor: "aquamarine"}}>
          Use Cases
        </div>
        <div className="Homepage-detail" style={{width: "100%", paddingLeft: "0px", marginTop: "10px", marginBottom: "20px"}}>
          <div className="Homepage-detail-four" style={{ width: "100%", marginRight: "10px" }}>
            <div className="Homepage-detail-text-four"><b>Web2 to Web3</b></div>
            <div className="Homepage-detail-text-four">
            (web galerie) Avant, il fallait ouvrir un acces ftp a vos utilisateurs pour qu'ils upload leur images, video, texte ou autre.
Et cet acces pouvait etre une source de piratage, d'ou la necessité de faire les mises à jour.<br/>
Il etait aussi de votre responsabilité de gérer les mot de passe et donc de vous conformer a la loi en vigueur dans chaque pays.<br/>
Vous deviez creer un acces a votre disque pour vos utilisateurs afin qu'il puisse uploader leurs fichiers.<br/>
<br/>
<u>Il vous fallait :</u><br/>
- un serveur pour votre site web<br/>
- acces a votre disque par page html d'upload, ftp, ...<br/>
- gros disque sécurisé pour le stokage de tous les fichiers de tous vos utilisateurs.<br/>
- base de données utilisateurs (user/password)<br/>
- access management (ajout, suppression d'utilisateur, ...) et popup de login avec password lost.<br/>
<br/>
<br/>
Avec le Web3, <b>oubliez tout cela</b>.<br/>
Vos utilisateurs ouvrent leur disque auquel seul eux peuvent avoir acces.<br/>
Il vous donne l'adresse de leur disque ainsi le dossier des fichiers.<br/>
Vous n'avez plus qu'a lire le dossier pour obtenir les liens ipfs et les afficher (like before)<br/><br/>
<u>Il vous faut :</u><br/>
- un serveur pour votre site web.<br/>
- ajouter les classes javascript a votre site web.<br/>
<b>Et c'est tout.</b><br/>
<br/>
- les utilisateurs n'ont plus acces a votre disque<br/>
- no access management (user/password) : l'acces se fait par le wallet de l'utilisateur sur son propre disk on chain.<br/>
- no disk (les données sont sur leur disque on chain et ipfs)<br/>
<br/>
<b>More secure, less work !</b><br/><br/></div>
          </div>
        </div>

      <div className="Homepage-detail" style={{width: "100%", paddingLeft: "0px", marginTop: "0px"}}>
          <div className="Homepage-detail-four" style={{ width: "100%", marginRight: "10px" }}>
            <div className="Homepage-detail-text-four"><b>Access from contract</b></div>
            <div className="Homepage-detail-text-four">
            Ajouter les librairies solidity a votre DAO.<br/>
            Creez un disque puis changez l'ownership par l'adresse de votre DAO. Votre DAO sera alors le seul a pouvoir ecrire sur le disque.<br/>
            Creez les dossiers que vous désirez depuis votre DAO.<br/>
            Télécharger sur ipfs les fichiers que vous voulez ajouter à votre disque.<br/>
            Creez le lien ipfs du fichier sur votre disque depuis votre DAO.<br/><br/>
            Tout ajout (creation de dossier, ajout de lien ipfs) sera lié a un vote.<br/>
            </div>
          </div>
      </div>
    </div>

      <div id="footer" className="Homepage" style={{paddingBottom: "50px"}}>
        <button className="App-button Homepage-button" style={{marginRight: "25px"}} onClick={() => loadExplorer()}>Try the Demo</button>
      </div>

    </div>
  );
};

export default Homepage;

