import React from 'react';
import {App} from './app.jsx';
import ShallowRenderer from 'react-test-renderer/shallow';

it(`App компонент рендерится корректно`, () => {
  const renderer = new ShallowRenderer();
  renderer.render(<App />);

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
