import React from 'react';
import {PropertyDetails} from './property-details.jsx';
import renderer from 'react-test-renderer';
import {offers} from '../../mocks/offers.js';

it(`PropertyDetails компонент рендерится корректно`, () => {
  const propertyDetailsComponent = renderer.create(<PropertyDetails {...offers[0]}/>).toJSON();
  expect(propertyDetailsComponent).toMatchSnapshot();
});
