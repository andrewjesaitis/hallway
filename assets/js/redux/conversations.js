import Immutable from 'immutable';

import { getConversations, uploadVideo } from '../utils/api';

const FETCHING_CONVERSATIONS = 'FETCHING_CONVERSATIONS';
const FETCHING_CONVERSATIONS_SUCCESS = 'FETCHING_CONVERSATIONS_SUCCESS';
const FETCHING_CONVERSATIONS_ERROR = 'FETCHING_CONVERSATIONS_ERROR';
const POST_MESSAGE = 'POST_MESSAGE';
const POST_MESSAGE_SUCCESS = 'POST_MESSAGE_SUCCESS';
const POST_MESSAGE_ERROR = 'POST_MESSAGE_ERROR';

// Actions
function postMessage() {
  return {
    type: POST_MESSAGE,
    isPosting: true
  };
}

function messagePosted(conversation) {
  return {
    type: POST_MESSAGE_SUCCESS,
    conversation,
  };
}

function messageFailedToPost(error) {
  return {
    type: POST_MESSAGE_ERROR,
    isPosting: false,
    error,
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
  return dispatch => {
    dispatch(requestConversations());
    return getConversations()
      .then(res => dispatch(receiveConversations(res.data)))
      .catch(err => dispatch(fetchingConversationsError(err)));
  };
}

function addMessage(subject, conversationId, blob) {
  return (dispatch, getState) => {
    dispatch(postMessage());
    let conversation;
    if (conversation) {
      const currentConversations = getState().conversations.get('conversations');
      conversation = currentConversations.find( (item) => {
        return item.get('pk', conversationId);
      });
    } else {
      conversation = null;
    }
    return uploadVideo(blob, subject, conversation)
      .then(convo => dispatch(messagePosted(convo)))
      .catch(err => dispatch(messageFailedToPost(err)));
  };
}

// Reducer

const initialConversationState = Immutable.Map({
  isFetching: false,
  isPosting: false,
  lastUpdated: 0,
  conversations: Immutable.List(),
  error: Immutable.Map(),
});

function conversations(state = initialConversationState, action) {
  switch (action.type) {
    case FETCHING_CONVERSATIONS:
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
    case POST_MESSAGE:
      return state.merge({
        isPosting: action.isPosting,
        error: {},
      });
    case POST_MESSAGE_SUCCESS:
      return state.mergeDeep({
        isPosting: action.isPosting,
        lastUpdated: action.lastUpdated,
        conversations: [action.conversation], // note this depends on this array not being a immutable.js list
      });
    case POST_MESSAGE_ERROR:
      return state.merge({
        isPosting: action.isPosting,
        error: action.error,
      });
    default:
      return state;
  }
}

export { conversations, fetchConversations, addMessage };
