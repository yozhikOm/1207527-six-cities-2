import MockAdapter from 'axios-mock-adapter';
import createAPI from '../../api.js';
import {ActionType, Operation} from "./user.js";

describe(`Reducer works correctly`, () => {
  it(`Should make a correct API call to /login`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const authenticateUser = Operation.authenticateUser();

    const mockData1 = {
      email: `test.user1@gmail.com`,
      password: `12345678`,
    };

    apiMock
      .onPost(`/login`, mockData1)
      .reply(200);

    return authenticateUser(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(5);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_ALL_OFFERS,
          payload: {
            avatarUrl: `/static/avatar/3.jpg`,
            email: `test.user1@gmail.com`,
            id: 1,
            isPro: false,
            name: `test.user1`,
          },
        });
      });
  });


});
