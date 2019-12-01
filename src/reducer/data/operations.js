import * as ActionCreator from './action-creator.js';
import {prepareOffers, prepareReviews} from './prepare-data.js';

export const loadAllOffers = () => (dispatch, _, api) => {
  return api.get(`/hotels`)
      .then(({data}) => {
        const preparedData = prepareOffers(data);
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
};

export const loadOfferReviews = (id) => (dispatch, _, api) => {
  return api.get(`/comments/` + id)
      .then(({data}) => {
        const preparedData = prepareReviews(data);
        dispatch(ActionCreator.loadOfferReviews(preparedData));
      });
};

