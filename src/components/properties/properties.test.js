import React from 'react';
import {Properties} from './properties.jsx';
import ShallowRenderer from 'react-test-renderer/shallow';
import {offers} from '../../mocks/offers.js';

it(`Properties компонент рендерится корректно`, () => {
  const renderer = new ShallowRenderer();

  const mockCity = offers[0].city;

  renderer.render(<Properties
    offers={offers}
    setActiveItem={jest.fn()}
    currentCity={{
      title: mockCity.name,
      coordinates: [mockCity.location.latitude, mockCity.location.longitude]
    }}
  />);

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
