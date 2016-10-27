import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';

import { displayPlayer, displayRecorder, clearConversation } from '../redux/ui';
import Player from '../components/Player';

class PlayerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curIdx: 0,
      src: '',
      width: 480,
      height: 360,
    };
  }
  componentWillReceiveProps(nextProps) {
    const length = nextProps.srcs.size;
    console.log(nextProps);
    this.setState({
      src: length > 0 ? nextProps.srcs.get(this.state.curIdx) : '',
    });
  }
  playNext() {
    const nextVideo = this.state.curIdx + 1;
    if (nextVideo < this.props.srcs.size) {
      this.setState({
        src: this.props.srcs.get(nextVideo),
        curIdx: nextVideo,
      });
    }
  }
  playPrevious() {
    const previousVideo = this.state.curIdx - 1;
    if (previousVideo >= 0) {
      this.setState({
        src: this.props.srcs.get(previousVideo),
        curIdx: previousVideo,
      });
    }
  }
  handleReply(e) {
    e.preventDefault();
    this.props.displayPlayer(false);
    this.props.displayRecorder(true);
  }
  handleClose() {
    this.setState({
      curIdx: 0,
      src: '',
    });
    this.props.clearConversation();
    this.props.displayPlayer(false);
  }
  handleError(e) {
    console.warn("Error Playing video: ", e);
    this.playNext();
  }
  handleEnded() {
    this.playNext();
  }
  handlePrevious(e) {
    e.preventDefault();
    this.playPrevious();
  }
  handleNext(e) {
    e.preventDefault();
    this.playNext();
  }

  render() {
    return (
      <Player
        show={this.props.playerVisible}
        handleClose={() => this.handleClose()}
        handleEnded={() => this.handleEnded()}
        handleError={(e) => this.handleError(e)}
        handlePrevious={(e) => this.handlePrevious(e)}
        handleNext={(e) => this.handleNext(e)}
        handleReply={(e) => this.handleReply(e)}
        src={this.state.src}
        subject={this.props.subject}
      />
    );
  }
}

PlayerContainer.propTypes = {
  srcs: PropTypes.instanceOf(Immutable.List),
  subject: PropTypes.string,
  conversationId: PropTypes.number,
  playerVisible: PropTypes.bool.isRequired,
  displayPlayer: PropTypes.func.isRequired,
  displayRecorder: PropTypes.func.isRequired,
  clearConversation: PropTypes.func.isRequired,
};

function mapStateToProps({ ui }) {
  return {
    srcs: ui.get('srcs'),
    subject: ui.get('subject'),
    conversationId: ui.get('conversationId'),
    playerVisible: ui.get('playerVisible'),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ displayPlayer, displayRecorder, clearConversation }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer);




