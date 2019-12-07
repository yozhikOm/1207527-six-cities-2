import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Redirect} from "react-router-dom";

const withCheckAuthorization = (Component) => {
  class WithCheckAuthorization extends PureComponent {
    // constructor(props) {
    //   super(props);

    //   this.state = {
    //     isAuthenticated: false
    //   };
    //   this._setIsAuthenticated = this._setIsAuthenticated.bind(this);
    // }

    _isAuthenticated() {
      const {isAuthorizationRequired} = this.props;
      return !isAuthorizationRequired;
    }

    // _setActiveItem(id) {
    //   this.setState({activeItemID: id});
    //   console.log(id);
    // }

    render() {
    //   const {isAuthorizationRequired} = this.props;

      //   const {activeItemID} = this.state;
      //   return <Component {...this.props}
      //     activeItemID={activeItemID}
      //     setActiveItem={this._setActiveItem}
      //   />;

      // const loginErrorMessage = (
      //     <div>
      //         Please <a href="/login">login</a> in order to view this part of the application.
      //     </div>
      // );

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
