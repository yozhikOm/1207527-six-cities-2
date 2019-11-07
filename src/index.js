import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './components/app/app.jsx';
import {offers} from './mocks/offers.js';

const init = (propertyOffers) => {
  ReactDOM.render(
      <App offers={propertyOffers}/>,
      document.querySelector(`#root`)
  );
};

init(offers);
