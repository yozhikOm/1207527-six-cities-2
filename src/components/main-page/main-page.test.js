import React from 'react';
import {MainPage} from './main-page.jsx';
import ShallowRenderer from 'react-test-renderer/shallow';
import {offers} from '../../mocks/offers.js';

it(`MainPage компонент рендерится корректно`, () => {
  const renderer = new ShallowRenderer();
  renderer.render(<MainPage offers={offers}/>);

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
