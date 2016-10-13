import React, { Component } from 'react';
import Recorder from '../components/Recorder';

class RecorderContainer extends Component {
  constructor() {
    super();
    this.state = {
      s3Url: '',
      showModal: true,
    };
  }
  handleClose() {
    this.setState({
      showModal: false,
    });
  }
  render() {
    return (
      <Recorder
        showModal={this.state.showModal}
        onClose={() => this.handleClose()}
      />
    );
  }
}

export default RecorderContainer;
