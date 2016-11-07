import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Immutable from 'immutable';

import ConversationList from '../components/ConversationList';
import PlayerContainer from '../containers/PlayerContainer';
import ActionButtonContainer from '../containers/ActionButtonContainer';
import { fetchConversationsForDiscussionGroup } from '../redux/conversations';

class ConversationListContainer extends Component {
  componentWillMount() {
    this.props.fetchConversationsForDiscussionGroup(django_discussion_group_id);
  }
  render() {
    return (
      <div>
        <ConversationList conversations={this.props.conversations} />
        <PlayerContainer />
        <ActionButtonContainer />
      </div>
    );
  }
}

ConversationListContainer.propTypes = {
  fetchConversationsForDiscussionGroup: PropTypes.func.isRequired,
  conversations: PropTypes.instanceOf(Immutable.List).isRequired,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchConversationsForDiscussionGroup }, dispatch);
}

function mapStateToProps({ conversations }) {
  return {
    conversations: conversations.get('conversations'),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConversationListContainer);
