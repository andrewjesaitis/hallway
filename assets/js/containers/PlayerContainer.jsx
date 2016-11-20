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
      canDelete: false,
      width: 480,
      height: 360,
      name: '',
      email: '',
    };
  }
  componentWillReceiveProps(nextProps) {
    const length = nextProps.messages.size;
    console.log(nextProps);
    this.setState({
      src: length > 0 ? nextProps.messages.getIn([this.state.curIdx, 'url']) : '',
      canDelete: length > 0
                 ? nextProps.messages.getIn([this.state.curIdx, 'can_delete'])
                 : false,
      name: length > 0 ? nextProps.messages.getIn([this.state.curIdx, 'full_name']) : '',
      email: length > 0
                 ? nextProps.messages.getIn([this.state.curIdx, 'user'])
                 : '',
    });
  }
  playNext() {
    const nextVideo = this.state.curIdx + 1;
    if (nextVideo < this.props.messages.size) {
      this.setState({
        src: this.props.messages.getIn([nextVideo, 'url']),
        canDelete: this.props.messages.getIn([nextVideo, 'can_delete']),
        curIdx: nextVideo,
        name: this.props.messages.getIn([nextVideo, 'full_name']),
        email: this.props.messages.getIn([nextVideo, 'user']),
      });
    }
  }
  playPrevious() {
    const previousVideo = this.state.curIdx - 1;
    if (previousVideo >= 0) {
      this.setState({
        src: this.props.messages.getIn([previousVideo, 'url']),
        canDelete: this.props.messages.getIn([previousVideo, 'can_delete']),
        curIdx: previousVideo,
        name: this.props.messages.getIn([previousVideo, 'full_name']),
        email: this.props.messages.getIn([previousVideo, 'user']),
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
    const shouldDeleteConvo = this.props.messages.size === 1
    this.props.removeMessage(convoId, convoIdx, msgId, msgIdx, shouldDeleteConvo);
    if(shouldDeleteConvo) {
        this.handleClose();
    }
  }
  handleClose() {
    this.setState({
      curIdx: 0,
      src: '',
      name: '',
      email: '',
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
        canDelete={this.state.canDelete}
        src={this.state.src}
        subject={this.props.subject}
        name={this.state.name}
        email={this.state.email}
      />
    );
  }
}

PlayerContainer.propTypes = {
  messages: PropTypes.instanceOf(Immutable.List),
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
    messages: currentConversation.get('messages', Immutable.List()),
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
