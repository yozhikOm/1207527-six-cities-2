import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {compose} from 'recompose';
import App from './components/app/app.jsx';
import createAPI from './api';
import reducer from './reducer/reducer.js';

const init = () => {
  const api = createAPI((...args) => store.dispatch(...args));
  const store = createStore(
      reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
      )
  );

  ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
