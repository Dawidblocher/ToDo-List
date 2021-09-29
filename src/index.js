import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'views/Root';
import store from 'store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
