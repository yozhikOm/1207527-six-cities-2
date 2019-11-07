import * as React from 'react';
import PropTypes from "prop-types";
import {PureComponent} from 'react';
import {MainPage} from '../main-page/main-page.jsx';
import {PropertyDetails} from '../property-details/property-details.jsx';

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  _getPageScreen(appProperties) {
    switch (location.pathname) {
      case `/`:
        return <MainPage offers={appProperties.mainPageProps.offers}/>;
      case `/offer`:
        return <PropertyDetails {...appProperties.propertyDetailsProps.offer}/>;
    }
    return null;
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
          photos: PropTypes.arrayOf(
              PropTypes.shape({
                src: PropTypes.string,
              })
          )
        })
    )
  }),
  propertyCardProps: {
    offer: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      photos: PropTypes.arrayOf(
          PropTypes.shape({
            src: PropTypes.string,
          })
      )
    })
  }
};
/* App.propTypes = {
  offers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        photos: PropTypes.arrayOf(
            PropTypes.shape({
              src: PropTypes.string,
            })
        )
      })
  )
};*/

export {App};
