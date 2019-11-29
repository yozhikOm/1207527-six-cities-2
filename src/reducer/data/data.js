import {ActionType} from './action-type.js';
import {ActionCreator} from './action-creator.js';
import {prepareData} from './selectors.js';

const initialState = {
  allOffers: [],
  isOffersLoading: true,
  currentCity: null,
  offers: [],
  cities: [],
};

const Operation = {
  loadAllOffers: () => (dispatch, _, api) => {
    return api.get(`/hotels`)
    .then(({data}) => {
      const preparedData = prepareData(data);
      dispatch(ActionCreator.loadAllOffers(preparedData));

      let initialCity = preparedData[0].city;
      let currentCity = {
        title: initialCity.name,
        coordinates: [initialCity.location.latitude, initialCity.location.longitude]
      };
      dispatch(ActionCreator.changeCity(currentCity));

      dispatch(ActionCreator.getCitiesList(preparedData));
      dispatch(ActionCreator.getOffersList(currentCity, preparedData));
      dispatch(ActionCreator.changeLoadingState(false));
    });
  },
};

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
  }

  return state;
};

export {reducer, Operation};

