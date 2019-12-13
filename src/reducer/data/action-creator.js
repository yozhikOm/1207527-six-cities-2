import {ActionType} from './action-type.js';
import {getCities, getOffersByCity} from './selectors.js';

export const loadAllOffers = (allOffers) => ({
  type: ActionType.LOAD_ALL_OFFERS,
  payload: allOffers
});

export const changeLoadingState = (isLoading) => ({
  type: ActionType.CHANGE_LOADING_STATE,
  payload: isLoading
});

export const changeCity = (city) => ({
  type: ActionType.CHANGE_CITY,
  payload: city
});

export const getOffersList = (city, allOffers, sortBy) => ({
  type: ActionType.GET_OFFERS_LIST,
  payload: getOffersByCity(city, allOffers, sortBy),
});

export const getCitiesList = (allOffers) => ({
  type: ActionType.GET_CITIES_LIST,
  payload: getCities(allOffers),
});

export const loadOfferReviews = (reviews) => ({
  type: ActionType.LOAD_OFFER_REVIEWS,
  payload: reviews,
});

export const postReview = (rating, comment) => ({
  type: ActionType.POST_REVIEW,
  payload: {rating, comment}
});

export const loadFavorites = (favorites) => ({
  type: ActionType.LOAD_FAVORITES,
  payload: favorites,
});

export const setFavoriteStatus = (offerId, status) => ({
  type: ActionType.SET_FAVORITE_STATUS,
  payload: {offerId, status},
});

export const changeSortBy = (sortBy) => ({
  type: ActionType.CHANGE_SORT_BY,
  payload: sortBy
});
