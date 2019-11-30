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

export const prepareData = (allOffers) => {
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
