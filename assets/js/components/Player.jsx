import React, { PropTypes } from 'react';
import { Modal } from 'react-bootstrap';

function Player({ show, handleClose, handleEnded, handleError, handlePrevious, handleNext, src, width, height }) {
  console.log("rendering Player", src);
  return (
    <Modal show={show}>
      <Modal.Header>
        <button type="button" className="close" aria-label="Close" onClick={handleClose}>
          <span aria-hidden="true">&times;</span>
        </button>
      </Modal.Header>
      <div className="row">
        <div className="col-sm-1">
          <a onClick={handlePrevious}>
            <i className="material-icons md-48">keyboard_arrow_left</i>
          </a>
        </div>
        <div className="col-sm-10 text-center">
          <video
            autoPlay
            controls src={src}
            width={width}
            height={height}
            onEnded={handleEnded}
            onError={handleError}
          />
        </div>
        <div className="col-sm-1">
          <a onClick={handleNext}>
            <i className="material-icons md-48">keyboard_arrow_right</i>
          </a>
        </div>
      </div>
    </Modal>
  );
}

Player.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleEnded: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired,
  src: PropTypes.string,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default Player;
