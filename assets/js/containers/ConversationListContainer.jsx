import React, { Component } from 'react';
import ConversationList from '../components/ConversationList';
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
      <ConversationList conversations={this.state.conversations} />
    );
  }
}

export default ConversationListContainer;
