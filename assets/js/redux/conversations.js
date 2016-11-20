import Immutable from 'immutable';

import { getConversations, uploadVideo, deleteMessageOnServer } from '../utils/api';

const UPDATE_DISCUSSION_GROUP = 'UPDATE_DISCUSSION_GROUP';
const FETCHING_CONVERSATIONS = 'FETCHING_CONVERSATIONS';
const FETCHING_CONVERSATIONS_SUCCESS = 'FETCHING_CONVERSATIONS_SUCCESS';
const FETCHING_CONVERSATIONS_ERROR = 'FETCHING_CONVERSATIONS_ERROR';
const POST_MESSAGE = 'POST_MESSAGE';
const POST_MESSAGE_SUCCESS = 'POST_MESSAGE_SUCCESS';
const POST_MESSAGE_ERROR = 'POST_MESSAGE_ERROR';
const DELETE_MESSAGE = 'DELETE_MESSAGE';
const DELETE_MESSAGE_SUCCESS = 'DELETE_MESSAGE_SUCCESS';
const DELETE_MESSAGE_ERROR = 'DELETE_MESSAGE_ERROR';


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

function deleteMessage() {
  return {
    type: DELETE_MESSAGE,
    isDeleting: true,
  }
}

function deleteMessageSuccess(convoId, convoIdx, msgId, msgIdx, shouldDeleteConvo) {
  return {
    type: DELETE_MESSAGE_SUCCESS,
    isDeleting: false,
    lastUpdated: Date.now(),
    convoId, 
    convoIdx, 
    msgId, 
    msgIdx, 
    shouldDeleteConvo
  }
}    

function deleteMessageFailed(error) {
  return {
    type: DELETE_MESSAGE_ERROR,
    isDeleting: false,
    lastUpdated: Date.now(),
    error
  }
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

function removeMessage(convoId, convoIdx, msgId, msgIdx, shouldDeleteConvo) {
  return (dispatch) => {
    dispatch(deleteMessage());
    return deleteMessageOnServer(msgId)
       .then(() => dispatch(deleteMessageSuccess(convoId, convoIdx, msgId, msgIdx, shouldDeleteConvo)))
       .catch(err => dispatch(deleteMessageFailed(err)));
  }
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

function sortByLastUpdated(c1, c2) {
  const d1 = c1.get('last_updated');
  const d2 = c2.get('last_updated');
  if (d1 < d2) {
    return 1;
  } else if (d1 > d2) {
    return -1;
  }
  return 0;
}

function sortByDateCreated(c1, c2) {
  //note that signs are flipped compared to lastUpdated
  const d1 = c1.get('date_created');
  const d2 = c2.get('date_created');
  if (d1 > d2) {
    return 1;
  } else if (d1 < d2) {
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
      action.conversations = action.conversations.map(c => c.update('messages', arr => arr.sort(sortByDateCreated)));
      return state.merge({
        isFetching: action.isFetching,
        lastUpdated: action.lastUpdated,
        conversations: action.conversations.sort(sortByLastUpdated),
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
      action.conversation = action.conversation.update('messages', arr => arr.sort(sortByDateCreated));
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
        conversations: state.get('conversations').sort(sortByLastUpdated),
      });
    case POST_MESSAGE_ERROR:
      return state.merge({
        isPosting: action.isPosting,
        error: action.error,
      });
    case DELETE_MESSAGE:
      return state.merge({
        isDeleting: action.isDeleting,
        error: {}
      })
    case DELETE_MESSAGE_SUCCESS:
      debugger;
      if(action.shouldDeleteConvo) {
        state = state.update('conversations', arr => arr.delete(action.convoIdx));
      } else {
        state = state.updateIn(['conversations', action.convoIdx, 'messages'], 
                         arr => arr.delete(action.msgIdx));
      }
      return state.merge({
        isDeleting: action.isDeleting,
        lastUpdated: action.lastUpdated,
        error: {}
      });
    case DELETE_MESSAGE_ERROR:
      return state.merge({
        isDeleting: action.isDeleting,
        lastUpdated: action.lastUpdated,
        error: action.error
      });      
    default:
      return state;
  }
}

export { conversations, fetchConversationsForDiscussionGroup,
         addMessage, removeMessage };
