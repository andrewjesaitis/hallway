import React, { PropTypes } from 'react';
import { Modal } from 'react-bootstrap';

function Player({ show, onClose, src, width, height }) {
  return (
    <Modal show={show}>
      <Modal.Header>
        <button type="button" className="close" aria-label="Close" onClick={onClose}>
          <span aria-hidden="true">&times;</span>
        </button>
      </Modal.Header>
      <div className="row">
        <div className="col-sm-12 text-center">
          <video autoPlay controls src={src} width={width} height={height} />
        </div>
      </div>
    </Modal>
  );
}

Player.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default Player;

