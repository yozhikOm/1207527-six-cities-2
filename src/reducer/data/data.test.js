import MockAdapter from 'axios-mock-adapter';
import createAPI from '../../api.js';
import {ActionType} from './action-type.js';
import {ActionCreator} from './action-creator.js';
import {Operation} from "./data.js";
import {prepareData} from './selectors.js';
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
          payload: prepareData(offers),
        });
      });
  });

  it(`Action creator for changing step returns correct action`, () => {
    expect(ActionCreator.changeCity(`Moscow`)).toEqual({
      type: `CHANGE_CITY`,
      payload: `Moscow`,
    });
  });

  it(`Action creator for getting cities list returns correct action`, () => {
    expect(ActionCreator.getCitiesList(offers)).toEqual({
      type: `GET_CITIES_LIST`,
      payload: [
        {
          title: `Cologne`,
          coordinates: [50.938361, 6.959974]
        },
        {
          title: `Brussels`,
          coordinates: [50.846557, 4.351697],
        },
        {
          title: `Dusseldorf`,
          coordinates: [51.225402, 6.776314],
        },
      ],
    });
  });

});
