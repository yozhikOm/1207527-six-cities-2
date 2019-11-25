import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withActiveItem from './with-active-item.js';

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withActiveItem(MockComponent);

it(`Тестируем WithActiveItem`, () => {
  const wrapped = mount(<MockComponentWrapped />);

  wrapped.instance()._setActiveItem(1);
  expect(wrapped.state().activeItemID).toEqual(1);

  wrapped.instance()._setActiveItem(10);
  expect(wrapped.state().activeItemID).toEqual(10);

});

