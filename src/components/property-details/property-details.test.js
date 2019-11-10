import React from 'react';
import {PropertyDetails} from './property-details.jsx';
// import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import {offers} from '../../mocks/offers.js';

it(`PropertyDetails компонент рендерится корректно`, () => {
  const renderer = new ShallowRenderer();
  renderer.render(<PropertyDetails {...offers[0]}/>);

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
  // const propertyDetailsComponent = renderer.create(<PropertyDetails {...offers[0]}/>).toJSON();
  // expect(propertyDetailsComponent).toMatchSnapshot();
});
