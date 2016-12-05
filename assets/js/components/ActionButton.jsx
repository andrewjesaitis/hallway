import React, { PropTypes } from 'react';

import { Button } from 'react-bootstrap';

function ActionButton(props) {
  return (
    <div className="btn-group floating-action-button">
      <Button bsStyle="danger" title="Start a new discussion" onClick={props.handleClick}><i className="material-icons">video_call</i></Button>
    </div>
  );
}

ActionButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default ActionButton;
