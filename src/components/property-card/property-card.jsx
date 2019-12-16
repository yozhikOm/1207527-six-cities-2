import React from 'react';
import PropTypes from 'prop-types';
import {PROPERTY_TYPES} from '../../constants/constants.js';
import {Link} from 'react-router-dom';


const PropertyCard = ({offer, cardMouseEnterHandler}) => {

  const onCardMouseEnter = (evt) => {
    const cardId = Number(evt.currentTarget.id);
    cardMouseEnterHandler(cardId);
  };

  const onCardMouseLeave = () => {
    cardMouseEnterHandler(-1);
  };

  return (
    <Link to={`/offer/${offer.id}`}>
      <article className="cities__place-card place-card"
        id={offer.id}
        onMouseEnter={onCardMouseEnter}
        onMouseLeave={onCardMouseLeave}
      >
        {offer.isPremium ?
          <div className="place-card__mark">
            <span>Premium</span>
          </div> :
          <React.Fragment/>
        }
        <div className="cities__image-wrapper place-card__image-wrapper">
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image" />
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{offer.price}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <button className="place-card__bookmark-button button" type="button">
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{width: `${offer.rating}%`}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            {offer.title}
          </h2>
          <p className="place-card__type">{offer.type}</p>
        </div>
      </article>
    </Link>
  );
};

PropertyCard.propTypes = {
  offer: PropTypes.shape({
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
    type: PropTypes.oneOf(PROPERTY_TYPES),
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
  }),
  cardMouseEnterHandler: PropTypes.func,
};

/* PropertyCard.defaultProps = {
  id: 1,
  title: `Some title`,
  type: `Room`,
  price: 88,
  description: ``,
  host: ``
}; */

export {PropertyCard};
