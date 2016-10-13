import React, { PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';

function Recorder({ showModal, src, onClose }) {
  return (
    <Modal show={showModal}>
      <Modal.Body>
        <div className="row">
          <div className="col-sm-12">
            <video autoPlay muted src={src} />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

Recorder.propTypes = {
  showModal: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Recorder;
