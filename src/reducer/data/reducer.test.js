import * as ActionCreator from './action-creator.js';
import {offers} from '../../mocks/offers.js';

describe(`Reducer works correctly`, () => {

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
