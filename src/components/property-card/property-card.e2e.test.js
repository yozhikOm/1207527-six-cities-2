import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {PropertyCard} from './property-card.jsx';

Enzyme.configure({adapter: new Adapter()});

describe(`Enzyme тест наведения мыши на карточку жилья`, () => {
  it(`Callback func calls with correct data`, () => {
    const mockProperty = {
      "id": 1,
      "title": `Cozy house amsterdam`,
      "type": `House`,
      "price": 650,
      "photos": [
        {
          "src": `img/apartment-01.jpg`
        },
      ]
    };

    const mockHandler = jest.fn();

    const wrapper = shallow(<PropertyCard offerInfo={mockProperty} cardMouseEnterHandler={mockHandler}/>);

    const propertyCard = wrapper.find(`.cities__place-card`).first();
    const evt = {
      currentTarget: {
        id: propertyCard.id
      }
    };

    propertyCard.simulate(`mouseenter`, evt);
    expect(mockHandler).toHaveBeenCalledWith(evt.currentTarget.id);
  });
});
