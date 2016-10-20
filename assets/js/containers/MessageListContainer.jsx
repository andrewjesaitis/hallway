import React, { Component, PropTypes } from 'react';

import MessageList from '../components/MessageList.jsx';

class MessageListContainer extends Component {
  render() {
    return (
      <MessageList messages={this.props.messages} />
    );
  }
}

MessageListContainer.propTypes = {
  conversationId: PropTypes.number.isRequired,
  messages: PropTypes.array.isRequired,
};

export default MessageListContainer;
