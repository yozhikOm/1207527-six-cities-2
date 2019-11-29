import {ActionType} from './action-type.js';
import {getCities, getOffersByCity} from './selectors.js';

export const ActionCreator = {
  loadAllOffers: (allOffers) => ({
    type: ActionType.LOAD_ALL_OFFERS,
    payload: allOffers
  }),

  changeLoadingState: (isLoading) => ({
    type: ActionType.CHANGE_LOADING_STATE,
    payload: isLoading
  }),

  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city
  }),

  getOffersList: (city, allOffers) => ({
    type: ActionType.GET_OFFERS_LIST,
    payload: getOffersByCity(city, allOffers),
  }),

  getCitiesList: (allOffers) => ({
    type: ActionType.GET_CITIES_LIST,
    payload: getCities(allOffers),
  }),

  //   getOffersList: (offers) => ({
  //     type: ActionType.GET_OFFERS_LIST,
  //     payload: offers,
  //   }),

//   getCitiesList: (cities) => ({
//     type: ActionType.GET_CITIES_LIST,
//     payload: cities,
//   }),
};
