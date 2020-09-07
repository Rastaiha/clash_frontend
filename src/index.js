import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import Root from './root/Root';
import configureStore from './redux/store/configureStore';
import './statics/styles/index.css';
import Messages from './Messages';
import { initWebsocket } from './redux/actions/socketActions';

const persistedState = localStorage.getItem('rastaReactState')
  ? JSON.parse(localStorage.getItem('rastaReactState'))
  : {};
const store = configureStore(persistedState);
store.subscribe(() => {
  localStorage.setItem(
    'rastaReactState',
    JSON.stringify({
      account: { ...store.getState().account },
    })
  );
});

initWebsocket();

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <Messages />
      <Root />
    </Provider>
  </Router>,
  document.getElementById('root')
);
