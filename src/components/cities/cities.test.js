import React from 'react';
import {Cities} from './cities.jsx';
import ShallowRenderer from 'react-test-renderer/shallow';
import {cities} from '../../mocks/cities.js';

it(`Cities компонент рендерится корректно`, () => {
  const renderer = new ShallowRenderer();

  renderer.render(<Cities
    currentCity={cities[0]}
    cities={cities}
    onCityClick={jest.fn()}
  />);

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
