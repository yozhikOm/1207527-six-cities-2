import React from "react";
import PropTypes from 'prop-types';
import {PropertyCard} from "../property-card/property-card.jsx";

const Properties = (props) => {
  const {items, setActiveItem} = props;
  return (
    <div className="cities__places-list places__list tabs__content">
      {items.map((item) => (
        <React.Fragment key={item.id}>
          <PropertyCard offerInfo={item} cardMouseEnterHandler={setActiveItem} />
        </React.Fragment>
      ))}
    </div>
  );
};

Properties.propTypes = {
  items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        location: PropTypes.shape({
          city: PropTypes.string.isRequired,
          coordinates: PropTypes.arrayOf(PropTypes.number, PropTypes.number).isRequired,
        }).isRequired,
        title: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        photos: PropTypes.arrayOf(
            PropTypes.shape({
              src: PropTypes.string,
            })
        ),
        host: PropTypes.string.isRequired,
      }).isRequired
  ),
  setActiveItem: PropTypes.func.isRequired,
};

export {Properties};
