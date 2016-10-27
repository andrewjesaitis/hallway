import React, { PropTypes } from 'react';
import Immutable from 'immutable';

import MessageContainer from '../containers/MessageContainer';

function MessageList({ messages }) {
  return (
    <ul className="list-inline message-list">
      {
        messages.map((message, idx) =>
          <MessageContainer message={message} idx={idx} key={message.get('pk')} />
        )
       }
    </ul>
  );
}

MessageList.propTypes = {
  messages: PropTypes.instanceOf(Immutable.List).isRequired,
};

export default MessageList;
