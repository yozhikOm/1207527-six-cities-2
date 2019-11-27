import React from 'react';
import {PropertyDetails} from './property-details.jsx';
import ShallowRenderer from 'react-test-renderer/shallow';
import {offers} from '../../mocks/offers.js';

it(`PropertyDetails компонент рендерится корректно`, () => {
  const renderer = new ShallowRenderer();

  renderer.render(
      <PropertyDetails
        currentCityCoords={[offers[0].city.location.latitude, offers[0].city.location.longitude]}
        offer={offers[0]}
        neighboringOffers={[offers[1], offers[2]]}
      />);

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
