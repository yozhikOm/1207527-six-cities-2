import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import reducer from '../../reducer';
import {getAllOffers, getCurrentCity, getCities} from "../../reducer/data/selectors";
import {PageScreen} from '../page-screen/page-screen.jsx';

const App = (props) => {
  if (props.isOffersLoading) {
    return null;
  }
  return <PageScreen {...props}/>;
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  allOffers: getAllOffers(state),
  isOffersLoading: state.isOffersLoading,
  currentCity: getCurrentCity(state),
  offers: state.offers,
  cities: state.cities, // getCities(state),
  isAuthorizationRequired: state.isAuthorizationRequired,
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick: (currentCity, allOffers) => {
    dispatch(reducer.ActionCreator.changeCity(currentCity));
    dispatch(reducer.ActionCreator.getOffersList(currentCity, allOffers));
  }

});

App.propTypes = {
  isOffersLoading: PropTypes.bool,
};

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
