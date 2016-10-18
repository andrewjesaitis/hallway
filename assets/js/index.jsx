import React from 'react';
import ReactDOM from 'react-dom';
import ConversationListContainer from './containers/ConversationListContainer';
import ActionButtonContainer from './containers/ActionButtonContainer';

ReactDOM.render(
  <ConversationListContainer />,
  document.getElementById('react-app')
);

ReactDOM.render(
  <ActionButtonContainer />,
  document.getElementById('react-action-button')
);
