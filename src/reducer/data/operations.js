import * as ActionCreator from './action-creator.js';
import {prepareOffers, prepareReviews} from './prepare-data.js';
import initialState from './initial-state.js';

export const loadAllOffers = () => (dispatch, _, api) => {
  return api.get(`/hotels`)
      .then(({data}) => {
        const preparedData = prepareOffers(data);
        dispatch(ActionCreator.loadAllOffers(preparedData));

        const initialCity = preparedData[Math.floor((Math.random() * preparedData.length))].city;

        let currentCity = {
          title: initialCity.name,
          coordinates: [initialCity.location.latitude, initialCity.location.longitude]
        };
        dispatch(ActionCreator.changeCity(currentCity));
        dispatch(ActionCreator.getCitiesList(preparedData));
        dispatch(ActionCreator.getOffersList(currentCity, preparedData, initialState.sortBy));
        dispatch(ActionCreator.changeLoadingState(false));
      });
};

export const loadOfferReviews = (id) => (dispatch, _, api) => {
  return api.get(`/comments/` + id)
      .then(({data}) => {
        const sortedData = data.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
        const preparedData = prepareReviews(sortedData);
        dispatch(ActionCreator.loadOfferReviews(preparedData));
      });
};

export const postReview = (offerId, rating, comment) => (dispatch, _, api) => {
  dispatch(ActionCreator.postReview(rating, comment));

  return api.post(`/comments/` + offerId, {rating, comment})
    .then(({data}) => {
      const sortedData = data.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
      const preparedData = prepareReviews(sortedData);
      dispatch(ActionCreator.loadOfferReviews(preparedData));
    });
};

export const loadFavorites = () => (dispatch, _, api) => {
  return api.get(`/favorite`)
    .then(({data}) => {
      const preparedData = prepareOffers(data);
      dispatch(ActionCreator.loadFavorites(preparedData));
    });
};

export const setFavoriteStatus = (offerId, status, _onSuccessSetFavorite) => (dispatch, _, api) => {
  dispatch(ActionCreator.setFavoriteStatus(offerId, status));

  return api.post(`/favorite/${offerId}/${status}`)
    .then(({data}) => {
      _onSuccessSetFavorite();
      const preparedData = prepareOffers([data]);
      dispatch(ActionCreator.loadFavorites(preparedData));
    });
};
