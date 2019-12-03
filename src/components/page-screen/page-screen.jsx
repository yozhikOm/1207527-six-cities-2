import React from 'react';
import {Switch, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import {MainPage} from '../main-page/main-page.jsx';
import {PropertyDetails} from '../property-details/property-details.jsx';
import {SignIn} from '../sign-in/sign-in.jsx';

import withActiveItem from '../../hocs/with-active-item/with-active-item.js';

const PropertyDetailsWrapped = withActiveItem(PropertyDetails);

const PageScreen = (props) => {

  return <Switch>
    <Route path='/' exact render={() => <MainPage {...props}/>} />

    <Route path='/login' exact render={() =>
      <SignIn isAuthorizationRequired={props.isAuthorizationRequired} authenticateUser={props.authenticateUser} />
    }/>

    <Route path='/offer/:id' exact render={(routeProps) =>
      <PropertyDetailsWrapped {...Object.assign({}, routeProps, props)}/>
    }/>

    <Route
      render={() => (
        <div style={{textAlign: `center`}}>

          <h1>
          404
            <br />
            <small>Page not found</small>
          </h1>
        </div>
      )}
    />
  </Switch>;
};
PageScreen.propTypes = {
  isAuthorizationRequired: PropTypes.bool,
  authenticateUser: PropTypes.func,
};
export {PageScreen};
