import React, { PropTypes } from 'react';

import { Button } from 'react-bootstrap';

function ActionButton(props) {
  return (
    <div className="btn-group floating-action-button">
      <Button bsStyle="primary" onClick={props.handleClick}><i className="material-icons">add</i></Button>
    </div>
  );
}

ActionButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default ActionButton;
