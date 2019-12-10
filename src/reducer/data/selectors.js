// import {createSelector} from "reselect";
import NameSpace from "../name-spaces";

const NAME_SPACE = NameSpace.DATA;

export const getAllOffers = (state) => {
  return state[NAME_SPACE].allOffers;
};

export const getIsOffersLoading = (state) => {
  return state[NAME_SPACE].isOffersLoading;
};

export const getCurrentCity = (state) => {
  return state[NAME_SPACE].currentCity;
};

export const getOffers = (state) => {
  return state[NAME_SPACE].offers;
};

export const getCitiesState = (state) => {
  return state[NAME_SPACE].cities;
};

export const getReviews = (state) => {
  return state[NAME_SPACE].reviews;
};

export const getFavorites = (state) => {
  return state[NAME_SPACE].favorites;
};

export const getSortBy = (state) => {
  return state[NAME_SPACE].sortBy;
};


export const getOffersByCity = (city, allOffers) =>
  allOffers.filter((offer) => offer.city.name === city.title);

export const getCities = (allOffers) => {
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
/* export const getCities = createSelector(
    getAllOffers,
    (allOffers) => {
      return Array.from(new Set(allOffers.map((offer) => offer.city.name)))
        .map((name) => {
          let item = allOffers.find((o) => o.city.name === name);
          return {
            title: name,
            coordinates: [item.city.location.latitude, item.city.location.longitude]
          };
        });
    }
);*/
