import MockAdapter from 'axios-mock-adapter';
// import api from './api.js';
// import {createAPI} from './api';
import axios from 'axios';
import {reducer, Operation, ActionCreator} from './reducer.js';
import {offers} from './mocks/offers.js';
// import {citiesCoordinates} from './mocks/cities-coordinates.js';

describe(`Action creators work correctly`, () => {
  it(`Should make a correct API call to /hotels`, () => {
    // const api = createAPI((...args) => store.dispatch(...args));
    // const api = createAPI((...args) => jest.fn(...args));

    // const apiMock = new MockAdapter(api);
    const apiMock = new MockAdapter(axios);

    const dispatch = jest.fn();
    const allOffersLoader = Operation.loadAllOffers();

    const mockData = [
      {
        city: {
          name: `Amsterdam`,
          location: {
            latitude: 52.38333,
            longitude: 4.9
          }

        }
      }

    ];

    apiMock
      .onGet(`/hotels`)
      .reply(200, mockData);

    return allOffersLoader(dispatch)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: `LOAD_ALL_OFFERS`,
          payload: mockData,
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
          title: `Amsterdam`,
          coordinates: [52.38333, 4.9]
        },
        {
          title: `Berlin`,
          coordinates: [52.5200, 13.4050],
        },
        {
          title: `New York`,
          coordinates: [40.7128, -74.0060],
        },
      ],
    });
  });

  it(`Reducer should set given value as city`, () => {
    expect(reducer({
      currentCity: `NewYork`,
      offers: [{
        id: 1,
        location: {
          city: `NewYork`,
        },
      }],
      cities: [``],
    }, {
      type: `CHANGE_CITY`,
      payload: `Montreal`
    })).toEqual({
      currentCity: `Montreal`,
      offers: [{
        id: 1,
        location: {
          city: `NewYork`,
        },
      }],
      cities: [``],
    });
  });


});
