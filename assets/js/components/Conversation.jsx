import React, { PropTypes } from 'react';
import TimeAgo from 'react-timeago';

import MessageListContainer from '../containers/MessageListContainer';

function Conversation({ subject, handlePlay, conversationId, messages }) {
  return (
    <div className="col-sm-6">
      <div onClick={handlePlay} className="conversation panel panel-primary">
        <div className="panel-heading">
          <div className="panel-title">
            {subject}
          </div>
        </div>
        <div className="panel-body">
          <MessageListContainer
            conversationId={conversationId}
            messages={messages}
          />
        </div>
        <div className="panel-footer">
          <div className="small text-right">
            Last Updated: <TimeAgo date={messages[messages.length - 1].date_created} />
          </div>
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
