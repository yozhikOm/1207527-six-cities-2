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

export const getCities = (state) => {
  return state[NAME_SPACE].cities;
};

export const getIsAuthorizationRequired = (state) => {
  return state[NAME_SPACE].isAuthorizationRequired;
};
