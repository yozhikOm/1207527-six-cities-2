import {reducer, Operation, ActionCreator, prepareData} from './reducer.js';
import createAPI from './api.js';
import MockAdapter from 'axios-mock-adapter';
import {offers} from './mocks/offers.js';

describe(`Action creators work correctly`, () => {
  it(`Should make a correct API call to /hotels`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);

    const allOffersLoader = Operation.loadAllOffers();

    const mockData = [{"city": {"name": `Cologne`, "location": {"latitude": 50.938361, "longitude": 6.959974, "zoom": 13}}, "preview_image": `https://es31-server.appspot.com/six-cities/static/hotel/2.jpg`, "images": [`https://es31-server.appspot.com/six-cities/static/hotel/2.jpg`, `https://es31-server.appspot.com/six-cities/static/hotel/1.jpg`, `https://es31-server.appspot.com/six-cities/static/hotel/3.jpg`, `https://es31-server.appspot.com/six-cities/static/hotel/4.jpg`, `https://es31-server.appspot.com/six-cities/static/hotel/16.jpg`, `https://es31-server.appspot.com/six-cities/static/hotel/13.jpg`, `https://es31-server.appspot.com/six-cities/static/hotel/6.jpg`, `https://es31-server.appspot.com/six-cities/static/hotel/5.jpg`, `https://es31-server.appspot.com/six-cities/static/hotel/20.jpg`, `https://es31-server.appspot.com/six-cities/static/hotel/17.jpg`, `https://es31-server.appspot.com/six-cities/static/hotel/19.jpg`, `https://es31-server.appspot.com/six-cities/static/hotel/11.jpg`, `https://es31-server.appspot.com/six-cities/static/hotel/14.jpg`, `https://es31-server.appspot.com/six-cities/static/hotel/7.jpg`], "title": `Penthouse, 4-5 rooms + 5 balconies`, "is_favorite": false, "is_premium": false, "rating": 3.6, "type": `apartment`, "bedrooms": 3, "max_adults": 5, "price": 459, "goods": [`Baby seat`, `Fridge`, `Towels`, `Breakfast`, `Air conditioning`, `Washer`, `Dishwasher`, `Laptop friendly workspace`], "host": {"id": 25, "name": `Angelina`, "is_pro": true, "avatar_url": `img/avatar-angelina.jpg`}, "description": `I rent out a very sunny and bright apartment only 7 minutes walking distance to the metro station. The apartment has a spacious living room with a kitchen, one bedroom and a bathroom with mit bath. A terrace can be used in summer.`, "location": {"latitude": 50.957361, "longitude": 6.9509739999999995, "zoom": 16}, "id": 1}];

    apiMock
      .onGet(`/hotels`)
      .reply(200, mockData);

    return allOffersLoader(dispatch, null, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(5);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: `LOAD_ALL_OFFERS`,
          payload: prepareData(mockData),
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
