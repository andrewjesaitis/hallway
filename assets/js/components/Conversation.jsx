import React, { PropTypes } from 'react';

import MessageListContainer from '../containers/MessageListContainer';

function Conversation({ subject, conversationId, messages }) {
  return (
    <div>
      <div className="row">
        <div className="col-sm-12"><h1>{subject}</h1></div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <MessageListContainer
            conversationId={conversationId}
            messages={messages}
          />
        </div>
      </div>
    </div>
  );
}

Conversation.propTypes = {
  subject: PropTypes.string.isRequired,
  conversationId: PropTypes.number.isRequired,
  messages: PropTypes.array.isRequired,
};

export default Conversation;
