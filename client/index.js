//entry point for client js
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';

render(
  <Provider store={store}>
    <h1>Hi!</h1>
  </Provider>,
  document.getElementById('app')
)
