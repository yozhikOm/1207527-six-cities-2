// import {offers} from './mocks/offers';
// import {citiesCoordinates} from './mocks/cities-coordinates';

const getOffersByCity = (city, allOffers) =>
  allOffers.filter((offer) => offer.city.name === city.title);

const getCities = (allOffers) => {
  const cities = Array.from(new Set(allOffers.map((offer) => offer.city.name)))
    .map((name) => {
      let item = allOffers.find((o) => o.city.name === name);
      return {
        title: name,
        coordinates: [item.city.location.latitude, item.city.location.longitude]
      };
    });

  return cities;
};

const initialState = {
  allOffers: [],
  isOffersLoading: true,
  currentCity: null,
  offers: [], // getOffers(citiesCoordinates[0], offers),
  cities: [], // getCities(offers),
  isAuthorizationRequired: false,
};

const ActionType = {
  LOAD_ALL_OFFERS: `LOAD_ALL_OFFERS`,
  CHANGE_LOADING_STATE: `CHANGE_LOADING_STATE`,
  CHANGE_CITY: `CHANGE_CITY`,
  GET_OFFERS_LIST: `GET_OFFERS_LIST`,
  GET_CITIES_LIST: `GET_CITIES_LIST`,
  REQUIRE_AUTHORIZATION: `REQUIRE_AUTHORIZATION`,
};

const ActionCreator = {
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

  requireAuthorization: (status) => ({
    type: ActionType.REQUIRE_AUTHORIZATION,
    payload: status,
  }),
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

    case ActionType.REQUIRE_AUTHORIZATION: return Object.assign({}, state, {
      isAuthorizationRequired: action.payload
    });
  }

  return state;
};

const Operation = {
  loadAllOffers: () => (dispatch, _, api) => {
    return api.get(`/hotels`)
      .then(({data}) => {

        dispatch(ActionCreator.loadAllOffers(data));
        dispatch(ActionCreator.getCitiesList(data));
        let initialCity = data[0].city;
        let currentCity = {
          title: initialCity.name, 
          coordinates: [initialCity.location.latitude, initialCity.location.longitude]
        };
        dispatch(ActionCreator.changeCity(currentCity));
        dispatch(ActionCreator.getOffersList(currentCity, data));
        dispatch(ActionCreator.changeLoadingState(false));
      });
  },


};

export {
  ActionCreator,
  ActionType,
  getCities,
  getOffersByCity as getOffers,
  reducer,
  Operation,
};
