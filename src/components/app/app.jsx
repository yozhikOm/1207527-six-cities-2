import React from 'react';
import {Property} from '../property/property.jsx';

const settings = {
  title: "Cosy room in spacious apartment",
  type: "Room",
  price: 128,
};

const App = () => {
  return <Property
    title={settings.title}
    type={settings.type}
    price={settings.price}
  />;
};

export {App};
