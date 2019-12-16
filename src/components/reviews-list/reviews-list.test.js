import React from 'react';
import {ReviewsList} from './reviews-list.jsx';
import ShallowRenderer from 'react-test-renderer/shallow';
import {reviews} from '../../mocks/reviews.js';

it(`ReviewsList компонент рендерится корректно`, () => {
  const renderer = new ShallowRenderer();

  renderer.render(<ReviewsList
    isAuthorizationRequired={false}
    offerId={1}
    reviews={reviews}
    postReview={jest.fn()}
  />);

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
