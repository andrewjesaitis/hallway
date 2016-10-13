import React, { Component } from 'react';
import RecordRTC from 'recordrtc';
import Recorder from '../components/Recorder';

class RecorderContainer extends Component {
  constructor() {
    super();
    this.state = {
      s3Url: '',
      src: '',
      showModal: true,
      isRecording: false,
      hasRecording: false,
      recordVideo: null,
      autoPlay: true,
      muted: true,
      controls: false,
      loop: false,
      width: 480,
      height: 360,
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
  handleRecord() {
    if (this.state.isRecording) {
      this.stopRecording();
    } else {
      this.startRecording();
    }
  }
  startRecording() {
    this.captureUserMedia((stream) => {
      this.setState({
        isRecording: true,
        muted: true,
        loop: false,
        controls: true,
        src: window.URL.createObjectURL(stream),
        recordVideo: new RecordRTC(stream, { type: 'video' }),
      });
      this.state.recordVideo.startRecording();
    });
  }
  stopRecording() {
    this.setState({
      isRecording: false,
      hasRecording: true,
      loop: true,
      controls: true,
      muted: false,
    });
    this.state.recordVideo.stopRecording((videoUrl) => {
      this.setState({ src: videoUrl });
    });
  }
  handlePost() {
    console.log("Uploading...");
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
        isRecording={this.state.isRecording}
        hasRecording={this.hasRecording}
        onRecord={() => this.handleRecord()}
        onPost={() => this.handlePost()}
        src={this.state.src}
        onClose={() => this.handleClose()}
        autoPlay={this.state.autoPlay}
        muted={this.state.muted}
        controls={this.state.controls}
        loop={this.state.loop}
        width={this.state.width}
        height={this.state.height}

      />
    );
  }
}

export default RecorderContainer;
