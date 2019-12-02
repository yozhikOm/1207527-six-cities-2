import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as ActionCreatorData from '../../reducer/data/action-creator.js';
import * as DataOperation from '../../reducer/data/operations.js';
import * as UserOperation from '../../reducer/user/operations.js';
import {getAllOffers, getIsOffersLoading, getCurrentCity, getOffers, getCitiesState, getReviews} from '../../reducer/data/selectors';
import {getIsAuthorizationRequired, getUserInfo} from '../../reducer/user/selectors';
// import {SignIn} from '../sign-in/sign-in.jsx';
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
  // const {isAuthorizationRequired, authenticateUser} = props;
  // if (isAuthorizationRequired) {
  //   return <SignIn isAuthorizationRequired={isAuthorizationRequired} authenticateUser={authenticateUser}/>;
  // }

}


const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  allOffers: getAllOffers(state),
  isOffersLoading: getIsOffersLoading(state),
  currentCity: getCurrentCity(state),
  offers: getOffers(state),
  cities: getCitiesState(state),
  isAuthorizationRequired: getIsAuthorizationRequired(state),
  userInfo: getUserInfo(state),
  reviews: getReviews(state),
  // isReviewsLoading: getIsReviewsLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadAllOffers: () => dispatch(DataOperation.loadAllOffers()),

  authenticateUser: (email, password) => {
    dispatch(UserOperation.authenticateUser(email, password));
  },
  onCityClick: (currentCity, allOffers) => {
    dispatch(ActionCreatorData.changeCity(currentCity));
    dispatch(ActionCreatorData.getOffersList(currentCity, allOffers));
  },
  loadOfferReviews: (id) => {
    dispatch(DataOperation.loadOfferReviews(id));
  },
  postReview: (offerId, rating, comment) => {
    dispatch(DataOperation.postReview(offerId, rating, comment));
  },
});

App.propTypes = {
  loadAllOffers: PropTypes.func,
  isAuthorizationRequired: PropTypes.bool,
  authenticateUser: PropTypes.func,
  isOffersLoading: PropTypes.bool,
};

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
