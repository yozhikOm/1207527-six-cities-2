const initialState = {
  currentCity: null,
  offers: [],
  cities: [],
};

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

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  GET_OFFERS_LIST: `GET_OFFERS_LIST`,
  GET_CITIES_LIST: `GET_CITIES_LIST`,
};

const ActionCreator = {

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
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

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

export {
  ActionCreator,
  ActionType,
  getCities,
  getOffersByCity,
  reducer,
};
