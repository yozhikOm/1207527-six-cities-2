import React from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from "../../reducer.js";
import {PageScreen} from '../page-screen/page-screen.jsx';

const App = (props) => {
  if(props.isOffersLoading){
    return null;
  }
  return <PageScreen {...props}/>;
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  allOffers: state.allOffers,
  isOffersLoading: state.isOffersLoading,
  currentCity: state.currentCity,
  offers: state.offers,
  cities: state.cities,
  isAuthorizationRequired: state.isAuthorizationRequired,
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick: (currentCity, allOffers) => {
    dispatch(ActionCreator.changeCity(currentCity));
    dispatch(ActionCreator.getOffersList(currentCity, allOffers));
  }

});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
