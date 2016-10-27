import Immutable from 'immutable';

const SELECT_CONVERSATION = 'SELECT_CONVERSATION';
const CLEAR_CONVERSATION = 'CLEAR_CONVERSATION';
const DISPLAY_PLAYER = 'DISPLAY_PLAYER';
const DISPLAY_RECORDER = 'DISPLAY_RECORDER';

// Actions

function selectConversation(id, subject, srcs) {
  return {
    type: SELECT_CONVERSATION,
    id,
    subject,
    srcs
  };
}

function clearConversation() {
  return {
    type: CLEAR_CONVERSATION,
  };
}

function displayPlayer(isVisible, conversationId, subject, srcs) {
  return {
    type: DISPLAY_PLAYER,
    isVisible,
  };
}

function displayRecorder(isVisible, subject, conversationId) {
  return {
    type: DISPLAY_RECORDER,
    isVisible,
  };
}

// Reducer

const initialUIState = Immutable.Map({
  playerVisible: false,
  recorderVisible: false,
  conversationId: null,
  subject: '',
  srcs: Immutable.List(),
});

function ui(state = initialUIState, action) {
  switch (action.type) {
    case SELECT_CONVERSATION:
      return state.merge({
        subject: action.subject,
        conversationId: action.id,
        srcs: action.srcs,
      });
    case CLEAR_CONVERSATION:
      return state.merge({
        subject: '',
        conversationId: null,
        srcs: Immutable.List(),
      });
    case DISPLAY_PLAYER:
      return state.merge({
        playerVisible: action.isVisible,
      });
    case DISPLAY_RECORDER:
      return state.merge({
        recorderVisible: action.isVisible,
      });
    default:
      return state;
  }
}

export { ui, selectConversation, clearConversation, displayRecorder, displayPlayer };










