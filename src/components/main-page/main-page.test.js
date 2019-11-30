import React from 'react';
import {MainPage} from './main-page.jsx';
import ShallowRenderer from 'react-test-renderer/shallow';
import {offers} from '../../mocks/offers.js';

it(`MainPage компонент рендерится корректно`, () => {
  const renderer = new ShallowRenderer();

  const mockCitiesCoordinates = [
    {
      "title": `Amsterdam`,
      "coordinates": [52.38333, 4.9],
    },
    {
      "title": `Berlin`,
      "coordinates": [52.5200, 13.4050],
    },
    {
      "title": `New York`,
      "coordinates": [40.7128, -74.0060],
    },
  ];

  renderer.render(<MainPage
    currentCity={mockCitiesCoordinates[0]}
    cities={mockCitiesCoordinates}
    offers={offers}
    onCityClick={jest.fn()}
  />);

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
