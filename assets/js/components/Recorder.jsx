import React, { PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';

function Recorder({ showModal, onClose }) {
  return (
    <Modal show={showModal}>
      <Modal.Body>Future Recorder...</Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

Recorder.propTypes = {
  showModal: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Recorder;
