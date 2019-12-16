import React from 'react';
import {PageScreen} from './page-screen.jsx';
import ShallowRenderer from 'react-test-renderer/shallow';
import {offers} from '../../mocks/offers.js';

it(`PageScreen компонент рендерится корректно`, () => {
  const renderer = new ShallowRenderer();

  const mockUserInfo = {
    id: 2,
    name: `fakeUser`,
    avatarUrl: ``,
    isPro: true
  };

  renderer.render(<PageScreen
    isAuthorizationRequired={true}
    userInfo={mockUserInfo}
    authenticateUser={jest.fn()}
    loadFavorites={jest.fn()}
    favorites={offers}
  />);

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
