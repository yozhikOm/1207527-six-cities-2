import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './components/app/app.jsx';
import {offers} from './mocks/offers.js';

const appProps = {
  mainPageProps: {
    offers: {offers}.offers
  },
  propertyDetailsProps: {
    offer: {offers}.offers[1],
  }
};
const init = (appProperties) => {
  ReactDOM.render(
      <App {...appProperties}/>,
      document.querySelector(`#root`)
  );
};

init(appProps);
