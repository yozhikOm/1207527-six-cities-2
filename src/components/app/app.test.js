import React from 'react';
import {App} from './app.jsx';
import ShallowRenderer from 'react-test-renderer/shallow';
import {offers} from '../../mocks/offers.js';

it(`App компонент рендерится корректно`, () => {
  const appProps = {
    mainPageProps: {
      offers: {offers}.offers
    },
    propertyCardProps: {
      offer: {offers}.offers[0]
    }
  };

  const renderer = new ShallowRenderer();
  renderer.render(<App {...appProps} />);

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();

  // const appComponent = renderer.create(<App {...appProps} />).toJSON();
  // expect(appComponent).toMatchSnapshot();
});
