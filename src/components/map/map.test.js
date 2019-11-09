import React from 'react';
import {Map} from './map.jsx';
import ShallowRenderer from 'react-test-renderer/shallow';
import {offers} from '../../mocks/offers.js';

it(`Map компонент рендерится корректно`, () => {
  const mockCoorsArray = offers.map((offer) => offer.coordinates);

  const renderer = new ShallowRenderer();
  renderer.render(<Map coordinatesArray={mockCoorsArray} />);

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
