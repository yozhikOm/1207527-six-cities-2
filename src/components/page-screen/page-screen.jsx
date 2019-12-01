import React from 'react';
import PropTypes from 'prop-types';
import {MainPage} from '../main-page/main-page.jsx';
import {PropertyDetails} from '../property-details/property-details.jsx';

import withActiveItem from '../../hocs/with-active-item/with-active-item.js';

const PropertyDetailsWrapped = withActiveItem(PropertyDetails);

const PageScreen = (props) => {
  const {
    allOffers, currentCity, cities, onCityClick,
    offers, reviews, loadOfferReviews,
    isAuthorizationRequired, userInfo,
  } = props;

  switch (location.pathname) {
    case `/`:
      if (isAuthorizationRequired) {
        // return <SignIn isAuthorizationRequired={isAuthorizationRequired} authenticateUser={authenticateUser}/>;
      }
      return <MainPage
        currentCity={currentCity}
        cities={cities}
        offers={offers}
        onCityClick={(city) => {
          onCityClick(city, allOffers);
        }}
        isAuthorizationRequired={isAuthorizationRequired}
        userInfo={userInfo}
      />;
    /* case `/login`:
      return <SignIn />; */
    case `/offer`:
      const id = 1;

      // !!! не понимаю, как переключить текущий город на новый
      //
      const currOffer = allOffers.find((item) => item.id === id);
      let cityName = currOffer.city.name;
      let currCity = cities.find((c) => c.title === cityName);
      const currCityOffers = allOffers.filter((it) => it.city.name === currCity.title);
      // ///////////////////////////////////////////////////////

      const neighboringOffers = getNeighboringOffers(currOffer, currCityOffers);
      return <PropertyDetailsWrapped
        currentCityCoords={currentCity.coordinates}
        offer={currOffer}
        reviews={reviews}
        neighboringOffers={neighboringOffers}
        isAuthorizationRequired={isAuthorizationRequired}
        userInfo={userInfo}
        loadOfferReviews={loadOfferReviews}
      />;
  }
  return null;
};

function getNeighboringOffers(offer, cityOffers) {
  // здесь должна быть какая-то логика, по которой определяем, что эти предложения по соседству
  // пока выберем все, кроме текущего
  const neighboringOffers = cityOffers.filter((it) => it !== offer);
  return neighboringOffers;
}

PageScreen.propTypes = {
  allOffers: PropTypes.array,
  currentCity: PropTypes.shape({
    title: PropTypes.string.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number, PropTypes.number).isRequired,
  }),
  cities: PropTypes.array,
  offers: PropTypes.array,
  onCityClick: PropTypes.func,
  isAuthorizationRequired: PropTypes.bool,
  userInfo: PropTypes.shape({
    id: PropTypes.id,
    name: PropTypes.string,
    avatarUrl: PropTypes.string,
    isPro: PropTypes.bool
  }),
  loadOfferReviews: PropTypes.func,
  reviews: PropTypes.array,
};

export {PageScreen};
