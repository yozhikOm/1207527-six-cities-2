import React from 'react';
import {Property} from './property.jsx';
import renderer from 'react-test-renderer';

it(`Property компонент рендерится корректно`, () => {
  const propertyComponent = renderer.create(<Property/>).toJSON();
  expect(propertyComponent).toMatchSnapshot();
});
