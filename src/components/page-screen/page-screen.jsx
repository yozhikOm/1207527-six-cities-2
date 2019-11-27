import React from 'react';
import PropTypes from 'prop-types';
import {MainPage} from '../main-page/main-page.jsx';
import {PropertyDetails} from '../property-details/property-details.jsx';
import {AuthorizationScreen} from '../authorization-screen/authorization-screen.jsx';

import withActiveItem from '../../hocs/with-active-item/with-active-item.js';

const PropertyDetailsWrapped = withActiveItem(PropertyDetails);

const PageScreen = (props) => {
  const {allOffers, currentCity, cities, offers, onCityClick, isAuthorizationRequired} = props;
  switch (location.pathname) {
    case `/`:
      if (isAuthorizationRequired) {
        return <AuthorizationScreen />;
      }
      return <MainPage
        currentCity={currentCity}
        cities={cities}
        offers={offers}
        onCityClick={(city) => {
          onCityClick(city, allOffers);
        }}
      />;
    case `/login`:
      return <AuthorizationScreen />;
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
        neighboringOffers={neighboringOffers}
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
};

export {PageScreen};
