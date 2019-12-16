import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as ActionCreatorData from '../../reducer/data/action-creator.js';
import * as DataOperation from '../../reducer/data/operations.js';
import * as UserOperation from '../../reducer/user/operations.js';
import {getAllOffers, getIsOffersLoading, getCurrentCity, getOffers,
  getCitiesState, getReviews, getFavorites, getSortBy} from '../../reducer/data/selectors';
import {getIsAuthorizationRequired, getUserInfo} from '../../reducer/user/selectors';
import {PageScreen} from '../page-screen/page-screen.jsx';

class App extends PureComponent {

  componentDidMount() {
    this.props.loadAllOffers();
  }

  render() {
    if (this.props.isOffersLoading) {
      return null;
    }
    return <PageScreen {...this.props}/>;
  }
}

App.propTypes = {
  loadAllOffers: PropTypes.func,
  isAuthorizationRequired: PropTypes.bool,
  authenticateUser: PropTypes.func,
  isOffersLoading: PropTypes.bool,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  allOffers: getAllOffers(state),
  isOffersLoading: getIsOffersLoading(state),
  currentCity: getCurrentCity(state),
  offers: getOffers(state),
  cities: getCitiesState(state),
  isAuthorizationRequired: getIsAuthorizationRequired(state),
  userInfo: getUserInfo(state),
  reviews: getReviews(state),
  favorites: getFavorites(state),
  sortBy: getSortBy(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadAllOffers: () => dispatch(DataOperation.loadAllOffers()),

  authenticateUser: (email, password, redirect) => {
    dispatch(UserOperation.authenticateUser(email, password, redirect));
  },
  onCityClick: (currentCity, allOffers, sortBy) => {
    dispatch(ActionCreatorData.changeCity(currentCity));
    dispatch(ActionCreatorData.getOffersList(currentCity, allOffers, sortBy));
  },
  loadOfferReviews: (id) => {
    dispatch(DataOperation.loadOfferReviews(id));
  },
  postReview: (offerId, rating, comment) => {
    dispatch(DataOperation.postReview(offerId, rating, comment));
  },
  loadFavorites: () => {
    dispatch(DataOperation.loadFavorites());
  },
  setFavoriteStatus: (offerId, status, onSuccessSetFavorite) => {
    dispatch(DataOperation.setFavoriteStatus(offerId, status, onSuccessSetFavorite));
  },
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
