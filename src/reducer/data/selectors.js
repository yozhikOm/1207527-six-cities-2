import {createSelector} from "reselect";
import NameSpace from "../name-spaces";

const NAME_SPACE = NameSpace.DATA;

export const getAllOffers = (state) => {
  return state[NAME_SPACE].allOffers;
};

export const getCurrentCity = (state) => {
  return state[NAME_SPACE].currentCity;
};

export const getOffersByCity = createSelector(
    getCurrentCity,
    getAllOffers,
    (city, allOffers) => allOffers.filter((offer) => offer.city.name === city.title)
);

/* const getCities = (state) => {
    return [...new Set(state[NAME_SPACE].offers.map((item) => item.city.name))].sort();
  };*/

// export const getCities = (state) => {
//     const cities = Array.from(new Set(state[NAME_SPACE].allOffers.map((offer) => offer.city.name)))
//       .map((name) => {
//         let item = state[NAME_SPACE].allOffers.find((o) => o.city.name === name);
//         return {
//           title: name,
//           coordinates: [item.city.location.latitude, item.city.location.longitude]
//         };
//       });

//     return cities;
//   };

export const getCities = createSelector(
    getAllOffers,
    const cities = Array.from(new Set(state[NAME_SPACE].allOffers.map((offer) => offer.city.name)))
      .map((name) => {
        let item = state[NAME_SPACE].allOffers.find((o) => o.city.name === name);
        return {
          title: name,
          coordinates: [item.city.location.latitude, item.city.location.longitude]
        };
      });

    return cities;
);
