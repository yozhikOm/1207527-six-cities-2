import MockAdapter from 'axios-mock-adapter';
import createAPI from '../../api.js';
import {ActionType} from './action-type.js';
import * as Operation from "./operations.js";
import {prepareOffers} from './prepare-data';
import {offers} from '../../mocks/offers.js';

describe(`Reducer works correctly`, () => {
  it(`Should make a correct API call to /hotels`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const allOffersLoader = Operation.loadAllOffers();

    apiMock
      .onGet(`/hotels`)
      .reply(200, offers);

    return allOffersLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(5);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_ALL_OFFERS,
          payload: prepareOffers(offers),
        });
      });
  });
});
