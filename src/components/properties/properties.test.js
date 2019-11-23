import React from 'react';
import {Properties} from './properties.jsx';
import ShallowRenderer from 'react-test-renderer/shallow';
import {offers} from '../../mocks/offers.js';
import {citiesCoordinates} from '../../mocks/cities-coordinates.js';

it(`Properties компонент рендерится корректно`, () => {
  const renderer = new ShallowRenderer();

  /* const propertiesComponent = renderer.create(
      <Properties
        offers={offers}
        setActiveItem={jest.fn()}
        currentCity={citiesCoordinates[0]}
      />).toJSON();
  expect(propertiesComponent).toMatchSnapshot(); */

  renderer.render(<Properties
    offers={offers}
    setActiveItem={jest.fn()}
    currentCity={citiesCoordinates[0]}
  />);

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
