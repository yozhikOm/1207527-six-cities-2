import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Properties} from './properties.jsx';

Enzyme.configure({adapter: new Adapter()});

const properties = [
  {
    id: 1,
    title: `Some title`,
    type: `Room`,
    price: 88,
    photos: [
      {
        src: `../../public/img/amsterdam.jpg`
      },
    ]
  }
];

describe(`Enzyme тест клика по заголовку жилья`, () => {
  it(`Заголовок нажимается`, () => {
    const mockTitleClick = jest.fn();
    const wrapper = shallow(<Properties items={properties} onClickTitle={mockTitleClick}/>);
    wrapper.find(`h2`).at(0).simulate(`click`);
    expect(mockTitleClick).toHaveBeenCalled();
  });
});
