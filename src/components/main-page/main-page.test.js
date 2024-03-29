import React from 'react';
import {MainPage} from './main-page.jsx';
import ShallowRenderer from 'react-test-renderer/shallow';
import {offers} from '../../mocks/offers.js';
import {cities} from '../../mocks/cities.js';

it(`MainPage компонент рендерится корректно`, () => {
  const renderer = new ShallowRenderer();

  renderer.render(<MainPage
    currentCity={cities[0]}
    cities={cities}
    offers={offers}
    onCityClick={jest.fn()}
  />);

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
