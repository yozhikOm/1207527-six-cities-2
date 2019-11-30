import {ActionType} from './action-type.js';
import {ActionCreator} from './action-creator.js';
// import NameSpace from '../name-spaces';
// const NAME_SPACE = NameSpace.USER;

const initialState = {
  isAuthorizationRequired: true,
  email: ``,
  password: ``,
  userInfo: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRE_AUTHORIZATION: return Object.assign({}, state, {
      isAuthorizationRequired: action.payload
    });

    case ActionType.SIGN_IN: return Object.assign({}, state, {
      email: action.payload.email,
      password: action.payload.password,
    });

    case ActionType.SET_USER_INFO: return Object.assign({}, state, {
      userInfo: {
        id: action.payload.userId,
        name: action.payload.userName,
        avatarUrl: action.payload.userAvatarUrl,
        isPro: action.payload.isUserPro
      }
    });
  }

  return state;
};

const Operation = {
  authenticateUser: (email, password) => (dispatch, _, api) => {
    dispatch(ActionCreator.signIn(email, password));

    return api.post(`/login`, {email, password})
        .then(({data}) => {
          dispatch(ActionCreator.setUserInfo(data));
          dispatch(ActionCreator.requireAuthorization(false));
        });
  },

//   authorization: (email, password) => (dispatch, _, api) => {
//     return api.post(`/login`, {
//       email,
//       password
//     })
//       .then((response) => {
//         if (response.status === 200) {
//           dispatch(ActionCreator.saveUserData(response.data));
//           dispatch(ActionCreator.authorization(true));
//         }
//       });
//   }
// };
};

export {reducer, Operation};
