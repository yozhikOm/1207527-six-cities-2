import * as ActionCreator from './action-creator.js';

describe(`Reducer works correctly`, () => {

  it(`Action creator for signing in returns correct action`, () => {
    const email = `test@mail.com`;
    const password = `12345678`;

    expect(ActionCreator.signIn(email, password)).toEqual({
      type: `SIGN_IN`,
      payload: {email, password},
    });
  });


  it(`Action creator for setting user info returns correct action`, () => {
    const mockUserInfo = {
      id: 1,
      name: `mockName`,
      avatarUrl: ``,
      isPro: true
    };

    expect(ActionCreator.setUserInfo(mockUserInfo)).toEqual({
      type: `SET_USER_INFO`,
      payload: {
        userId: mockUserInfo.id,
        userName: mockUserInfo.name,
        userAvatarUrl: mockUserInfo.avatar_url,
        isUserPro: mockUserInfo.is_pro
      },
    });
  });

});
