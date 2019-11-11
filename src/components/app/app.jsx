import * as React from 'react';
import PropTypes from "prop-types";
import {PureComponent} from 'react';
import {MainPage} from '../main-page/main-page.jsx';
import {PropertyDetails} from '../property-details/property-details.jsx';
import {offers} from '../../mocks/offers.js';

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  _getPageScreen(appProperties) {
    switch (location.pathname) {
      case `/`:
        return <MainPage offers={appProperties.mainPageProps.offers}/>;
      case `/offer`:
        const offer = appProperties.propertyDetailsProps.offer;
        const neighboringOffers = this._getNeighboringOffers(offer);
        return <PropertyDetails offer={offer} neighboringOffers={neighboringOffers}/>;
    }
    return null;
  }

  _getNeighboringOffers(currentOffer) {
    // здесь должна быть какая-то логика, по которой определяем, что эти предложения по соседству
    // пока выберем все, кроме текущего
    const neighboringOffers = offers.filter((offer) => offer !== currentOffer);
    return neighboringOffers;
  }

  render() {
    return <React.Fragment>{this._getPageScreen(this.props)}</React.Fragment>;
  }
}

App.propTypes = {
  mainPageProps: PropTypes.shape({
    offers: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          title: PropTypes.string.isRequired,
          type: PropTypes.string.isRequired,
          price: PropTypes.number.isRequired,
          description: PropTypes.string.isRequired,
          photos: PropTypes.arrayOf(
              PropTypes.shape({
                src: PropTypes.string,
              })
          ),
          coordinates: PropTypes.arrayOf(PropTypes.number, PropTypes.number).isRequired,
          host: PropTypes.string.isRequired,
        })
    )
  }),
  propertyCardProps: PropTypes.shape({
    offer: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      photos: PropTypes.arrayOf(
          PropTypes.shape({
            src: PropTypes.string,
          })
      ),
      coordinates: PropTypes.arrayOf(PropTypes.number, PropTypes.number).isRequired,
      host: PropTypes.string.isRequired,
    })
  })
};

export {App};
