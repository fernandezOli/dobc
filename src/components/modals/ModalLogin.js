import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import LoginButton from "./loginButton";

const ModalLogin = ({ isLoginShowing }) =>
isLoginShowing
	? ReactDOM.createPortal(
		<>
		  <div className="modal_overlay">
			<div className="modal_wrapper">
			  <div className="modal_info">
				<div className="modal_header modal_levelSUCCESS">
				  <div className="modal_title">Login</div>
				</div>
				<div className="modal_body">
					<p>Login for use your disk or create one</p>
					<div className="modal_div_button">
						<LoginButton />
					</div>
				</div>
			  </div>
			</div>
		  </div>
		</>,
		document.body
	  )
	: null;

	ModalLogin.propTypes = {
	isLoginShowing: PropTypes.bool.isRequired,
	hideLogin: PropTypes.func.isRequired
};

export default ModalLogin;
