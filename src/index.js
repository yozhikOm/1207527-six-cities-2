import {createStore} from "redux";
import {Provider} from "react-redux";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import {offers} from './mocks/offers.js';
import {reducer} from "./reducer.js";


/* const appProps = {
  mainPageProps: {
    offers: {offers}.offers
  },
  propertyDetailsProps: {
    offer: {offers}.offers[1],
  }
};*/
const init = () => {
  const store = createStore(reducer);

  ReactDOM.render(
      <Provider store={store}>
        <App allOffers={offers}/>
      </Provider>,
      document.querySelector(`#root`)
  );
};

// init(appProps);
init();
