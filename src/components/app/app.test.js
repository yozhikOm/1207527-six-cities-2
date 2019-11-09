import React from 'react';
import {App} from './app.jsx';
import renderer from 'react-test-renderer';
import {offers} from '../../mocks/offers.js';

it(`App компонент рендерится корректно`, () => {
  const appProps = {
    mainPageProps: {
      offers: {offers}.offers
    },
    propertyCardProps: {
      offer: {offers}.offers[0]
    }
  };
  const appComponent = renderer.create(<App {...appProps} />).toJSON();
  expect(appComponent).toMatchSnapshot();
});
