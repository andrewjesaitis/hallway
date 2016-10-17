import React, { Component, PropTypes } from 'react';

import { getMessages } from '../utils/api';
import MessageList from '../components/MessageList.jsx';

class MessageListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversationId: this.props.conversationId,
      messages: [],
    };
  }
  componentWillMount() {
    getMessages(this.state.conversationId).then((res) => {
      this.setState({
        messages: res.data,
      });
    });
  }
  render() {
    return (
      <MessageList messages={this.state.messages} />
    );
  }
}

MessageListContainer.propTypes = {
  conversationId: PropTypes.number.isRequired,
};

export default MessageListContainer;
