import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { displayRecorder, displayPlayer, setPlayerSource } from '../redux/ui';
import Conversation from '../components/Conversation';

class ConversationContainer extends Component {
  handlePlay(e) {
    e.preventDefault();
    const urls = this.props.conversation.messages.map(item => item.url);
    this.props.setPlayerSource(urls);
    this.props.displayPlayer(true);
  }
  handleReply(e) {
    e.preventDefault();
    this.props.displayRecorder(true, this.props.conversation.pk);
  }
  render() {
    console.log(this.props.conversation.messages)
    return (
      <Conversation
        subject={this.props.conversation.subject}
        handlePlay={e => this.handlePlay(e)}
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
  displayPlayer: PropTypes.func.isRequired,
  setPlayerSource: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ displayRecorder, displayPlayer, setPlayerSource }, dispatch);
}

export default connect(null, mapDispatchToProps)(ConversationContainer);
