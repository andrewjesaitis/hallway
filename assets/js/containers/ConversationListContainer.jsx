import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ConversationList from '../components/ConversationList';
import PlayerContainer from '../containers/PlayerContainer';
import { fetchConversations } from '../redux/conversations';

class ConversationListContainer extends Component {
  componentWillMount() {
    this.props.fetchConversations();
  }
  render() {
    return (
      <div>
        <ConversationList conversations={this.props.conversations} />
        <PlayerContainer />
      </div>
    );
  }
}

ConversationListContainer.propTypes = {
  fetchConversations: PropTypes.func.isRequired,
  conversations: PropTypes.array.isRequired,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchConversations }, dispatch);
}

function mapStateToProps({ conversations }) {
  return {
    conversations: conversations.get('conversations').toJS(),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConversationListContainer);
