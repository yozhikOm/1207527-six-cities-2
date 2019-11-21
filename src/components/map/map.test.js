import React from 'react';
import {Map} from './map.jsx';
import ShallowRenderer from 'react-test-renderer/shallow';
import {offers} from '../../mocks/offers.js';

it(`Map компонент рендерится корректно`, () => {
  const mockCoorsArray = offers.map((offer) => offer.location.coordinates);
  const mockCurrCityCoords = [42, 45];

  const renderer = new ShallowRenderer();
  renderer.render(<Map currentCityCoords={mockCurrCityCoords} coordinatesArray={mockCoorsArray} />);

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
