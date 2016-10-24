import React, { PropTypes } from 'react';
import Gravatar from 'react-gravatar';

function Message({ handleClick, email }) {
  return (
    <li>
      <a onClick={handleClick}><Gravatar email={email} className="img-circle box-shadow" /></a>
    </li>
  );
}

Message.propTypes = {
  email: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Message;
