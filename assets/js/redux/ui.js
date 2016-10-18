import Immutable from 'immutable';

const DISPLAY_PLAYER = 'DISPLAY_PLAYER';
const DISPLAY_RECORDER = 'DISPLAY_RECORDER';
const WATCH_VIDEO = 'WATCH_VIDEO';

// Actions

function displayPlayer(isVisible) {
  return {
    type: DISPLAY_PLAYER,
    isVisible,
  };
}

function displayRecorder(isVisible) {
  return {
    type: DISPLAY_RECORDER,
    isVisible,
  };
}

function setPlayerSource(src) {
  return {
    type: WATCH_VIDEO,
    src,
  };
}

// Reducer

const initialUIState = Immutable.Map({
  playerVisible: false,
  recorderVisible: false,
  src: '',
});

function ui(state = initialUIState, action) {
  switch (action.type) {
    case DISPLAY_PLAYER:
      return state.update('playerVisible', (v) => action.isVisible);
    case DISPLAY_RECORDER:
      return state.update('recorderVisible', (v) => action.isVisible);
    case WATCH_VIDEO:
      return state.update('src', (v) => action.src);
    default:
      return state;
  }
}

export { ui, displayRecorder, displayPlayer, setPlayerSource };
