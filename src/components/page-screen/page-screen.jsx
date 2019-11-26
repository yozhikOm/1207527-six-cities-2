import React from 'react';
import PropTypes from 'prop-types';
import {MainPage} from '../main-page/main-page.jsx';
import {PropertyDetails} from '../property-details/property-details.jsx';
import {AuthorizationScreen} from '../authorization-screen/authorization-screen.jsx';

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
      const id = 6;

      // !!! не понимаю, как переключить текущий город на новый
      //
      const currOffer = allOffers.find((item) => item.id === id);
      let cityName = currOffer.location.city;
      let currCity = cities.find((c) => c.title === cityName);
      const currCityOffers = allOffers.filter((it) => it.location.city === currCity.title);
      // ///////////////////////////////////////////////////////

      const neighboringOffers = getNeighboringOffers(currOffer, currCityOffers);
      return <PropertyDetails
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
  allOffers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        location: PropTypes.shape({
          city: PropTypes.string.isRequired,
          coordinates: PropTypes.arrayOf(PropTypes.number, PropTypes.number).isRequired,
        }).isRequired,
        title: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        photos: PropTypes.arrayOf(
            PropTypes.shape({
              src: PropTypes.string,
            })
        ),
        host: PropTypes.string.isRequired,
      }).isRequired
  ),
  currentCity: PropTypes.shape({
    title: PropTypes.string.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number, PropTypes.number).isRequired,
  }),
  cities: PropTypes.array,
  offers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        location: PropTypes.shape({
          city: PropTypes.string.isRequired,
          coordinates: PropTypes.arrayOf(PropTypes.number, PropTypes.number).isRequired,
        }).isRequired,
        title: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        photos: PropTypes.arrayOf(
            PropTypes.shape({
              src: PropTypes.string,
            })
        ),
        host: PropTypes.string.isRequired,
      }).isRequired
  ),
  onCityClick: PropTypes.func,
  isAuthorizationRequired: PropTypes.bool,
};

export {PageScreen};
