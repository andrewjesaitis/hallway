import Immutable from 'immutable';

const DISPLAY_RECORDER = 'DISPLAY_RECORDER';

// Actions

function displayRecorder(isVisible) {
  return {
    type: DISPLAY_RECORDER,
    isVisible,
  };
}

// Reducer

const initialUIState = Immutable.Map({
  recorderVisible: false,
});

function ui(state = initialUIState, action) {
  switch (action.type) {
    case DISPLAY_RECORDER:
      return state.update('recorderVisible', (v) => action.isVisible);
    default:
      return state;
  }
}

export { ui, displayRecorder };
