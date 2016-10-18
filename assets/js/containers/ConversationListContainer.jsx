import React, { Component } from 'react';

import ConversationList from '../components/ConversationList';
import PlayerContainer from '../containers/PlayerContainer';
import { getConversations } from '../utils/api.js';

class ConversationListContainer extends Component {
  constructor() {
    super();
    this.state = {
      conversations: [],
    };
  }
  componentWillMount() {
    getConversations().then((res) => {
      const conversations = res.data;
      this.setState({
        conversations,
      });
    });
  }
  render() {
    return (
      <div>
        <ConversationList conversations={this.state.conversations} />
        <PlayerContainer />
      </div>
    );
  }
}

export default ConversationListContainer;
