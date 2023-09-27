import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import linkIcon from '../../assets/ico/link48.png';

const ModalUrlFile = ({ isUrlFileShowing, cancelFunc, validFunc, textUrlFile }) => {
	const [inputName, setInputName ] = React.useState("");
	const [inputLink, setInputLink ] = React.useState("");

	if (isUrlFileShowing) return ReactDOM.createPortal(
		<>
		  <div className="modal_overlay">
			<div className="modal_wrapper">
			  <div className="modal_info">
				<div className="modal_header modal_title_new_folder">
				  <div className="modal_title">
				    <img src={linkIcon} alt="" className="modal_title_img"></img>
				  	<span style={{marginLeft: "5px"}}>Create Url File</span>
				  </div>
				</div>
				<div className="modal_body">
					<div>
						<div className="modal_text">
							<div className="modal_text_left">Path:</div>
							<div className="modal_text_right" id="UrlFilePath">{textUrlFile}</div>
						</div>
						<div className="modal_text">
							<div className="modal_text_left">Name:</div>
							<div className="modal_text_right">
								<input className="form-control nftInput"
                        			id="UrlFileName"
                        			placeholder="Name of new file"
									value={inputName}
									onChange={(e) => { setInputName (e.target.value); }}
								/>
							</div>
						</div>
						<div className="modal_text">
							<div className="modal_text_left">Link:</div>
							<div className="modal_text_right">
								<input className="form-control nftInput"
                        			id="UrlFileLink"
                        			placeholder="web3 storage link"
									value={inputLink}
									onChange={(e) => { setInputLink (e.target.value); }}
								/>
							</div>
						</div>
					</div>
					<div className="modal_div_button">
						<button className="App-button" onClick={cancelFunc}>Cancel</button>
						<button className="App-button" onClick={() => {validFunc(textUrlFile, inputName, inputLink);setInputName("");setInputLink("");}} disabled={(inputName.length === 0 || inputLink.length === 0) ? true : ""}>Create</button>
					</div>
				</div>
			  </div>
			</div>
		  </div>
		</>,
		document.body
	)

	ModalUrlFile.propTypes = {
	isUrlFileShowing: PropTypes.bool.isRequired,
	cancelFunc: PropTypes.func.isRequired,
	validFunc: PropTypes.func.isRequired,
	textUrlFile: PropTypes.string.isRequired
	};
}

export default ModalUrlFile;
