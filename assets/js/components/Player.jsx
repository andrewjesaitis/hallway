import React, { PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';

function Player({ show, handleClose, handleEnded, handleError, handlePrevious, handleNext, src, subject }) {
  return (
    <Modal show={show}>
      <Modal.Header>
        <div className="row">
          <div className="col-sm-10 player-title">
            <h4>{subject}</h4>
          </div>
          <div className="col-sm-2">
            <button type="button" className="close pull-right" aria-label="Close" onClick={handleClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      </Modal.Header>
        <Modal.Body>
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
      </Modal.Body>
      <Modal.Footer>
        <div className="row">
          <div className="col-sm-12">
            <Button bsStyle="primary">Reply</Button>
          </div>
        </div>
      </Modal.Footer>
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
