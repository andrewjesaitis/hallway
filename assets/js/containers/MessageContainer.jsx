import React, { Component, PropTypes } from 'react';

import Message from '../components/Message.jsx';

class MessageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: this.props.message,
    };
  }
  render() {
    return (
      <Message s3Url={this.state.message.url} />
    );
  }
}

MessageContainer.propTypes = {
  message: PropTypes.object.isRequired,
};

export default MessageContainer;
