import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { displayPlayer } from '../redux/ui';
import Player from '../components/Player';

class PlayerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 480,
      height: 360,
    };
  }
  handleClose() {
    this.props.displayPlayer(false);
  }
  render() {
    return (
      <Player
        show={this.props.playerVisible}
        onClose={() => this.handleClose()}
        src={this.props.src}
        width={this.state.width}
        height={this.state.height}
      />
    );
  }
}

PlayerContainer.propTypes = {
  src: PropTypes.string.isRequired,
  playerVisible: PropTypes.bool.isRequired,
  displayPlayer: PropTypes.func.isRequired,
};

function mapStateToProps({ ui }) {
  return {
    src: ui.get('src'),
    playerVisible: ui.get('playerVisible'),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ displayPlayer }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer);
