import React, { Component } from 'react';
import RecordRTC from 'recordrtc';
import Recorder from '../components/Recorder';

import { uploadVideo } from '../utils/api';

class RecorderContainer extends Component {
  constructor() {
    super();
    this.state = {
      s3Url: '',
      src: '',
      subject: '',
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
  isSubjectValid() {
    const length = this.state.subject.length;
    if (length < 120) return 'success';
    return 'error';
  }
  handleSubjectChange(e) {
    this.setState({ subject: e.target.value });
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
    console.log('Uploading...');
    console.log(this.state.recordVideo);
    uploadVideo(this.state.recordVideo.blob, this.state.subject);
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
        hasRecording={this.state.hasRecording}
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
        isSubjectValid={() => this.isSubjectValid()}
        onSubjectChange={(e) => this.handleSubjectChange(e)}
        subject={this.state.subject}
      />
    );
  }
}

export default RecorderContainer;
