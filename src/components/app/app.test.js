import React from 'react';
import {App} from './app.jsx';
import renderer from 'react-test-renderer';


it(`App компонент рендерится корректно`, () => {
  const appComponent = renderer.create(<App />).toJSON();
  expect(appComponent).toMatchSnapshot();
});
