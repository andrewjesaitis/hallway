import React, { PropTypes } from 'react';

function Message({ handleClick, s3Url }) {
  return (
    <li><a onClick={handleClick}>{s3Url}</a></li>
  );
}

Message.propTypes = {
  s3Url: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Message;
