import React, { Component } from 'react';
import Recorder from '../components/Recorder';

class RecorderContainer extends Component {
  constructor() {
    super();
    this.state = {
      s3Url: '',
      src: '',
      showModal: true,
      recordVideo: null,
    };
  }
  componentDidMount() {
    this.requestUserMedia();
  }
  requestUserMedia() {
    this.captureUserMedia((stream) => {
      this.setState({ src: window.URL.createObjectURL(stream) });
    });
  }
  captureUserMedia(callback) {
    const params = { audio: true, video: true };
    navigator.getUserMedia(params, callback, (err) => {
      console.warn(JSON.stringify(err));
    });
  }
  handleStartRecord() {
    this.captureUserMedia((stream) => {
      this.setState({ recordVideo: RecordRTC(stream, {type: 'video'}) });
      this.state.recordVideo.startRecording();
    });
  }
  handleStopRecord() {
    this.recordVideo.stopRecording();
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
        src={this.state.src}
        onClose={() => this.handleClose()}
      />
    );
  }
}

export default RecorderContainer;
