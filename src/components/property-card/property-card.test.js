import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {PropertyCard} from './property-card.jsx';
import renderer from 'react-test-renderer';
import {offers} from '../../mocks/offers.js';

it(`PropertyCard компонент рендерится корректно`, () => {
  const propertyCardComponent = renderer.create(
      <MemoryRouter>
        <PropertyCard offer={offers[0]} cardMouseEnterHandler={jest.fn()}/>
      </MemoryRouter>).toJSON();
  expect(propertyCardComponent).toMatchSnapshot();
});
