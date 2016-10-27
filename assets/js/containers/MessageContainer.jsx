import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';

import Message from '../components/Message.jsx';

class MessageContainer extends Component {
  render() {
    return (
      <Message email={this.props.message.get('user')}  />
    );
  }
}

MessageContainer.propTypes = {
  message: PropTypes.instanceOf(Immutable.Map).isRequired,
};

export default MessageContainer;
