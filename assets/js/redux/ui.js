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

function displayRecorder(isVisible, recorderConversationId) {
  return {
    type: DISPLAY_RECORDER,
    isVisible,
    recorderConversationId,
  };
}

function setPlayerSource(srcs) {
  return {
    type: WATCH_VIDEO,
    srcs,
  };
}

// Reducer

const initialUIState = Immutable.Map({
  playerVisible: false,
  recorderVisible: false,
  recorderConversationId: null,
  srcs: [],
});

function ui(state = initialUIState, action) {
  switch (action.type) {
    case DISPLAY_PLAYER:
      return state.update('playerVisible', (v) => action.isVisible);
    case DISPLAY_RECORDER:
      return state.merge({
        recorderVisible: action.isVisible,
        recorderConversationId: action.isVisible ? action.recorderConversationId : null, //protect against maintaining id
      });
    case WATCH_VIDEO:
      return state.mergeIn(['srcs'], action.srcs);
    default:
      return state;
  }
}

export { ui, displayRecorder, displayPlayer, setPlayerSource };
