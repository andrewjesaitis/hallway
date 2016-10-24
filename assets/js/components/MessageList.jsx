import React, { PropTypes } from 'react';

import MessageContainer from '../containers/MessageContainer';

function MessageList({ messages }) {
  return (
    <ul className="list-inline message-list">
      {
        messages.map((message, idx) =>
          <MessageContainer message={message} idx={idx} key={message.pk} />
        )
       }
    </ul>
  );
}

MessageList.propTypes = {
  messages: PropTypes.array.isRequired,
};

export default MessageList;
