import React from 'react';
import PropTypes from 'prop-types';

const PropertyCard = (props) => {
  return (
    <React.Fragment>
      <article className="cities__place-card place-card">
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
        <div className="cities__image-wrapper place-card__image-wrapper">
          <a href="#">
            <img className="place-card__image" src={props.photos[0].src} width="260" height="200" alt="Place image" />
          </a>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{props.price}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <button className="place-card__bookmark-button button" type="button">

              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style="width: 93%"></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <a href="#">{props.title}</a>
          </h2>
          <p className="place-card__type">Apartment</p>
        </div>
      </article>
    </React.Fragment>
  );
};

PropertyCard.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  photos: [
    {
      src: PropTypes.string
    }
  ]
};

PropertyCard.defaultProps = {
  title: `Some title`,
  type: `Room`,
  price: 88,
  photos: [],
};

export {PropertyCard};
