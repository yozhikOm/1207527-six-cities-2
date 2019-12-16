import React from 'react';
import {Header} from './header.jsx';
import ShallowRenderer from 'react-test-renderer/shallow';

it(`Header компонент рендерится корректно`, () => {
  const renderer = new ShallowRenderer();

  const mockUserInfo = {
    id: 2,
    name: `fakeUser`,
    avatarUrl: ``,
    isPro: true
  };

  renderer.render(<Header
    isAuthorizationRequired={true}
    userInfo={mockUserInfo}
  />);

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
