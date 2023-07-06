/* eslint-disable react-hooks/exhaustive-deps */
import { React, useState, useEffect } from 'react';
import { ethers } from 'ethers';
//import { useNavigate } from "react-router-dom";
import { Axios } from "axios";
import { useAccount, useSigner, useDisconnect/*, useProvider*/ } from 'wagmi';

import { NETWORK_ID_SYMBOL, REGISTRY_ADDR } from '../config/config'
import { truncAddress/*, amountCent/*, sleep*/ } from './Tools';

import DiskTreeView from "./DiskTreeView";
import disk from "../class/diskClass";
import diskRegistry from "../class/diskRegistryClass";

import UseModalLoader from "./modals/UseModalLoader";
import ModalLoader from "./modals/ModalLoader";
import useModalInfo from "./modals/UseModalInfo";
import ModalInfo from "./modals/ModalInfo";

import useModalLogin from "./modals/UseModalLogin";
import ModalLogin from "./modals/ModalLogin";

import useModalCreate from "./modals/UseModalCreate";
import ModalCreate from "./modals/ModalCreate";

import useModalNewFolder from "./modals/UseModalNewFolder";
import ModalNewFolder from "./modals/ModalNewFolder";

import useModalUrlFile from "./modals/UseModalUrlFile";
import ModalUrlFile from "./modals/ModalUrlFile";

import useModalUpload from "./modals/UseModalUpload";
import ModalUpload from "./modals/ModalUpload";

import useModalProperties from "./modals/UseModalProperties";
import ModalProperties from "./modals/ModalProperties";

import useModalDiskProperties from "./modals/UseModalDiskProperties";
import ModalDiskProperties from "./modals/ModalDiskProperties";

import folderIcon from '../assets/ico/folder48.png';
import fileIcon from '../assets/ico/file48.png';
import addFolderIcon from '../assets/ico/addFolder48.png';
import uploadIcon from '../assets/ico/upload48.png';
import downloadIcon from '../assets/ico/download48.png';
import propertiesIcon from '../assets/ico/properties48.png';
import refreshIcon from '../assets/ico/refresh48.png';
import linkIcon from '../assets/ico/link48.png';
import logoutIcon from '../assets/ico/logout48.png';
import diskIcon from '../assets/ico/disk48.png';

import '../assets/css/global.css';
import '../assets/css/Explorer.css';
import '../assets/css/modalLoader.css';

let loaderShowed = false;
let diskRegistryClass = null;
let diskClass = null;

