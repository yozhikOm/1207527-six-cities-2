import React from 'react';
import {ReviewForm} from './review-form.jsx';
import ShallowRenderer from 'react-test-renderer/shallow';

it(`ReviewForm компонент рендерится корректно`, () => {
  const renderer = new ShallowRenderer();

  renderer.render(<ReviewForm
    offerId={1}
    postReview={jest.fn()}
  />);

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
