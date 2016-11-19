import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';

import { displayPlayer, displayRecorder, clearConversation } from '../redux/ui';
import { removeMessage } from '../redux/conversations';
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
  handleDelete(e) {
    e.preventDefault();
    console.log("delete post");
    const convoId = this.props.currentConversation.get('pk');
    const convoIdx = this.props.convoIdx;
    const msgId = this.props.currentConversation.getIn(['messages', this.state.curIdx, 'pk']);
    const msgIdx = this.state.curIdx;
    const shouldDeleteConvo = this.props.srcs.size === 1 
    this.props.removeMessage(convoId, convoIdx, msgId, msgIdx, shouldDeleteConvo);
    if(shouldDeleteConvo) {
        this.handleClose();
    }
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
        handleDelete={(e) => this.handleDelete(e)}
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

function mapStateToProps({ ui, conversations }) {
  const convoIdx = conversations.get('conversations').findIndex(c => ui.get('conversationId') === c.get('pk'));
  const currentConversation = convoIdx !== -1 
                              ? conversations.getIn(['conversations', convoIdx])
                              : Immutable.Map()
  return {
    convoIdx,
    currentConversation,
    srcs: currentConversation.get('messages', Immutable.List())
                             .map(item => item.get('url')),
    subject: currentConversation.get('subject', ''),
    conversationId: ui.get('conversationId'),
    playerVisible: ui.get('playerVisible'),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ displayPlayer, displayRecorder, 
                              clearConversation, removeMessage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer);




