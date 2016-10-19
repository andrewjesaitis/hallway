import Immutable from 'immutable';

import { getConversations } from '../utils/api';

const ADD_MESSAGE = 'ADD_MESSAGE';
const ADD_CONVERSATION = 'ADD_CONVERSATION';
const FETCHING_CONVERSATIONS = 'FETCHING_CONVERSATIONS';
const FETCHING_CONVERSATIONS_SUCCESS = 'FETCHING_CONVERSATIONS_SUCCESS';
const FETCHING_CONVERSATIONS_ERROR = 'FETCHING_CONVERSATIONS_ERROR';

// Actions
function addMessage(subject, blob) {
  return {
    type: ADD_MESSAGE,
    subject,
    blob,
  };
}

function addConversation(subject) {
  return {
    type: ADD_CONVERSATION,
    subject,
  };
}

function requestConversations() {
  return {
    type: FETCHING_CONVERSATIONS,
    isFetching: true,
  };
}

function receiveConversations(conversations) {
  return {
    type: FETCHING_CONVERSATIONS_SUCCESS,
    conversations,
    isFetching: false,
    lastUpdated: Date.now(),
  };
}

function fetchingConversationsError(error) {
  return {
    type: FETCHING_CONVERSATIONS_ERROR,
    isFetching: false,
    error,
  };
}


function fetchConversations() {
  console.log("fetching");
  return dispatch => {
    dispatch(requestConversations());
    return getConversations()
      .then(res => dispatch(receiveConversations(res.data)))
      .catch(err => dispatch(fetchingConversationsError(err)));
  };
}

// Reducer

const initialConversationState = Immutable.Map({
  isFetching: false,
  lastUpdated: 0,
  conversations: Immutable.List(),
  error: Immutable.Map(),
});

function conversations(state = initialConversationState, action) {
  switch (action.type) {
    case FETCHING_CONVERSATIONS:
      console.log("in FETCHING_CONVERSATIONS reducer");
      return state.merge({
        isFetching: action.isFetching,
        error: {},
      });
    case FETCHING_CONVERSATIONS_SUCCESS:
      return state.merge({
        isFetching: action.isFetching,
        lastUpdated: action.lastUpdated,
        conversations: action.conversations,
      });
    case FETCHING_CONVERSATIONS_ERROR:
      return state.merge({
        isFetching: action.isFetching,
        error: action.error,
      });
    default:
      return state;
  }
}

export { conversations, fetchConversations, addMessage, addConversation };
