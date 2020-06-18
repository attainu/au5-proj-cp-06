import { combineReducers } from 'redux';

import { AuthReducer } from './authReducer';
import { PostReducer } from './postReducer';

export const rootReducer = combineReducers({
  AuthReducer,
  PostReducer
});
