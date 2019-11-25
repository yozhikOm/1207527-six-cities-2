import api from './api.js';
// import {offers} from './mocks/offers';
import {citiesCoordinates} from './mocks/cities-coordinates';

const initialState = {
  allOffers: [],
  currentCity: citiesCoordinates[0],
  offers: getOffers(citiesCoordinates[0], initialState.allOffers),
  cities: getCities(initialState.allOffers),
};

const getOffers = (city, allOffers) =>
  allOffers.filter((offer) => offer.location.city === city.title);

const getCities = (allOffers) => {
  const cities = [...new Set(allOffers.map((offer) => offer.location.city))];
  const citiesCoords = [];
  cities.map((city) => {
    const coords = citiesCoordinates.find((item) => item.title === city);
    citiesCoords.push(coords);
  });
  return citiesCoords;
};

const ActionCreator = {
  loadAllOffers: (allOffers) => ({
    type: `LOAD_ALL_OFFERS`,
    payload: allOffers
  }),

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

    case `LOAD_ALL_OFFERS`:
      return Object.assign({}, state, {
        allOffers: action.payload
      });
  }
  return state;
};

const Operation = {
  loadAllOffers: () => (dispatch) => {
    return api.get(`/getAllOffers`)
      .then((response) => {
        dispatch(ActionCreator.loadAllOffers(response.data));
      });
    /* ruturn fetch(`/api/getAllOffers`)
      .then((response) => response.json())
      .then((allOffers) => {
        dispatch(ActionCreator.loadAllOffers(allOffers))
      });*/
  },

  /* authorize: () => (dispatch) => {
    return fetch(`/api/login`)
      .then();
  }*/

};

export {
  ActionCreator,
  getCities,
  getOffers,
  reducer,
  Operation,
};
