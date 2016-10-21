import React, { PropTypes } from 'react';
import { Modal } from 'react-bootstrap';

function Player({ show, handleClose, handleEnded, handleError, src, width, height }) {
  console.log("rendering Player", src);
  return (
    <Modal show={show}>
      <Modal.Header>
        <button type="button" className="close" aria-label="Close" onClick={handleClose}>
          <span aria-hidden="true">&times;</span>
        </button>
      </Modal.Header>
      <div className="row">
        <div className="col-sm-12 text-center">
          <video autoPlay controls src={src} width={width} height={height} onEnded={handleEnded} onError={handleError}/>
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

