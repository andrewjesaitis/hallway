import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { displayPlayer, setPlayerSource } from '../redux/ui';
import Message from '../components/Message.jsx';

class MessageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: this.props.message,
    };
  }
  handleClick(e) {
    e.preventDefault();
    this.props.setPlayerSource(this.state.message.url);
    this.props.displayPlayer(true);
  }
  render() {
    return (
      <Message handleClick={(e) => this.handleClick(e)} s3Url={this.state.message.url} />
    );
  }
}

MessageContainer.propTypes = {
  message: PropTypes.object.isRequired,
  displayPlayer: PropTypes.func.isRequired,
  setPlayerSource: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ displayPlayer, setPlayerSource }, dispatch);
}

export default connect(null, mapDispatchToProps)(MessageContainer);
