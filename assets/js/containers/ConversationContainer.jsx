import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { displayRecorder } from '../redux/ui';
import Conversation from '../components/Conversation';

class ConversationContainer extends Component {
  handleReply(e) {
    e.preventDefault();
    this.props.displayRecorder(true, this.props.conversation.pk);
  }
  render() {
    return (
      <Conversation
        subject={this.props.conversation.subject}
        handleReply={(e) => this.handleReply(e)}
        conversationId={this.props.conversation.pk}
        messages={this.props.conversation.messages}
      />
    );
  }
}

ConversationContainer.propTypes = {
  conversation: PropTypes.object.isRequired,
  displayRecorder: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ displayRecorder }, dispatch);
}

export default connect(null, mapDispatchToProps)(ConversationContainer);
