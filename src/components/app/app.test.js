import React from 'react';
import {App} from './app.jsx';
import renderer from 'react-test-renderer';
import {offers} from '../../mocks/offers.js';

it(`App компонент рендерится корректно`, () => {
  const appComponent = renderer.create(<App offers={offers} />).toJSON();
  expect(appComponent).toMatchSnapshot();
});
