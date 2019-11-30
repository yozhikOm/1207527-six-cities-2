import {ActionType} from './action-type.js';

export const ActionCreator = {
  requireAuthorization: (status) => ({
    type: ActionType.REQUIRE_AUTHORIZATION,
    payload: status,
  }),

  signIn: (email, password) => ({
    type: ActionType.SIGN_IN,
    payload: {email, password},
  }),

  setUserInfo: (userInfo) => ({
    type: ActionType.SET_USER_INFO,
    payload: {
      userId: userInfo.id,
      userName: userInfo.name,
      userAvatarUrl: userInfo.avatar_url,
      isUserPro: userInfo.is_pro
    },
  }),
};
