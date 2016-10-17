import React, { Component, PropTypes } from 'react';

import Conversation from '../components/Conversation';

class ConversationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversation: this.props.conversation,
    };
  }
  render() {
    return (
      <Conversation
        subject={this.state.conversation.subject}
        conversationId={this.state.conversation.pk}
      />
    );
  }
}

ConversationContainer.propTypes = {
  conversation: PropTypes.object.isRequired,
};

export default ConversationContainer;
