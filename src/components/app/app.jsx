import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer/data/data.js';
import {getAllOffers, getIsOffersLoading, getCurrentCity, getOffers, getCities} from '../../reducer/data/selectors';
import {getIsAuthorizationRequired} from '../../reducer/user/selectors';
import {PageScreen} from '../page-screen/page-screen.jsx';

const App = (props) => {
  if (props.isOffersLoading) {
    return null;
  }
  return <PageScreen {...props}/>;
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  allOffers: getAllOffers(state),
  isOffersLoading: getIsOffersLoading(state),
  currentCity: getCurrentCity(state),
  offers: getOffers(state),
  cities: getCities(state),
  isAuthorizationRequired: getIsAuthorizationRequired(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick: (currentCity, allOffers) => {
    dispatch(ActionCreator.changeCity(currentCity));
    dispatch(ActionCreator.getOffersList(currentCity, allOffers));
  }
});

App.propTypes = {
  isOffersLoading: PropTypes.bool,
};

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
