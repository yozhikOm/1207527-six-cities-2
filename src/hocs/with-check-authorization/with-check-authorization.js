import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Redirect} from "react-router-dom";

const withCheckAuthorization = (Component) => {
  class WithCheckAuthorization extends PureComponent {

    _isAuthenticated() {
      const {isAuthorizationRequired} = this.props;
      return !isAuthorizationRequired;
    }

    render() {
      return (
        <div>
          { this._isAuthenticated() ?
            <Component {...this.props} />
            :
            <Redirect to="/login" />
          }
        </div>
      );
    }
  }

  WithCheckAuthorization.propTypes = {
    isAuthorizationRequired: PropTypes.bool,
  };

  return WithCheckAuthorization;
};

export default withCheckAuthorization;
