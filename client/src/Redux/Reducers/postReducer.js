import { POST_ADD } from '../ActionCreators/Types';

const postState = {
  title: '',
  body: ''
};

export const PostReducer = (state = postState, action) => {
  switch (action.type) {
    case POST_ADD:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
