import {offers} from './mocks/offers';
import {citiesCoordinates} from './mocks/cities-coordinates';

const getOffers = (city, allOffers) =>
  allOffers.filter((offer) => offer.location.city === city.title);

/* const getAllCities = (allOffers) =>
  allOffers.every((it, i) => it === (
    question.answers[i].genre === question.genre
  ));*/

const getCities = (allOffers) => {
  const cities = [...new Set(allOffers.map((offer) => offer.location.city))];
  const citiesCoords = [];
  cities.map((city) => {
    const coords = citiesCoordinates.find((item) => item.title === city);
    citiesCoords.push(coords);
  });
  return citiesCoords;
};
// const getCities = (allOffers) =>
//  cities = Array.from(allOffers, offer => offer.location.city);
// .filter((x, i, a) => a.indexOf(x) == i)

const ActionCreator = {

  changeCity: (city) => ({
    type: `CHANGE_CITY`,
    payload: city
  }),

  getOffersList: (city, allOffers) => ({
    type: `GET_OFFERS_LIST`,
    payload: getOffers(city, allOffers),
  }),

  getCitiesList: (allOffers) => ({
    type: `GET_CITIES_LIST`,
    payload: getCities(allOffers),
  }),
};

const initialState = {
  currentCity: citiesCoordinates[0],
  offers: getOffers(citiesCoordinates[0], offers),
  cities: getCities(offers),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `CHANGE_CITY`: return Object.assign({}, state, {
      currentCity: action.payload
    });

    case `GET_OFFERS_LIST`: return Object.assign({}, state, {
      offers: action.payload
    });

    case `GET_CITIES_LIST`: return Object.assign({}, state, {
      cities: action.payload
    });
  }
  return state;
};

export {
  ActionCreator,
  getCities,
  getOffers,
  reducer,
};
