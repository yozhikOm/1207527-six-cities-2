import React from 'react';
import {SignIn} from './sign-in.jsx';
import ShallowRenderer from 'react-test-renderer/shallow';

it(`SignIn компонент рендерится корректно`, () => {
  const renderer = new ShallowRenderer();

  renderer.render(<SignIn
    isAuthorizationRequired={true}
    authenticateUser={jest.fn()}
  />);

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
