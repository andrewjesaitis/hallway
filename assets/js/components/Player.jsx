import React, { PropTypes } from 'react';
import { Modal } from 'react-bootstrap';

function Player({ show, handleClose, handleEnded, handleError, handlePrevious, handleNext, src, subject }) {
  return (
    <Modal show={show}>
      <Modal.Body>
        <div className="row">
          <div className="col-sm-10 player-title">
            <h3>{subject}</h3>
          </div>
          <div className="col-sm-2">
            <button type="button" className="close pull-right" aria-label="Close" onClick={handleClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
        <div className="row player text-center">
          <div className="col-sm-1 nav-arrow">
            <a onClick={handlePrevious}>
              <i className="material-icons md-48">keyboard_arrow_left</i>
            </a>
          </div>
          <div className="col-sm-10 embed-responsive embed-responsive-16by9">
            <video
              className="embed-responsive-item"
              autoPlay
              controls
              src={src}
              onEnded={handleEnded}
              onError={handleError}
            />
          </div>
          <div className="col-sm-1 nav-arrow">
            <a onClick={handleNext}>
              <i className="material-icons md-48">keyboard_arrow_right</i>
            </a>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <p />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

Player.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleEnded: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired,
  src: PropTypes.string,
  subject: PropTypes.string.isRequired,
};

export default Player;