const Explorer = () => {
  const [addressDisk, setAddressDisk] = useState(null);
  //const [addressOwner, setAddressOwner] = useState(null);
  const [balanceOwner, setBalanceOwner] = useState(0);
  const [fileList, setFileList] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [treeSelectedItem, setTreeSelectedItem] = useState(1);
  const [addFolderItem, setAddFolderItem] = useState(null);

  const contentType = ["unknown", "folder", "binary file", "url file"];

  //const navigate = useNavigate();
  const { disconnect } = useDisconnect();
  //return <button onClick={disconnect}>Disconnect</button>;
  const { address/*, isConnecting, isDisconnected*/ } = useAccount();
  const { data: signer/*, isError, isLoading*/ } = useSigner()
  //const _provider = useProvider();


  const { textLoader: textModalLoader, changeTextLoader: textLoaderChange } = UseModalLoader();
	const [loaderState, setLoaderState] = useState(false);
	const { isInfoShowing: isInfoShowed, toggleInfo: toggleModalInfo, titleInfo: titleModalInfo, changeInfoTitle: titleInfoChange, textInfo: textModalInfo, changeInfoText: textInfoChange, levelInfo: levelModalInfo, changeInfoLevel: levelInfoChange } = useModalInfo();

  const { isLoginShowing: isLoginShowed, toggleLogin: toggleModalLogin  } = useModalLogin();
  const { isCreateShowing: isCreateShowed, toggleCreate: toggleModalCreate  } = useModalCreate();

  const { isNewFolderShowing: isNewFolderShowed, toggleNewFolder: toggleModalNewFolder, textNewFolder: textModalNewFolder, changeNewFolderText: textNewFolderChange } = useModalNewFolder();
	const { isUrlFileShowing: isUrlFileShowed, toggleUrlFile: toggleModalUrlFile, textUrlFile: textModalUrlFile, changeUrlFileText: textUrlFileChange } = useModalUrlFile();

	const { isUploadShowing: isUploadShowed, toggleUpload: toggleModalUpload, pathUpload: pathModalUpload, changeUploadPath: uploadPathChange } = useModalUpload();

  const { isPropertiesShowing: isPropertiesShowed,
    toggleProperties: toggleModalProperties,
    pathProperties: textPathProperties,
    changePathProperties: pathPropertiesChange,
    nameProperties: textNameProperties,
    changeNameProperties: namePropertiesChange,
    typeProperties: textTypeProperties,
    changeTypeProperties: typePropertiesChange,
    dateProperties: textDateProperties,
    changeDateProperties: datePropertiesChange,
    dataTextProperties: textDataTextProperties,
    changeDataTextProperties: dataTextPropertiesChange,
    dataBinProperties: textDataBinProperties,
    changeDataBinProperties: dataBinPropertiesChange
  } = useModalProperties();

  const { isDiskPropertiesShowing: isDiskPropertiesShowed,
    toggleDiskProperties: toggleModalDiskProperties,
    addressDiskProperties: textAddressDiskProperties,
    changeAddressDiskProperties: addressDiskPropertiesChange,
    ownerDiskProperties: textOwnerDiskProperties,
    changeOwnerDiskProperties: ownerDiskPropertiesChange,
    versionDiskProperties: textVersionDiskProperties,
    changeVersionDiskProperties: versionDiskPropertiesChange,
    immutableDiskProperties: textImmutableDiskProperties,
    changeImmutableDiskProperties: immutableDiskPropertiesChange,
    blocSizeDiskProperties: valueBlocSizeDiskProperties,
    changeBlocSizeDiskProperties: blocSizeDiskPropertiesChange
  } = useModalDiskProperties();

  useEffect(() => {
    const checkUser = async () => {
      try {
        if(address === undefined) return;
        //if(address === null) return;
        //if(address === addressOwner) return;
        //console.log("[checkExplorer] address: ", address);
        if(signer === undefined) return;
        //console.log("[checkExplorer] signer: ", signer);

        if (isLoginShowed) toggleModalLogin();
        const value = await signer.provider.getBalance(address);
        setBalanceOwner(ethers.utils.formatEther(value));

        diskRegistryClass = new diskRegistry(REGISTRY_ADDR, signer);
        loadDisk();
      } catch (error) {
        console.error(error);
      }
    };
    checkUser();
  }, [address, signer]);

  const loadDisk = async () => {
    const haveDisk = await diskRegistryClass.diskExist(address);
    console.log("[checkExplorer] haveDisk: ", haveDisk)
    if(!haveDisk) {
      toggleModalCreate();
      return;
    }

    const userDisk = await diskRegistryClass.getDisk(address);
    if(userDisk === null) return;
    //console.log("[checkExplorer] addressDisk: ", userDisk);
    setAddressDisk(userDisk);

    diskClass = new disk(userDisk, signer, signer.provider);
    loadDiskProperties();
    // on open disk : load '/'
    refreshList('/');
  }

  const loadDiskProperties = async () => {
    let diskResult = await diskClass.getVersion();
    versionDiskPropertiesChange(diskResult);
    diskResult = await diskClass.getImmutable();
    immutableDiskPropertiesChange(diskResult.toString());
    diskResult = await diskClass.getBlocSize();
    blocSizeDiskPropertiesChange(diskResult);
  }


  //**** Modal ****

  //showLoader(true, "Transaction pending, Please wait ...");
	//showLoader(false, "");
	const showLoader = async (view, text) => {
		textLoaderChange(text);
		if (view !== loaderShowed) {
			setLoaderState(view);
			loaderShowed = !loaderShowed;
		}
	}

  function loaderStart(text) {
    showLoader(true, text);
  }

  function loaderStop() {
    showLoader(false, "");
  }

	const showInfoModal = async (level, titre, text) => {
		//console.log("showInfoModal: " + titre);
		titleInfoChange(titre);
		textInfoChange(text);
		levelInfoChange(level);
		toggleModalInfo();
	}

	const showNewFolderModal = async (text) => {
		//console.log("showNewFolderModal: " + text);
		textNewFolderChange(text);
		toggleModalNewFolder();
	}

	const showUrlFileModal = async (text) => {
		//console.log("showUrlFileModal: " + text);
		textUrlFileChange(text);
		toggleModalUrlFile();
	}

	const showUploadModal = async (path) => {
		//console.log("showUploadModal: " + path);
		uploadPathChange(path);
		toggleModalUpload();
	}

	const showDiskPropertiesModal = async () => {
		//console.log("showDiskPropertiesModal");
    addressDiskPropertiesChange(addressDisk);
		ownerDiskPropertiesChange(address);
		toggleModalDiskProperties();
	}

	const showPropertiesModal = async () => {
		//console.log("showPropertiesModal");
    const element = selectedElement.id.substr(3);
    const fileEntry = fileList[element];
    pathPropertiesChange("/");
    namePropertiesChange(fileEntry.name);
    typePropertiesChange(contentType[parseInt(fileEntry.content_type._hex)]);
    datePropertiesChange((new Date((parseInt(fileEntry.creation_date._hex) * 1000))).toLocaleString());
    if (parseInt(fileEntry.content_type._hex) > 1) {
      const dataFile = await diskClass.readFile("/" + fileEntry.name);
      //console.log("[showPropertiesModal] data Bin: ", dataFile);
      //console.log("[showPropertiesModal] data UTF: ", ethers.utils.toUtf8String(dataFile));
      dataTextPropertiesChange(ethers.utils.toUtf8String(dataFile));
      dataBinPropertiesChange(dataFile.substr(2));
    } else {
      dataTextPropertiesChange("");
      dataBinPropertiesChange("");
    }
    toggleModalProperties();
	}

  //**** Buttons ****
  /*
  async function btnDisconnect() {
    console.log('-- btnDisconnect --');
    //await authInfos._connectWallet();
    navigate("/", { replace: true });
  }
  */

  /* create disk callback */
  async function createDisk() {
    console.log('-- createDisk --');
    const userDisk = await diskRegistryClass.diskCreate();
    if(userDisk === null) {
      showInfoModal("ERROR", "ERROR", 'Creation Disk error. Reload please !');
      return;
    }
    const haveDisk = await diskRegistryClass.diskExist(address);
    if(!haveDisk) {
      showInfoModal("ERROR", "ERROR", 'Creation Disk error, disk not exist. Reload please !');
      return;
    }
    loadDisk();
  }

  async function btnNewFolder() {
    //console.log('-- btnNewFolder --');
    showNewFolderModal('/');
  }

  /* new folder callback */
  async function newFolderCallback(folderPath,folderName) {
    console.log('-- createNewFolder --');

    let diskResult;
    console.log('folderPath: ', folderPath);
    console.log('folderName: ', folderName);
		toggleModalNewFolder();
    if (folderPath === "") return;
    if (folderName === "") return;

    diskResult = await diskClass.getOwner();
    if (diskResult.toLowerCase() !== address.toLowerCase()) {
      showInfoModal("ERROR", "ERROR", 'You are not the owner !');
      return;
    }

    // check name not containt '/'
    let pathName = folderPath + "/" + folderName;
    if (folderPath === "/") pathName = folderPath + folderName;
    console.log('create Folder: ', pathName);
    diskResult = await diskClass.existDir(pathName);
    if (diskResult === null) {
      showInfoModal("ERROR", "ERROR", 'Folder test existence error !');
      return;
    }
    if (diskResult) {
      showInfoModal("WARNING", "WARNING", 'Folder already exist !');
      return;
    }

    // create folder
    loaderStart("Waiting transaction, Please wait ...");
    diskResult = await diskClass.createDir(folderPath, folderName);
    if (diskResult === false) {
      loaderStop();
      showInfoModal("ERROR", "ERROR", 'Create folder error !');
      return;
    }

    loaderStart("Verifying, Please wait ...");
    diskResult = await diskClass.existDir(pathName);
    loaderStop();
    if (diskResult === null) {
      showInfoModal("ERROR", "ERROR", 'Folder test existence error !');
      return;
    }
    if (!diskResult) {
      showInfoModal("ERROR", "ERROR", 'Folder not created !');
      return;
    }
    //console.log("createDir successfull !!");
    refreshList(folderPath);

    setAddFolderItem({id: treeSelectedItem, newName: folderName});
    showInfoModal("SUCCESS", "SUCCESS", 'Folder created succefully');
  }

  async function btnUrlFile() {
    //console.log('-- btnUrlFile --');
    showUrlFileModal('/');
  }

  /* url file callback */
  async function UrlFileCallback() {
    console.log('-- UrlFileCallback --');
    const path = document.getElementById('UrlFilePath').innerText;
    const name = document.getElementById('UrlFileName').value;
    const linkData = document.getElementById('UrlFileLink').value;
    //console.log('path: ', path);
    //console.log('name: ', name);
    //console.log('link: ', linkData);
		toggleModalUrlFile();
    if (path === "") return;
    if (name === "") return;
    if (linkData === "") return;
    const result = await sendDataToBlockchain(path, name, "attributs", linkData, 1);
    if (result) {
      refreshList(path);
      showInfoModal("SUCCESS", "SUCCESS", 'Url file created succefully');
    }

  }

  async function btnDownload() {
    //console.log('-- btnDownload --');
    if(selectedElement === null) return;
    const element = selectedElement.id.substr(3);
    const fileEntry = fileList[element];
    try {
      const dataFile = await diskClass.readFile("/" + fileEntry.name);
      //if url => ethers.utils.toUtf8String(dataFile)
			var blob = new Blob([ethers.utils.toUtf8String(dataFile)], { type: 'application/octet-binary' });
			let url = window.URL.createObjectURL(blob);
			let a = document.getElementById("downloadLink");
			a.href = url;
			a.download = fileEntry.name;
			a.click();
			window.URL.revokeObjectURL(url);
			//console.log('Download successfull');

    } catch(error) {
      console.error('[btnDownload] error: ', error);
    }
  }

  async function btnUpload() {
    //console.log('-- btnUpload --');
    showUploadModal('/');
  }

  /* Cancel Upload callback */
  async function UploadCallbackCancel() {
    console.log('-- UploadCallbackCancel --');
    //document.getElementById('UploadPath').innerText = "";
    document.getElementById('UploadName').value = "";
    //ModalUpload.reset();
    toggleModalUpload();
  }

  /* Upload callback */
  async function UploadCallback(fileUploadPointer) {
    //console.log('-- UploadCallback --');
    //console.log('UploadCallback: ', fileUploadPointer);
    const path = document.getElementById('UploadPath').innerText;
    const name = document.getElementById('UploadName').value;
    const storage = document.getElementById('onchain').checked;
    //console.log('UploadCallback: ', storage);
    const pinataKey = document.getElementById('PinataKey').value;
    const pinataSecretKey = document.getElementById('PinataSecretKey').value;
    toggleModalUpload();
    if (path === "") return;
    if (name === "") return;
    //if (name !== "") return;

    if (!storage) {
      console.log('store on ipfs');
      if (pinataKey === "" || pinataSecretKey === "") {
        showInfoModal("ERROR", "ERROR", 'You need to have api key and secret key to use Pinata.');
        return;
      }
      try {
        // waiting...
        //https://dev.to/fidalmathew/send-files-to-ipfs-using-pinata-api-in-reactjs-3c3
        const ipfsCID = await uploadToIpfs(path, name, pinataKey, pinataSecretKey);
        if (ipfsCID === null) {
          showInfoModal("ERROR", "ERROR", 'Error sending File to IPFS');
          return;
        }
        //https://ipfs.io/ipfs/QmcfHNjvpjXLBjEnbj985RvT9zCYkdYS4djBr9V6h7TP6i
        /*
        const result = await sendDataToBlockchain(path, name, "attributs", authInfos.IPFS_HEADER + ipfsCID, 1);
        if (result) {
          refreshList(path);
          showInfoModal("SUCCESS", "SUCCESS", 'File uploaded succefully');
        }
        showInfoModal("ERROR", "ERROR", 'Error sending data to blockchain !');
        return;
        */
        return;
      }
      catch (e) {
        console.error('[ERROR] upload file error: ', e);
        showInfoModal("ERROR", "ERROR", 'upload file error !');
        return;
      }
    }

    const reader = new FileReader();
    //reader.readAsText(fileUploadPointer, 'UTF-8');
    reader.readAsArrayBuffer(fileUploadPointer);
    reader.onload = async readerEvent => {
      try {
        const content = readerEvent.target.result;
        //document.getElementById("signature").value = window.atob(content);
        //console.log('UploadCallback: ', content); //ArrayBuffer
        //console.log('UploadCallback: ', new Uint8Array(content)); //ArrayBuffer to bytes
        if (content.byteLength === 0) {
          showInfoModal("ERROR", "ERROR", 'Empty file !');
          return;
        }
        // envoi
        const result = await sendDataToBlockchain(path, name, "attributs", content, 0);
        if (result) {
          refreshList(path);
          showInfoModal("SUCCESS", "SUCCESS", 'File created succefully');
          return;
        }
        showInfoModal("ERROR", "ERROR", 'upload file error !');
        return;
      }
      catch (e) {
        console.error('[ERROR] upload file error: ', e);
        showInfoModal("ERROR", "ERROR", 'upload file error !');
        return;
      }
    }
  }

  async function uploadToIpfs(path, name, pinataKey, pinataSecretKey) {
    if (path === "" || name === "" || pinataKey === "" || pinataSecretKey === "") {
      console.error("Error sending File to IPFS: Invalid param")
      return null;
    }
    let pathName = path + "/" + name;
    if (path === "/") pathName = path + name;
    pathName = pathName.replace(/\//g, "_").substring(1);
    console.log('Ipfs name: ',pathName);
    if (pathName !== "") return null;

    try {
      const formData = new FormData();
      formData.append("file", pathName);
      const resFile = await Axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          'pinata_api_key': pinataKey,
          'pinata_secret_api_key': pinataSecretKey,
          "Content-Type": "multipart/form-data"
        },
      });
      console.log('CID: ',resFile.data.IpfsHash);
      return resFile.data.IpfsHash;
    } catch (error) {
      console.error("Error sending File to IPFS: ", error)
      return null;
    }
  }

  async function btnProperties() {
    //console.log('-- btnProperties --');
    if(selectedElement === null) return;
    showPropertiesModal();
  }

  async function btnDiskProperties() {
    //console.log('-- btnDiskProperties --');
    showDiskPropertiesModal();
  }

  async function btnRefresh() {
    //console.log('-- btnRefresh --');
    let path = "/";
    refreshList(path);
  }

  //**** functions ****
  async function treeSelectItem(id, path) {
    console.log('[treeSelectItem] id: ', id);
    setTreeSelectedItem(id);
    refreshList(path);
  }


  async function refreshList(path) {
    //console.log('refreshList');
    let diskResult = await diskClass.longListDir(path);
    setFileList([...diskResult].sort(sortFunction));
  }

	function sortFunction(a, b) {
		if (parseInt(a.content_type._hex) === 1) { // a = folder
      if (parseInt(b.content_type._hex) !== 1) return -1;
			return a.name.localeCompare(b.name);
		}
    // a = file
    if (parseInt(b.content_type._hex) === 1) return 1;
		return a.name.localeCompare(b.name);
	}

  async function loadFolderList(lastEntry, parentId, path) {
    console.log('-- loadFolderList --');
    console.log('path: ',path);
    let diskResult = await diskClass.longListDir(path);
    diskResult = [...diskResult].sort(sortFunction);
    //console.log('diskResult: ', diskResult);
    if(diskResult.lentgh) return null;
    let folderList = [];
    for(let i = 0; i < diskResult.length; i++) {
      folderList.push({
        name: diskResult[i].name,
        children: [],
        id: lastEntry++,
        parent: parentId,
        isBranch: true,
      });
    }
    return folderList;
  }

	function tableListSelectItem(e) {
    e.preventDefault();
    e.stopPropagation();
    if(selectedElement !== null) selectedElement.className = 'Explorer-list-tr';
    e.target.parentElement.className = 'Explorer-list-tr-selected';
    setSelectedElement(e.target.parentElement);
	}

	function outsideSelectItem(e) {
    e.preventDefault();
    e.stopPropagation();
    if(selectedElement !== null) selectedElement.className = 'Explorer-list-tr';
    setSelectedElement(null);
	}

  /* send data file to blockchain */
  // type : 0 = binary, 1 = url
  async function sendDataToBlockchain(path, name, attributs, data, type) {
    console.log('-- sendDataToBlockchain --');

    let diskResult;
    if (path === "") return false;
    if (name === "") return false;
    if (data === "") return false;
    if (type > 1) return false;


    // check name not containt '/'
    // check file not already exist
    let pathName = path + "/" + name;
    if (path === "/") pathName = path + name;
    console.log('create File: ', pathName);
    diskResult = await diskClass.existFile(pathName);
    if (diskResult === null) {
      showInfoModal("ERROR", "ERROR", 'File test existence error !');
      return false;
    }
    if (diskResult) {
      showInfoModal("ERROR", "ERROR", 'File already exist !');
      return false;
    }

    // create file
    loaderStart("Waiting transaction, Please wait ...");
    //diskResult = await diskClass.createFile(path, name, attributs, type, data);
    diskResult = await diskClass.createFileBinary(path, name, attributs, data);
    //diskResult = await diskClass.createFileUrl(path, name, attributs, data);
    if (diskResult === false) {
      loaderStop();
      showInfoModal("ERROR", "ERROR", 'Create file error !');
      return false;
    }

    loaderStart("Verifying, Please wait ...");
    diskResult = await diskClass.existFile(pathName);
    loaderStop();
    if (diskResult === null) {
      showInfoModal("ERROR", "ERROR", 'file test existence error !');
      return false;
    }
    if (!diskResult) {
      showInfoModal("ERROR", "ERROR", 'file not created !');
      return false;
    }
    return true;
  }



  return (
    <div className="App Explorer">
      <header className="Explorer-header">
        <div><span>Immutable Decentralized Disk Storage - Explorer</span></div>
        <div style={{ width: "100%" }}></div>
        <div className="Explorer-header-userData">
          <span style={{ marginRight: "15px" }}>{truncAddress(address, 6, 4, '....')}</span>
          <span>[{balanceOwner} {NETWORK_ID_SYMBOL}]</span>
        </div>
      </header>

      <div className="Explorer-menu">
        <div className="Explorer-menu-button" onClick={() => btnNewFolder()}><img src={addFolderIcon} alt="" className="Explorer-menu-icon"></img><span>New folder</span></div>
        <div className="Explorer-menu-button" onClick={() => btnUrlFile()}><img src={linkIcon} alt="" className="Explorer-menu-icon"></img><span>New url file</span></div>
        <div className="Explorer-menu-button" onClick={() => btnUpload()}><img src={uploadIcon} alt="" className="Explorer-menu-icon"></img><span>Upload</span></div>
        <div className="Explorer-menu-button" onClick={() => btnDownload()} disabled={selectedElement === null ? true : ""}><img src={downloadIcon} alt="" className="Explorer-menu-icon"></img><span>Download</span></div>
        <div className="Explorer-menu-button" onClick={() => btnProperties()} disabled={selectedElement === null ? true : ""}><img src={propertiesIcon} alt="" className="Explorer-menu-icon"></img><span>Properties</span></div>
        <div className="Explorer-menu-button" onClick={() => btnRefresh()}><img src={refreshIcon} alt="" className="Explorer-menu-icon"></img><span>Refresh</span></div>
        <div className="Explorer-menu-textDir"><img src={folderIcon} alt="" style={{ marginRight: "5px", height: "16px" }}></img><span id="menuPath">IDDS: {'>'} /</span></div>
        <div className="Explorer-menu-button" onClick={() => btnDiskProperties()} style={{ padding: "0px", marginLeft: "5px" }}><img src={diskIcon} style={{ marginLeft: "5px" }} alt="Disk properties" title="Disk properties" className="Explorer-menu-icon"></img></div>
        <div className="Explorer-menu-button" onClick={() => disconnect}><img src={logoutIcon} alt="" className="Explorer-menu-icon"></img><span>Logout</span></div>
      </div>

      <div id="view" className="Explorer-view">
        <div id="tree" className="Explorer-tree">
          <DiskTreeView loadData={loadFolderList} onTreeSelectItem={treeSelectItem} addFolder={addFolderItem}/>
        </div>

        <div id="list" className="Explorer-list" onClick={(e) => outsideSelectItem(e)}>
          <table id="tableList" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th style={{width: "60%"}}>Name</th>
                <th style={{width: "20%"}}>Date</th>
                <th style={{width: "20%"}}>Type</th>
              </tr>
            </thead>
            <tbody>
              {fileList !== null && fileList.length !== 0 && [...fileList].map((fileEntry, index) => (
                <tr id={`tr_${index}`} className="Explorer-list-tr" key={index} onClick={(e) => {tableListSelectItem(e)}}>
                  <td className="Explorer-list-td Explorer-list-td-name"><img src={parseInt(fileEntry.content_type._hex) === 1 ? folderIcon: fileIcon} alt="" style={{marginRight: "5px", height: "16px"}}></img>{fileEntry.name}</td>
                  <td className="Explorer-list-td">{(new Date((parseInt(fileEntry.creation_date._hex) * 1000))).toLocaleString()}</td>
                  <td className="Explorer-list-td">{contentType[parseInt(fileEntry.content_type._hex)]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {(fileList === null || fileList.length === 0) && <div className="Explorer-noFolder">Empty folder</div>}
        </div>
      </div>
      <div id="statusBar" className="Explorer-statusBar">Disk address: {truncAddress(addressDisk, 6, 4, '....')}</div>

			{/* loader */}
			<ModalLoader isLoaderShowing={loaderState} textLoader={textModalLoader}></ModalLoader>
			{/* info */}
      <ModalInfo isInfoShowing={isInfoShowed} hideInfo={toggleModalInfo} titleInfo={titleModalInfo} textInfo={textModalInfo} levelInfo={levelModalInfo}></ModalInfo>
			{/* login */}
      <ModalLogin isLoginShowing={isLoginShowed} hideLogin={toggleModalLogin} ></ModalLogin>
			{/* Create */}
      <ModalCreate isCreateShowing={isCreateShowed} hideCreate={toggleModalCreate} validFunc={createDisk} ></ModalCreate>

			{/* new Folder */}
      <ModalNewFolder id="ModalNewFolder" isNewFolderShowing={isNewFolderShowed} cancelFunc={toggleModalNewFolder} validFunc={newFolderCallback} folderPath={textModalNewFolder}></ModalNewFolder>

			{/* new Url File */}
      <ModalUrlFile id="ModalUrlFile" isUrlFileShowing={isUrlFileShowed} cancelFunc={toggleModalUrlFile} validFunc={UrlFileCallback} textUrlFile={textModalUrlFile}></ModalUrlFile>

			{/* upload File */}
      <ModalUpload id="ModalUpload" isUploadShowing={isUploadShowed} cancelFunc={UploadCallbackCancel} validFunc={UploadCallback} pathUpload={pathModalUpload} maxBlocSize={valueBlocSizeDiskProperties}></ModalUpload>

			{/* Properties */}
      <ModalProperties isPropertiesShowing={isPropertiesShowed} hideProperties={toggleModalProperties}
        pathProperties={textPathProperties} nameProperties={textNameProperties}
        typeProperties={textTypeProperties} dateProperties={textDateProperties}
        dataTextProperties={textDataTextProperties} dataBinProperties={textDataBinProperties}
      >
      </ModalProperties>

			{/* DiskProperties */}
      <ModalDiskProperties isDiskPropertiesShowing={isDiskPropertiesShowed} hideDiskProperties={toggleModalDiskProperties}
        addressDiskProperties={textAddressDiskProperties} ownerDiskProperties={textOwnerDiskProperties}
        versionDiskProperties={textVersionDiskProperties} immutableDiskProperties={textImmutableDiskProperties}
        blocSizeDiskProperties={valueBlocSizeDiskProperties}
      >
      </ModalDiskProperties>
      <a id="downloadLink" style={{display: "none"}} href="http://">Download</a>
    </div>
  );
};

export default Explorer;
