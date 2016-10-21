import React, { PropTypes } from 'react';

import MessageListContainer from '../containers/MessageListContainer';

function Conversation({ subject, handleReply, handlePlay, conversationId, messages }) {
  return (
    <div>
      <div className="row">
        <div className="col-sm-12">
          <h1><a onClick={handlePlay}>{subject}</a> <a onClick={handleReply} role="button"><i className="material-icons">reply</i></a></h1>
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
  handlePlay: PropTypes.func.isRequired,
  handleReply: PropTypes.func.isRequired,
  conversationId: PropTypes.number.isRequired,
  messages: PropTypes.array.isRequired,
};

export default Conversation;
