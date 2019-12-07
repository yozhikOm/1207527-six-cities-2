import React from 'react';
import PropTypes from 'prop-types';

const Favorites = (props) => {
  // const {isAuthorizationRequired, history} = props;
  // if (isAuthorizationRequired) {
  //   history.push(`/login`);
  // }
  return <div>favorites</div>;
};

Favorites.propTypes = {
  history: PropTypes.object,
  isAuthorizationRequired: PropTypes.bool,
  // authenticateUser: PropTypes.func,
};

export {Favorites};
