import { SIGN_IN } from './Types';

export const LoggedIn = (data) => {
  return {
    type: SIGN_IN,
    payload: data
  };
};
