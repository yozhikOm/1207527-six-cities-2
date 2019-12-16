import React from 'react';
import {Sorting} from './sorting.jsx';
import ShallowRenderer from 'react-test-renderer/shallow';
import {cities} from '../../mocks/cities.js';

it(`Sorting компонент рендерится корректно`, () => {
  const renderer = new ShallowRenderer();

  renderer.render(<Sorting
    isSortingVisible={true}
    onSetSortingVisibility={jest.fn()}
    currentCity={cities[0]}
  />);

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
