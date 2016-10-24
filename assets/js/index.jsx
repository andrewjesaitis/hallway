import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import { ui } from './redux/ui';
import { conversations } from './redux/conversations';
import ConversationListContainer from './containers/ConversationListContainer';
import ActionButtonContainer from './containers/ActionButtonContainer';

require('../css/main.less');

const loggerMiddleware = createLogger();

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
