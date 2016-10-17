import React, { PropTypes } from 'react';

import ConversationContainer from '../containers/ConversationContainer';

function ConversationList({ conversations }) {
  if (conversations.length === 0) {
    return (
      <div className="row">
        <div className="col-sm-12">
          <h1>No one has said anything</h1>
        </div>
      </div>
    );
  }
  return (
    <ul>
      {
        conversations.map((conversation, idx) =>
          <ConversationContainer conversation={conversation} idx={idx} key={conversation.pk} />
        )
       }
    </ul>
  );
}

ConversationList.propTypes = {
  conversations: PropTypes.array.isRequired,
};

export default ConversationList;
