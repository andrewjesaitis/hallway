import React, { PropTypes } from 'react';

import { Button } from 'react-bootstrap';

function ActionButton(props) {
  return (
    <Button bsStyle="primary" className="navbar-btn" onClick={props.handleClick}>Post</Button>
  );
}

ActionButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default ActionButton;
