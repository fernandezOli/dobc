import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
//import '../assets/css/modalLoader.css';
import loader from '../../assets/ico/loader.gif';

const ModalLoader = ({ isLoaderShowing, textLoader }) =>
  isLoaderShowing
    ? ReactDOM.createPortal(
        <>
          <div className="modal_overlay modal_overlay_gray">
            <div className="modal_wrapper">
              <div className="modal_loader">
				        <div className="modal_loader_img"><img src={loader} alt="loader.gif" className="img_loader"></img></div>
                <div className="txt_loader"><span>{textLoader}</span></div>
              </div>
            </div>
          </div>
        </>,
        document.body
      )
    : null;

	ModalLoader.propTypes = {
	isLoaderShowing: PropTypes.bool.isRequired,
	textLoader: PropTypes.string.isRequired
};

export default ModalLoader;
