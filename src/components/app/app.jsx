import React from 'react';
const App = () => {
  return <section className="welcome">
    <h1 className="welcome__сities-title">6 Cities</h1>
    <ul className="welcome__menu">
      <li>Paris</li>
      <li>Cologne</li>
      <li>Brussels</li>
      <li>Amsterdam</li>
      <li>Humburg</li>
      <li>Dusseldorf</li>
    </ul>
    <input className="welcome__search-input"/>
    <button className="welcome__button"><span className="">Найти</span></button>
    <p className="welcome__text">Удачи!</p>
  </section>;
};

export {App};
