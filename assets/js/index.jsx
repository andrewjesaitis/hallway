import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import Immutable from 'immutable';

import { ui } from './redux/ui';
import { conversations } from './redux/conversations';
import ConversationListContainer from './containers/ConversationListContainer';

require('../css/main.less');

const loggerMiddleware = createLogger({
  stateTransformer: (state) => {
    const newState = {};

    for (let i of Object.keys(state)) {
      if (Immutable.Iterable.isIterable(state[i])) {
        newState[i] = state[i].toJS();
      } else {
        newState[i] = state[i];
      }
    };

    return newState;
  },
});

const store = createStore(
  combineReducers({
    ui,
    conversations,
  }),
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

ReactDOM.render(
  <Provider store={store}>
    <ConversationListContainer />
  </Provider>,
  document.getElementById('react-app')
);
