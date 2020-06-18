import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';

import { AuthReducer } from './authReducer';
import { PostReducer } from './postReducer';

const rootReducer = combineReducers({
  AuthReducer,
  PostReducer
});

const middlewares = [thunk];

if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger);
}

let store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
