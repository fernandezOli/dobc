import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import uploadIcon from '../../assets/ico/upload48.png';

import { formatSize } from '../Tools';

const ModalUpload = ({ isUploadShowing, cancelFunc, validFunc, pathUpload, maxBlocSize }) => {
	const [inputName, setInputName ] = React.useState("");
	const [fileSize, setFileSize ] = React.useState(0);
	const [filePointer, setFilePointer ] = React.useState(null);
	//const [inputLink, setInputLink ] = React.useState("");
	const [pinataApiKey, setPinataApiKey ] = React.useState("");
	const [pinataSecretApiKey, setPinataSecretApiKey ] = React.useState("");

	function loadKey(e) {
		const file = e.target.files[0];
		//console.log('loadKey: ', e.target.files[0]);
		setFilePointer(file);
		setInputName(file.name);
		//console.log('loadKey: ', file.size);
		setFileSize(file.size);
	}

	function validCallback() {
		validFunc(filePointer, pathUpload, inputName, document.getElementById('onchain').checked, pinataApiKey, pinataSecretApiKey);
		//setFilePointer(file);
		setInputName("");
	}
	/*
	const reset = async() => {
		setFilePointer(null);
		setInputName("");
		setFileSize(0);

	}
	/*
	function init() {
		if(filePointer !== null) return;
		if(inputName !== "") setInputName("");
		if(fileSize !== 0) setFileSize(0);
	}
	*/
	if (isUploadShowing) return ReactDOM.createPortal(
		<>
		  <div className="modal_overlay">
			<div className="modal_wrapper">
			  <div className="modal_info">
				<div className="modal_header modal_title_new_folder">
				  <div className="modal_title">
				  	<img src={uploadIcon} alt="" className="modal_title_img"></img>
				  	<span style={{marginLeft: "5px"}}>Upload File</span>
				  </div>
				</div>
				<div className="modal_body">
					<div>
						<div className="modal_text">
						<input type="file" onChange={(e) => { loadKey(e); }}/>
						</div>
						<div className="modal_text">
							<div className="modal_text_left">Path:</div>
							<div className="modal_text_right" id="UploadPath">{pathUpload}</div>
						</div>
						<div className="modal_text">
							<div className="modal_text_left">Name:</div>
							<div className="modal_text_right">
								<input className=""
                        			id="UploadName"
                        			placeholder="File name"
									value={inputName}
									onChange={(e) => { setInputName (e.target.value); }}
									style={{width: "100%"}}
								/>
							</div>
						</div>
						<div className="modal_text">
							<div className="modal_text_left">Size:</div>
							<div className="modal_text_right">{fileSize !==0 ? formatSize(fileSize): ""}</div>
						</div>
						<div className="modal_text">
							<div className="modal_text_left">Storage:</div>
						</div>
						<div className="modal_text modal_upload_storage">
							<div style={{marginBottom: "5px"}}>
								<input type="radio" id="onchain" name="storage" value="0" defaultChecked={(fileSize < maxBlocSize) ? true : false}  disabled={(fileSize < maxBlocSize) ? false : true}/>
								<label className={(fileSize < maxBlocSize) ? "" : "modal_upload_label_disabled"} htmlFor="onchain"> On blockchain</label>
								<div className={(fileSize < maxBlocSize) ? "" : "modal_upload_div_none"}>
									<span style={{marginLeft: "30px"}}>Cost</span>
								</div>
							</div>
							<div style={{marginBottom: "5px"}}>
								<input type="radio" id="onipfs" name="storage" value="1" defaultChecked={(fileSize < maxBlocSize) ? false : true}  disabled={(fileSize < 100) ? true : false}/>
								<label className={(fileSize < 100) ? "modal_upload_label_disabled" : ""} htmlFor="onipfs"> On ipfs (with pinata)</label>
								<div className={(fileSize < 100) ? "modal_upload_div_none" : ""}>
									<div><span style={{marginLeft: "30px"}}>Pinata api key:</span>
										<div><input className="modal_upload_input_key"
											id="PinataKey"
											placeholder="Your pinata api key"
											value={pinataApiKey}
											onChange={(e) => { setPinataApiKey(e.target.value); }}
										/></div>
									</div>
									<div><span style={{marginLeft: "30px"}}>Pinata secret key:</span>
										<div><input className="modal_upload_input_key"
											id="PinataSecretKey"
											placeholder="Your pinata secret key"
											value={pinataSecretApiKey}
											onChange={(e) => { setPinataSecretApiKey(e.target.value); }}
										/></div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="modal_div_button">
						<button className="App-button" onClick={() => {cancelFunc(); setInputName("");}}>Cancel</button>
						<button className="App-button" onClick={validCallback} disabled={(inputName.length === 0) ? true : ""}>Upload</button>
					</div>
				</div>
			  </div>
			</div>
		  </div>
		</>,
		document.body
	)

	ModalUpload.propTypes = {
	isUploadShowing: PropTypes.bool.isRequired,
	cancelFunc: PropTypes.func.isRequired,
	validFunc: PropTypes.func.isRequired,
	pathUpload: PropTypes.string.isRequired
	};
}

export default ModalUpload;
