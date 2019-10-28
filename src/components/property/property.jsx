import React from 'react';
import PropTypes from 'prop-types';

const Property = (props) => {
  return <section className="property">
    <div className="property__gallery-container container">
      <div className="property__gallery">
        <div className="property__image-wrapper">
          <img className="property__image" src="img/room.jpg" alt="Photo studio" />
        </div>
        <div className="property__image-wrapper">
          <img className="property__image" src="img/apartment-01.jpg" alt="Photo studio" />
        </div>
        <div className="property__image-wrapper">
          <img className="property__image" src="img/apartment-02.jpg" alt="Photo studio" />
        </div>
      </div>
    </div>
    <div className="property__container container">
      <div className="property__wrapper">
        <div className="property__mark">
          <span>Premium</span>
        </div>
        <div className="property__name-wrapper">
          <h1 className="property__name">{props.title}</h1>
          <button className="property__bookmark-button button" type="button">
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
      </div>
    </div>
    <div className="property__price">
      <b className="property__price-value">&euro;{props.price}</b>
      <span className="property__price-text">&nbsp;night</span>
    </div>
  </section>;
};

Property.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

Property.defaultProps = {
  title: `Some title`,
  type: `Room`,
  price: 88
};

export {Property};
