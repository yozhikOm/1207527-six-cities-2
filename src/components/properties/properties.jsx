import React from "react";
import PropTypes from 'prop-types';
import {PropertyCard} from "../property-card/property-card.jsx";
import Sorting from '../sorting/sorting.jsx';
import {Map} from '../map/map.jsx';

const Properties = (props) => {
  const {offers, currentCity, activeItemID, setActiveItem,
    isSortingVisible, setSortingVisibility} = props;

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
          <Sorting
            isSortingVisible={isSortingVisible}
            setSortingVisibility={setSortingVisibility}
          />
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
  offers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    city: PropTypes.shape({
      name: PropTypes.string,
      location: PropTypes.shape({
        latitude: PropTypes.number,
        longitude: PropTypes.number,
        zoom: PropTypes.number,
      }),
    }).isRequired,
    previewImage: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool,
    isPremium: PropTypes.bool,
    rating: PropTypes.number,
    type: PropTypes.string.isRequired,
    bedrooms: PropTypes.number,
    maxAdults: PropTypes.number,
    price: PropTypes.number.isRequired,
    goods: PropTypes.arrayOf(PropTypes.string),
    host: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      isPro: PropTypes.bool,
      avatarUrl: PropTypes.string,
    }),
    description: PropTypes.string.isRequired,
    location: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      zoom: PropTypes.number,
    }),
  })),
  currentCity: PropTypes.shape({
    title: PropTypes.string.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number, PropTypes.number).isRequired,
  }).isRequired,
  activeItemID: PropTypes.number,
  setActiveItem: PropTypes.func.isRequired,
  isSortingVisible: PropTypes.bool,
  setSortingVisibility: PropTypes.func,
};

export {Properties};
