const initialState = {
  allOffers: [],
  isOffersLoading: true,
};

const ActionType = {
  LOAD_ALL_OFFERS: `LOAD_ALL_OFFERS`,
  CHANGE_LOADING_STATE: `CHANGE_LOADING_STATE`
};

const ActionCreator = {
  loadAllOffers: (allOffers) => ({
    type: ActionType.LOAD_ALL_OFFERS,
    payload: allOffers
  }),

  changeLoadingState: (isLoading) => ({
    type: ActionType.CHANGE_LOADING_STATE,
    payload: isLoading
  })
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

const Operation = {
  loadAllOffers: () => (dispatch, _, api) => {
    return api.get(`/hotels`)
        .then(({data}) => {
          const preparedData = prepareData(data);
          dispatch(ActionCreator.loadAllOffers(preparedData));
          //   dispatch(ActionCreator.getCitiesList(preparedData));
          //   let initialCity = preparedData[0].city;
          //   let currentCity = {
          //     title: initialCity.name,
          //     coordinates: [initialCity.location.latitude, initialCity.location.longitude]
          //   };
          //   dispatch(ActionCreator.changeCity(currentCity));
          //   dispatch(ActionCreator.getOffersList(currentCity, preparedData));
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
  }

  return state;
};

export {
  ActionCreator,
  ActionType,
  // getCities,
  // getOffersByCity,
  prepareData,
  reducer,
  Operation,
};
