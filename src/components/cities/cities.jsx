import React from "react";
import PropTypes from 'prop-types';

const Cities = (props) => {
  const {currentCity, cities, onCityClick} = props;

  const currentCityIndex = cities.findIndex((it) => it.title === currentCity.title);

  const onLinkClick = (evt) => {
    evt.preventDefault();
    let cityName = evt.currentTarget.textContent;
    let city = cities.find((c) => c.title === cityName);
    onCityClick(city);

  };

  return (
    <ul className="locations__list tabs__list">
      {cities.map((it, i) => (
        <li className="locations__item" key={`${i}`}>
          <a
            className={currentCityIndex === i ? `locations__item-link tabs__item tabs__item--active` : `locations__item-link tabs__item`}
            href="#"
            onClick={onLinkClick}>
            <span>{it.title}</span>
          </a>
        </li>
      ))}
    </ul>
  );
};

Cities.propTypes = {
  currentCity: PropTypes.shape({
    title: PropTypes.string.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number, PropTypes.number).isRequired,
  }),
  cities: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        coordinates: PropTypes.arrayOf(PropTypes.number, PropTypes.number).isRequired,
      })
  ).isRequired,
  onCityClick: PropTypes.func.isRequired,
};

export {Cities};
