import React from 'react';
import {PropertyDetails} from './property-details.jsx';
import ShallowRenderer from 'react-test-renderer/shallow';
import {offers} from '../../mocks/offers.js';

it(`PropertyDetails компонент рендерится корректно`, () => {
  const renderer = new ShallowRenderer();

  renderer.render(
      <PropertyDetails
        currentCityCoords={[52.38333, 4.9]}
        offer={offers[0]}
        neighboringOffers={[offers[1], offers[2]]}
      />);

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
