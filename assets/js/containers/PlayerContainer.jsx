import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { displayPlayer } from '../redux/ui';
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
    const length = nextProps.srcs.length;
    this.setState({
      src: length > 0 ? nextProps.srcs[this.state.curIdx] : '',
    });
  }
  playNext() {
    const nextVideo = this.state.curIdx + 1;
    if (nextVideo < this.props.srcs.length) {
      this.setState({
        src: this.props.srcs[nextVideo],
        curIdx: nextVideo,
      });
    }
  }
  handleClose() {
    this.setState({
      curIdx: 0,
      src: '',
    });
    this.props.displayPlayer(false);
  }
  handleError(e) {
    console.warn("Error Playing video: ", e);
    this.playNext();
  } 
  handleEnded() {
    this.playNext();
  }
  render() {
    return (
      <Player
        show={this.props.playerVisible}
        handleClose={() => this.handleClose()}
        handleEnded={() => this.handleEnded()}
        handleError={(e) => this.handleError(e)}
        src={this.state.src}
        width={this.state.width}
        height={this.state.height}
      />
    );
  }
}

PlayerContainer.propTypes = {
  srcs: React.PropTypes.array,
  playerVisible: PropTypes.bool.isRequired,
  displayPlayer: PropTypes.func.isRequired,
};

function mapStateToProps({ ui }) {
  return {
    srcs: ui.get('srcs'),
    playerVisible: ui.get('playerVisible'),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ displayPlayer }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer);
