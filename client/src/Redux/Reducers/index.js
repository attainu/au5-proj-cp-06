import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';

import { AuthReducer } from './authReducer';
import { PostReducer } from './postReducer';

const initalState = {};
const rootReducer = combineReducers({
  AuthReducer,
  PostReducer
});

const middlewares = [thunk];

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
