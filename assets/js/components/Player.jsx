import React, { PropTypes } from 'react';
import Gravatar from 'react-gravatar';
import { Modal, Button } from 'react-bootstrap';

function Player({ show, handleClose, handleEnded, handleError, handlePrevious, handleNext, handleReply, handleDelete, src, canDelete, subject, email, name, width, height }) {
  return (
    <Modal show={show}>
      <Modal.Header>
        <div className="row">
          <div className="col-sm-10 player-title">
            <h4>{subject}</h4>
          </div>
          <div className="col-sm-2">
            <button type="button" className="close" aria-label="Close" onClick={handleClose}>
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
          <div className="col-sm-10">
            <video
              autoPlay
              controls
              src={src}
              onEnded={handleEnded}
              onError={handleError}
              width={width}
              height={height}
            />
          </div>
          <div className="col-sm-1 nav-arrow">
            <a onClick={handleNext}>
              <i className="material-icons md-48">keyboard_arrow_right</i>
            </a>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4 col-sm-offset-8 posted-by">
            <div className="row">
              <div className="col-sm-4">
                <Gravatar email={email} className="img-circle box-shadow" />
              </div>
              <div className="col-sm-8">
                <div><em>Posted by:</em></div><div>{name}</div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="row">
          <div className="col-sm-12">
            {canDelete &&
              <Button bsStyle="danger" onClick={handleDelete}>Delete</Button>
            }
            <Button bsStyle="primary" onClick={handleReply}>Reply</Button>
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
  handlePrevious: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleReply: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  src: PropTypes.string,
  subject: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default Player;
