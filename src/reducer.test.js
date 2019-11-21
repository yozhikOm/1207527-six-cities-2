import {reducer, ActionCreator} from './reducer.js';
import {offers} from './mocks/offers.js';
// import {citiesCoordinates} from './mocks/cities-coordinates.js';

describe(`Action creators work correctly`, () => {
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
