import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const ModalNewFolder = ({ isNewFolderShowing, cancelFunc, validFunc, folderPath }) => {
	const [currentInput, setCurrentInput ] = React.useState("");

	if (isNewFolderShowing) return ReactDOM.createPortal(
		<>
		  <div className="modal_overlay">
			<div className="modal_wrapper">
			  <div className="modal_info">
				<div className="modal_header modal_title_new_folder">
				  <div className="modal_title">Create New Folder</div>
				</div>

				<div className="modal_body" style={{display: "flex"}}>
					<div className="modal_text_left">
						<div className="modal_text">Path:</div>
						<div className="modal_text">Name:</div>
					</div>
					<div className="modal_text_right" style={{paddingLeft: "10px"}}>
						<div className="modal_text">{folderPath}</div>
						<div className="modal_text">
							<input className=""
								placeholder="New folder name"
								value={currentInput}
								onChange={(e) => { setCurrentInput (e.target.value); }}
							/>
						</div>
					</div>
				</div>
				<div className="modal_div_button">
					<button className="App-button" onClick={cancelFunc}>Cancel</button>
					<button className="App-button" onClick={() => {validFunc(folderPath,currentInput); setCurrentInput("")}} disabled={currentInput.length === 0 ? true : ""}>Create</button>
				</div>
			  </div>
			</div>
		  </div>
		</>,
		document.body
	)

	ModalNewFolder.propTypes = {
		isNewFolderShowing: PropTypes.bool.isRequired,
		cancelFunc: PropTypes.func.isRequired,
		validFunc: PropTypes.func.isRequired,
		folderPath: PropTypes.string.isRequired
	};
}

export default ModalNewFolder;
