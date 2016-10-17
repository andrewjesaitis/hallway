import React, { PropTypes } from 'react';

function Message({ s3Url }) {
  return (
    <li>{s3Url}</li>
  );
}

Message.propTypes = {
  s3Url: PropTypes.string.isRequired,
};

export default Message;
