import React, { PropTypes } from 'react';
import { Modal, Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

function Recorder({ showModal, isRecording, hasRecording, onRecord,
                    src, onClose, onPost, autoPlay, muted,
                    controls, loop, width, height, isSubjectValid,
                    onSubjectChange, subject }) {
  return (
    <Modal show={showModal}>
      <Modal.Header>
        <button type="button" className="close" aria-label="Close" onClick={onClose}>
          <span aria-hidden="true">&times;</span>
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-sm-12 text-center">
            <video
              autoPlay={autoPlay}
              muted={muted}
              controls={controls}
              loop={loop}
              width={width}
              height={height}
              src={src}
            />
          </div>
        </div>
        <FormGroup
          controlId="videoSubject"
          validationState={isSubjectValid()}
        >
          <ControlLabel>Subject</ControlLabel>
          <FormControl
            type="text"
            value={subject}
            placeholder="What are you talking about?"
            onChange={onSubjectChange}
          />
          <FormControl.Feedback />
          <HelpBlock>Subjects need to be less than 120 characters</HelpBlock>
        </FormGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn-primary" disabled={!hasRecording} onClick={onPost}>
          Post
        </Button>
        <Button className="btn-danger" active={isRecording} onClick={onRecord}>
          {isRecording ? 'Stop' : 'Record'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

Recorder.propTypes = {
  showModal: PropTypes.bool.isRequired,
  isRecording: PropTypes.bool.isRequired,
  hasRecording: PropTypes.bool.isRequired,
  onRecord: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onPost: PropTypes.func.isRequired,
  autoPlay: PropTypes.bool.isRequired,
  muted: PropTypes.bool.isRequired,
  controls: PropTypes.bool.isRequired,
  loop: PropTypes.bool.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  onSubjectChange: PropTypes.func.isRequired,
  subject: PropTypes.string,
  isSubjectValid: PropTypes.func.isRequired,
};

export default Recorder;







