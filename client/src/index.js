import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { logger } from 'redux-logger';
import { BrowserRouter } from 'react-router-dom';

import { rootReducer } from './Redux/Reducers';
import App from './App';

const middlewares = [thunk];

if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger);
}

let store = createStore(rootReducer, applyMiddleware(...middlewares));
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
