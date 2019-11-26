import axios from 'axios';
import {ActionCreator} from './reducer.js';

const createAPI = (dispatch) => {
  const api = axios.create({
    baseURL: `https://htmlacademy-react-2.appspot.com/six-cities`,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    if (err.response.status === 403) {
      dispatch(ActionCreator.requireAuthorization());
    }

    return err;
  };

  api.interceptors.response.use(onSuccess, onFail);
};

export default createAPI;
