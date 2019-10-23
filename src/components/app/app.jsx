import React from 'react';
import {Property} from '../property/property.jsx';

import {Properties} from '../properties/properties.jsx';

const properties = [
  {
    "id": 1,
    "title": "Cozy house amsterdam",
    "type": "House",
    "price": 650,
  },
  {
    "id": 2,
    "title": "Cosy room in spacious apartment",
    "type": "Room",
    "price": 45,
  },
  {
    "id": 3,
    "title": "Elegant private room in stylish house",
    "type": "Room",
    "price": 128,
  },
  {
    "id": 4,
    "title": "Huge Tinyhouse in the green, between sea and city",
    "type": "House",
    "price": 1520,
  }
];

const App = () => {
  return (
    <div className="cities__places-list places__list tabs__content">
      <Properties items={properties} />
    </div>
  )
}

export {App};
