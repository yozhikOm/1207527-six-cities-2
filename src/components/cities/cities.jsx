import React from "react";
import PropTypes from 'prop-types';

const Cities = (props) => {
  const {cities, onCityClick} = props;
  return (
    <ul className="locations__list tabs__list">
      {cities.map((it, i) => (
        <li className="locations__item" key={`${i}`}>
          <a className="locations__item-link tabs__item" href="#" onClick={(evt) => {
            evt.preventDefault();
            let cityName = evt.currentTarget.textContent;
            let city = cities.find((c) => c.title === cityName);
            onCityClick(city);
          }}>
            <span>{it.title}</span>
          </a>
        </li>
      ))}
    </ul>
  );
};

Cities.propTypes = {
  cities: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        coordinates: PropTypes.arrayOf(PropTypes.number, PropTypes.number).isRequired,
      })
  ).isRequired,
  onCityClick: PropTypes.func.isRequired,
};

export {Cities};
