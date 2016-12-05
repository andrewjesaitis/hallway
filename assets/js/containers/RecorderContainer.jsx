import React, { Component, PropTypes } from 'react';
import RecordRTC from 'recordrtc';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { displayRecorder, clearConversation } from '../redux/ui';
import { addMessage } from '../redux/conversations';
import Recorder from '../components/Recorder';

class RecorderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: '',
      subject: '',
      stream: null,
      isRecording: false,
      hasRecording: false,
      recordVideo: null,
      autoPlay: true,
      muted: true,
      controls: false,
      loop: false,
      width: 640,
      height: 360,
      isReply: Number.isInteger(this.props.conversationId),
      cameraEnabled: true,
    };
  }
  componentWillReceiveProps(newProps) {
    // if we are (re)opening model, we want to record new stream
    if (this.props.recorderVisible === false && newProps.recorderVisible === true) {
      this.requestUserMedia();
    }
    this.setState({
      isReply: Number.isInteger(newProps.conversationId),
      subject: newProps.subject,
    });
  }
  isSubjectValid() {
    const length = this.state.subject.length;
    if (length === 0) return;
    if (length < 120) return 'success';
    return 'error';
  }
  handleSubjectChange(e) {
    this.setState({ subject: e.target.value });
  }
  requestUserMedia() {
    const { width, height } = this.state;
    const constraints = {
      audio: true,
      video: { width, height },
    };
    navigator.mediaDevices.getUserMedia(constraints)
             .then((stream) => {
               this.setState({
                 stream,
                 src: window.URL.createObjectURL(stream),
                 recordVideo: new RecordRTC(stream, {
                   type: 'video',
                   video: { width, height },
                   canvas: { width, height },
                 }),
               });
             })
             .catch((err) => {
               this.setState({
                 cameraEnabled: false,
               });
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
    const { width, height } = this.state;
    this.setState({
      isRecording: true,
      muted: true,
      loop: false,
      controls: true,
      src: window.URL.createObjectURL(this.state.stream),
      recordVideo: new RecordRTC(this.state.stream, {
                        type: 'video',
                        video: { width, height },
                        canvas: { width, height },
                      }),
    }, () => this.state.recordVideo.startRecording());
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
    this.props.addMessage(
      this.state.subject,
      this.props.conversationId,
      this.state.recordVideo.blob
    );
    this.handleClose();
  }
  handleClose() {
    if (this.state.isRecording) {
      this.stopRecording();
    }
    if (this.state.stream !== null) {
      this.state.stream.getTracks().map(stream => stream.stop());
    }
    this.setState({
      src: '',
      subject: '',
      stream: null,
      muted: true,
      controls: false,
      isReply: false,
    });
    this.props.clearConversation();
    this.props.displayRecorder(false);
  }
  render() {
    return (
      <Recorder
        showModal={this.props.recorderVisible}
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
        isReply={this.state.isReply}
        cameraEnabled={this.state.cameraEnabled}
      />
    );
  }
}

RecorderContainer.propTypes = {
  displayRecorder: PropTypes.func.isRequired,
  clearConversation: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
  recorderVisible: PropTypes.bool.isRequired,
  conversationId: PropTypes.number,
  subject: PropTypes.string.isRequired,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ clearConversation, displayRecorder, addMessage }, dispatch);
}

function mapStateToProps({ ui }) {
  return {
    recorderVisible: ui.get('recorderVisible'),
    conversationId: ui.get('conversationId'),
    subject: ui.get('subject'),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecorderContainer);
