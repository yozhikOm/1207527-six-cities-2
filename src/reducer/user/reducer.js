import {ActionType} from './action-type.js';
import initialState from './initial-state.js';

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

export {reducer};
