import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';

import userReducer from './userReducer';
import dataReducer from './dataReducer';
import uiReducer from './uiReducer';

const initalState = {};
const middlewares = [thunk];

const rootReducer = combineReducers({
  user: userReducer,
  data: dataReducer,
  UI: uiReducer
});

if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger);
}

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

const store = createStore(rootReducer, initalState, enhancer);

export default store;
