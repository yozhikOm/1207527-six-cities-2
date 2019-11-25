import React from 'react';
import {Map} from './map.jsx';
import ShallowRenderer from 'react-test-renderer/shallow';
import {offers} from '../../mocks/offers.js';

it(`Map компонент рендерится корректно`, () => {
  const mockCurrCityCoords = [42, 45];

  const mockOffersArrayForMap = offers.map((offer) => (
    {
      id: offer.id,
      coordinates: offer.location.coordinates
    }));

  const renderer = new ShallowRenderer();
  renderer.render(<Map
    currentCityCoords={mockCurrCityCoords}
    offersArray={mockOffersArrayForMap}
    activeItemID={-1}/>
  );

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
