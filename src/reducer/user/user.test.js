import MockAdapter from 'axios-mock-adapter';
import createAPI from '../../api.js';

describe(`Reducer works correctly`, () => {
  it(`Should make a correct API call to /login`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);

    const mockData = {
      email: `test.user1@gmail.com`,
      password: `12345678`,
    };
    apiMock.onPost(`/login`, mockData).reply(200);
    apiMock.onAny().passThrough();

  });

});
