import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {PropertyCard} from './property-card.jsx';
import {offers} from '../../mocks/offers.js';

Enzyme.configure({adapter: new Adapter()});

describe(`Enzyme тест наведения мыши на карточку жилья`, () => {
  it(`Callback func calls with correct data`, () => {
    const mockProperty = offers[0];

    const mockHandler = jest.fn();

    const wrapper = shallow(
        <PropertyCard
          offerInfo={mockProperty}
          cardMouseEnterHandler={mockHandler}
          activeItemID={-1}
        />
    );

    const propertyCard = wrapper.find(`.cities__place-card`).first();
    const evt = {
      currentTarget: {
        id: propertyCard.id
      }
    };

    propertyCard.simulate(`mouseenter`, evt);
    expect(mockHandler).toHaveBeenCalledWith(Number(evt.currentTarget.id));
  });
});
