import React, { Component, PropTypes } from 'react';

import Player from '../components/Player';

class PlayerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: true,
      src: 'https://cs6460.s3.amazonaws.com/84031',
      width: 480,
      height: 360,
    };
  }
  handleClose() {
    this.setState({
      showModal: false,
    });
  }
  render() {
    return (
      <Player
        show={this.state.showModal}
        onClose={() => this.handleClose()}
        src={this.state.src}
        width={this.state.width}
        height={this.state.height}
      />
    );
  }
}

export default PlayerContainer;
