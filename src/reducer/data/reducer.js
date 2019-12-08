import {ActionType} from './action-type.js';
import initialState from './initial-state.js';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_ALL_OFFERS: return Object.assign({}, state, {
      allOffers: action.payload
    });

    case ActionType.CHANGE_LOADING_STATE: return Object.assign({}, state, {
      isOffersLoading: action.payload
    });

    case ActionType.CHANGE_CITY: return Object.assign({}, state, {
      currentCity: action.payload
    });

    case ActionType.GET_OFFERS_LIST: return Object.assign({}, state, {
      offers: action.payload
    });

    case ActionType.GET_CITIES_LIST: return Object.assign({}, state, {
      cities: action.payload
    });

    case ActionType.LOAD_OFFER_REVIEWS: return Object.assign({}, state, {
      reviews: action.payload
    });

    case ActionType.SORT_OFFERS: return Object.assign({}, state, {
      sortBy: action.payload
    });
  }

  return state;
};

export {reducer};

