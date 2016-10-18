import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { displayRecorder } from '../redux/ui';
import RecorderContainer from '../containers/RecorderContainer'
import ActionButton from '../components/ActionButton';

class ActionButtonContainer extends Component {
  handleClick() {
    this.props.displayRecorder(true);
  }
  render() {
    return (
      <div>
        <ActionButton handleClick={() => this.handleClick()} />
        <RecorderContainer />
      </div>
    );
  }
}

ActionButtonContainer.propTypes = {
  displayRecorder: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ displayRecorder }, dispatch);
}

export default connect(null, mapDispatchToProps)(ActionButtonContainer);
