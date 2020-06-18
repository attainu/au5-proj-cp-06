import { SIGN_IN } from '../ActionCreators/Types';

const authState = {
  email: ''
};

export const AuthReducer = (state = authState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
