import React from 'react';
import {NoProperties} from './no-properties.jsx';
import ShallowRenderer from 'react-test-renderer/shallow';

it(`NoProperties компонент рендерится корректно`, () => {
  const renderer = new ShallowRenderer();

  renderer.render(<NoProperties
    title={`Some title`}
  />);

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
