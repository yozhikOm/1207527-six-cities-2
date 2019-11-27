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

const prepareData = (allOffers) => {
  const preparedData = allOffers.map((offer) => {
    return {
      id: offer.id,
      city: {
        name: offer.city.name,
        location: {
          latitude: offer.city.location.latitude,
          longitude: offer.city.location.longitude,
          zoom: offer.city.location.zoom,
        }
      },
      previewImage: offer.preview_image,
      images: offer.images,
      title: offer.title,
      isFavorite: offer.is_favorite,
      isPremium: offer.is_premium,
      rating: offer.rating,
      type: offer.type,
      bedrooms: offer.bedrooms,
      maxAdults: offer.max_adults,
      price: offer.price,
      goods: offer.goods,
      host: {
        id: offer.host.id,
        name: offer.host.name,
        isPro: offer.host.is_pro,
        avatarUrl: offer.host.avatar_url,
      },
      description: offer.description,
      location: {
        latitude: offer.location.latitude,
        longitude: offer.location.longitude,
        zoom: offer.location.zoom,
      },
    };
  });

  return preparedData;
};

const initialState = {
  allOffers: [],
  isOffersLoading: true,
  currentCity: null,
  offers: [],
  cities: [],
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
        const preparedData = prepareData(data);
        dispatch(ActionCreator.loadAllOffers(preparedData));
        dispatch(ActionCreator.getCitiesList(preparedData));
        let initialCity = preparedData[0].city;
        let currentCity = {
          title: initialCity.name,
          coordinates: [initialCity.location.latitude, initialCity.location.longitude]
        };
        dispatch(ActionCreator.changeCity(currentCity));
        dispatch(ActionCreator.getOffersList(currentCity, preparedData));
        dispatch(ActionCreator.changeLoadingState(false));
      });
  },


};

export {
  ActionCreator,
  ActionType,
  getCities,
  getOffersByCity,
  prepareData,
  reducer,
  Operation,
};
