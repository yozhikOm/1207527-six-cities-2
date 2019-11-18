import React from 'react';
import {MainPage} from './main-page.jsx';
import ShallowRenderer from 'react-test-renderer/shallow';
import {offers} from '../../mocks/offers.js';
import {citiesCoordinates} from '../../mocks/cities-coordinates.js';

it(`MainPage компонент рендерится корректно`, () => {
  const renderer = new ShallowRenderer();
  const mockCurrCity = {
    title: `Amsterdam`,
    coordinates: [0, 0],
  };

  renderer.render(<MainPage
    currentCity={mockCurrCity}
    cities={citiesCoordinates}
    offers={offers}
    onCityClick={jest.fn()}
  />);

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
