import React from 'react';
import {Review} from './review.jsx';
import renderer from 'react-test-renderer';
import {reviews} from '../../mocks/reviews.js';

it(`Review компонент рендерится корректно`, () => {
  const reviewComponent = renderer.create(<Review review={reviews[0]}/>).toJSON();
  expect(reviewComponent).toMatchSnapshot();
});
