import React from 'react';
import {Menu} from './menu.jsx';
import ShallowRenderer from 'react-test-renderer/shallow';
import {cities} from '../../mocks/cities.js';

it(`Menu компонент рендерится корректно`, () => {
  const renderer = new ShallowRenderer();

  renderer.render(<Menu
    cities={cities}
    onCityClick={jest.fn()}
  />);

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
