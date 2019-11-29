import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator as ActionCreatorData} from '../../reducer/data/data.js';
import {Operation as UserOperation} from '../../reducer/user/user.js';
import {getAllOffers, getIsOffersLoading, getCurrentCity, getOffers, getCities} from '../../reducer/data/selectors';
import {getIsAuthorizationRequired, getUserInfo} from '../../reducer/user/selectors';
import {SignIn} from '../sign-in/sign-in.jsx';
import {PageScreen} from '../page-screen/page-screen.jsx';

const App = (props) => {
  const {isAuthorizationRequired, authenticateUser} = props;
  if (isAuthorizationRequired) {
    return <SignIn isAuthorizationRequired={isAuthorizationRequired} authenticateUser={authenticateUser}/>;
  }
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
  userInfo: getUserInfo(state),
});

const mapDispatchToProps = (dispatch) => ({
  authenticateUser: (email, password) => {
    // dispatch(ActionCreatorUser.authenticateUser(email, password));
    dispatch(UserOperation.authenticateUser(email, password));
  },
  onCityClick: (currentCity, allOffers) => {
    dispatch(ActionCreatorData.changeCity(currentCity));
    dispatch(ActionCreatorData.getOffersList(currentCity, allOffers));
  }
});

App.propTypes = {
  isAuthorizationRequired: PropTypes.bool,
  authenticateUser: PropTypes.func,
  isOffersLoading: PropTypes.bool,
};

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
