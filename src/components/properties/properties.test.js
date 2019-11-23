import React from 'react';
import {Properties} from './properties.jsx';
import renderer from 'react-test-renderer';
import {offers} from '../../mocks/offers.js';

it(`Properties компонент рендерится корректно`, () => {
  const propertiesComponent = renderer.create(
      <Properties
        items={offers}
        setActiveItem={jest.fn()}
      />).toJSON();
  expect(propertiesComponent).toMatchSnapshot();
});
