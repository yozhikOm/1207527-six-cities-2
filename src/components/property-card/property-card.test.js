import React from 'react';
import {PropertyCard} from './property-card.jsx';
import renderer from 'react-test-renderer';
import {offers} from '../../mocks/offers.js';

it(`PropertyCard компонент рендерится корректно`, () => {
  const propertyCardComponent = renderer.create(<PropertyCard offerInfo={offers[0]}/>).toJSON();
  expect(propertyCardComponent).toMatchSnapshot();
});
