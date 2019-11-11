import React from 'react';
import {Review} from './review.jsx';
import renderer from 'react-test-renderer';
// import ShallowRenderer from 'react-test-renderer/shallow';
import {reviews} from '../../mocks/reviews.js';

it(`Review компонент рендерится корректно`, () => {
  // const renderer = new ShallowRenderer();
  // renderer.render(<PropertyDetails {...offers[0]}/>);

  // const result = renderer.getRenderOutput();
  // expect(result).toMatchSnapshot();
  const reviewComponent = renderer.create(<Review review={reviews[0]}/>).toJSON();
  expect(reviewComponent).toMatchSnapshot();
});
