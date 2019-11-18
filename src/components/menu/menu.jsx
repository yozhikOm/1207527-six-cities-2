import React from 'react';
import PropTypes from 'prop-types';
import {Cities} from '../cities/cities.jsx';

const Menu = (props) => {
  const {cities, onCityClick} = props;
  return (
    <React.Fragment>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <Cities cities={cities} onCityClick={onCityClick}/>
        </section>
      </div>
    </React.Fragment>
  );
};

Menu.propTypes = {
  cities: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        coordinates: PropTypes.arrayOf(PropTypes.number, PropTypes.number).isRequired,
      })).isRequired,
  onCityClick: PropTypes.func.isRequired,
};

export {Menu};
