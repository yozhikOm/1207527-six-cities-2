import axios from 'axios';
import combineReducers from './reducer/reducer.js';

const createAPI = (dispatch) => {
  const api = axios.create({
    baseURL: `https://es31-server.appspot.com/six-cities`,
    timeout: 1000 * 5,
    withCredentials: true,
  });

  const onSuccess = (response) => response;
  const onFail = (err) => {
    if (err.response.status === 400) {
      dispatch(combineReducers.ActionCreator.requireAuthorization(true));
    }
    if (err.response.status === 401) {
      dispatch(combineReducers.ActionCreator.requireAuthorization(true));
    }
    if (err.response.status === 403) {
      dispatch(combineReducers.ActionCreator.requireAuthorization(true));
    }
    return err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export default createAPI;
