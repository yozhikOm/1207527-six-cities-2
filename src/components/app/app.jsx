import React from 'react';
import {PureComponent} from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from "../../reducer.js";

import {MainPage} from '../main-page/main-page.jsx';
import {PropertyDetails} from '../property-details/property-details.jsx';

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
        const neighboringOffers = null; // this._getNeighboringOffers(offer);
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
