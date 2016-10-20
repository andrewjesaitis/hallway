import React, { PropTypes } from 'react';

import MessageListContainer from '../containers/MessageListContainer';

function Conversation({ subject, handleReply, conversationId, messages }) {
  return (
    <div>
      <div className="row">
        <div className="col-sm-12">
          <h1>{subject} <a onClick={handleReply} role="button"><i className="material-icons">reply</i></a></h1>
        </div>
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
  handleReply: PropTypes.func.isRequired,
  conversationId: PropTypes.number.isRequired,
  messages: PropTypes.array.isRequired,
};

export default Conversation;
