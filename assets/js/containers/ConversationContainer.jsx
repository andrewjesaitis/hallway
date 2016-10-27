import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';

import { displayPlayer, selectConversation } from '../redux/ui';
import Conversation from '../components/Conversation';

class ConversationContainer extends Component {
  handlePlay(e) {
    e.preventDefault();
    const urls = this.props.conversation.get('messages').map(item => item.get('url'));
    this.props.displayPlayer(true);
    this.props.selectConversation(this.props.conversation.get('pk'),
                                  this.props.conversation.get('subject'),
                                  urls);
  }
  render() {
    return (
      <Conversation
        subject={this.props.conversation.get('subject')}
        handlePlay={e => this.handlePlay(e)}
        conversationId={this.props.conversation.get('pk')}
        messages={this.props.conversation.get('messages')}
      />
    );
  }
}

ConversationContainer.propTypes = {
  conversation: PropTypes.instanceOf(Immutable.Map).isRequired,
  displayPlayer: PropTypes.func.isRequired,
  selectConversation: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectConversation, displayPlayer }, dispatch);
}

export default connect(null, mapDispatchToProps)(ConversationContainer);
