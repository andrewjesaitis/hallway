import Immutable from 'immutable';

import { getConversations, uploadVideo } from '../utils/api';

const UPDATE_DISCUSSION_GROUP = 'UPDATE_DISCUSSION_GROUP';
const FETCHING_CONVERSATIONS = 'FETCHING_CONVERSATIONS';
const FETCHING_CONVERSATIONS_SUCCESS = 'FETCHING_CONVERSATIONS_SUCCESS';
const FETCHING_CONVERSATIONS_ERROR = 'FETCHING_CONVERSATIONS_ERROR';
const POST_MESSAGE = 'POST_MESSAGE';
const POST_MESSAGE_SUCCESS = 'POST_MESSAGE_SUCCESS';
const POST_MESSAGE_ERROR = 'POST_MESSAGE_ERROR';

// Actions
function updateDiscussionGroup(discussionGroupId) {
  return {
    type: UPDATE_DISCUSSION_GROUP,
    discussionGroupId,
  };
}

function postMessage() {
  return {
    type: POST_MESSAGE,
    isPosting: true,
  };
}

function messagePosted(conversation) {
  return {
    type: POST_MESSAGE_SUCCESS,
    isPosting: false,
    lastUpdated: Date.now(),
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

function fetchConversationsForDiscussionGroup(discussionGroupId) {
  return (dispatch, getState) => {
    dispatch(updateDiscussionGroup(discussionGroupId));
    dispatch(requestConversations());
    return getConversations(getState().conversations.get('discussionGroupId'))
      .then(convos => dispatch(receiveConversations(Immutable.fromJS(convos))))
      .catch(err => dispatch(fetchingConversationsError(err)));
  };
}

function addMessage(subject, conversationId, blob) {
  return (dispatch, getState) => {
    const discussionGroupId = getState().conversations.get('discussionGroupId');
    dispatch(postMessage());
    let conversation;
    if (conversationId) {
      const currentConversations = getState().conversations.get('conversations');
      conversation = currentConversations.find(item => item.get('pk') === conversationId).toJS();
    } else {
      conversation = null;
    }
    return uploadVideo(blob, subject, conversation, discussionGroupId)
      .then(convo => {
        dispatch(messagePosted(Immutable.fromJS(convo)));
      })
      .catch(err => dispatch(messageFailedToPost(err)));
  };
}

// Reducer

const initialConversationState = Immutable.Map({
  isFetching: false,
  isPosting: false,
  lastUpdated: 0,
  discussionGroupId: -1,
  conversations: Immutable.List(),
  error: Immutable.Map(),
});

function convoComparator(c1, c2) {
  const c1msg = c1.get('last_updated');
  const c2msg = c2.get('last_updated');
  if (c1msg < c2msg) {
    return 1;
  } else if (c1msg > c2msg) {
    return -1;
  }
  return 0;
}

function conversations(state = initialConversationState, action) {
  switch (action.type) {
    case UPDATE_DISCUSSION_GROUP:
      return state.merge({
        discussionGroupId: action.discussionGroupId,
      });
    case FETCHING_CONVERSATIONS:
      return state.merge({
        isFetching: action.isFetching,
        error: {},
      });
    case FETCHING_CONVERSATIONS_SUCCESS:
      return state.merge({
        isFetching: action.isFetching,
        lastUpdated: action.lastUpdated,
        conversations: action.conversations.sort(convoComparator),
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
      const idx = state.get('conversations')
                       .findIndex(c => c.get('pk') === action.conversation.get('pk'));
      if (idx !== -1) {
        state = state.updateIn(['conversations', idx], () => action.conversation);
      } else {
        state = state.update('conversations', arr => arr.push(action.conversation));
      }
      return state.merge({
        isPosting: action.isPosting,
        lastUpdated: action.lastUpdated,
        conversations: state.get('conversations').sort(convoComparator),
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

export { conversations, fetchConversationsForDiscussionGroup, addMessage };
