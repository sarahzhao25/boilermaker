//entry point for client js
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import '../public/index.css';
//Now here's the cool part. In your browser JavaScript, you can import './path/to/index.css' into a JavaScript file - webpack will then include it in the build path. However, because we've told webpack to build any files ending with .css using the style-related loaders, it will transform our css files into a file that it loads directly onto the DOM from our bundle.js.

render(
  <Provider store={store}>
    <h1>Hi!</h1>
  </Provider>,
  document.getElementById('app')
)
