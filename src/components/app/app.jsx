import * as React from 'react';
// import PropTypes from "prop-types";
import {PureComponent} from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from "../../reducer.js";

import {MainPage} from '../main-page/main-page.jsx';
import {PropertyDetails} from '../property-details/property-details.jsx';
// import {offers} from '../../mocks/offers.js';

class App extends PureComponent {
  _getPageScreen(appProperties) {
    const {allOffers, currentCity, cities, offers, onCityClick} = appProperties;
    switch (location.pathname) {
      case `/`:
        return <MainPage currentCity={currentCity} cities={cities} offers={offers} onCityClick={(city) => {
          onCityClick(city, allOffers);
        }}/>;
      case `/offer`:
        const id = 2;
        const offer = offers.find((item) => item.id === id);
        const neighboringOffers = this._getNeighboringOffers(offer);
        return <PropertyDetails
          currentCityCoords={currentCity.coordinates}
          offer={offer}
          neighboringOffers={neighboringOffers}
        />;
    }
    return null;
  }

  // _getNeighboringOffers(currentOffer) {
  // здесь должна быть какая-то логика, по которой определяем, что эти предложения по соседству
  // пока выберем все, кроме текущего
  // const neighboringOffers = offers.filter((offer) => offer !== currentOffer);
  // return neighboringOffers;
  //  return null;
  // }

  render() {
    return <React.Fragment>{this._getPageScreen(this.props)}</React.Fragment>;
  }
}

/* App.propTypes = {
  mainPageProps: PropTypes.shape({
    offers: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          location: PropTypes.shape({
            city: PropTypes.string,
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
        })
    )
  }),
  propertyCardProps: PropTypes.shape({
    offer: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      location: PropTypes.shape({
        city: PropTypes.string,
        coordinates: PropTypes.arrayOf(PropTypes.number, PropTypes.number).isRequired,
      }).isRequired,
      type: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      photos: PropTypes.arrayOf(
          PropTypes.shape({
            src: PropTypes.string,
          })
      ),
      host: PropTypes.string.isRequired,
    })
  })
}; */

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  currentCity: state.currentCity,
  offers: state.offers,
  cities: state.cities
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick: (currentCity, allOffers) => {
    dispatch(ActionCreator.changeCity(currentCity));
    dispatch(ActionCreator.getOffersList(currentCity, allOffers));
  }

});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
