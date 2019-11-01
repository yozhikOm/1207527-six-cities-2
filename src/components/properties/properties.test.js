import React from 'react';
import {Properties} from './properties.jsx';
import renderer from 'react-test-renderer';

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

it(`Properties компонент рендерится корректно`, () => {
  const propertiesComponent = renderer.create(<Properties items={properties}/>).toJSON();
  expect(propertiesComponent).toMatchSnapshot();
});
