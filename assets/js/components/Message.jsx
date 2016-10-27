import React, { PropTypes } from 'react';
import Gravatar from 'react-gravatar';

function Message({ email }) {
  return (
    <li>
      <Gravatar email={email} className="img-circle box-shadow" />
    </li>
  );
}

Message.propTypes = {
  email: PropTypes.string.isRequired,
};

export default Message;
