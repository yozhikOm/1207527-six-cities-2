import React from "react";
import PropTypes from 'prop-types';
import {PropertyCard} from "../property-card/property-card.jsx";
import {Sorting} from '../sorting/sorting.jsx';
import {Map} from '../map/map.jsx';

const Properties = (props) => {
  const {offers, currentCity, activeItemID, setActiveItem} = props;

  const offersArrayForMap = offers.map((offer) => (
    {
      id: offer.id,
      coordinates: [offer.location.latitude, offer.location.longitude],
    }));

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offers.length} places to stay in {currentCity.title}</b>
          <Sorting />
          <div className="cities__places-list places__list tabs__content">
            {offers.map((item) => (
              <React.Fragment key={item.id}>
                <PropertyCard offer={item} cardMouseEnterHandler={setActiveItem} />
              </React.Fragment>
            ))}
          </div>
        </section>
        <div className="cities__right-section">
          <section className="cities__map map">
            <Map
              currentCityCoords={currentCity.coordinates}
              offersArray={offersArrayForMap}
              activeItemID={activeItemID}/>
          </section>
        </div>
      </div>
    </div>
  );
};

Properties.propTypes = {
  offers: PropTypes.array,
  currentCity: PropTypes.shape({
    title: PropTypes.string.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number, PropTypes.number).isRequired,
  }).isRequired,
  activeItemID: PropTypes.number,
  setActiveItem: PropTypes.func.isRequired,
};

export {Properties};
