import * as ActionCreator from './action-creator.js';

export const authenticateUser = (email, password, redirect) => (dispatch, _, api) => {
  dispatch(ActionCreator.signIn(email, password));

  return api.post(`/login`, {email, password})
    .then(({data}) => {
      dispatch(ActionCreator.setUserInfo(data));
      dispatch(ActionCreator.requireAuthorization(false));
      redirect();
    });
};
