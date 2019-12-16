import React from 'react';
import {Favorites} from './favorites.jsx';
import ShallowRenderer from 'react-test-renderer/shallow';
import {offers} from '../../mocks/offers.js';

it(`Favorites компонент рендерится корректно`, () => {
  const renderer = new ShallowRenderer();

  const mockUserInfo = {
    id: 2,
    name: `fakeUser`,
    avatarUrl: ``,
    isPro: true
  };

  renderer.render(<Favorites
    favorites={offers}
    isAuthorizationRequired={false}
    userInfo={mockUserInfo}
    onSetActiveItem={jest.fn()}
  />);

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
