import React from 'react';
import PropTypes from 'prop-types';

const PropertyCard = ({offerInfo, cardMouseEnterHandler}) => {
  const {id, title, type, price, isPremium, photos} = offerInfo;

  const onCardMouseEnter = (evt) => {
    const cardId = Number(evt.currentTarget.id);
    cardMouseEnterHandler(cardId);
  };

  const onCardTitleClick = (evt) => {
    console.log(`'` + evt.target.textContent + `' has just been clicked`);
    console.log(id + `: '` + title + `' has just been clicked`);
    window.location.assign(`/offer/` + id);
  };

  return (
    <article className="cities__place-card place-card" id={id} onMouseEnter={onCardMouseEnter}>
      {isPremium ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div> :
        <React.Fragment/>
      }
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={photos[0].src} width="260" height="200" alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name" onClick={onCardTitleClick}>
          <a href="#">{title}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

PropertyCard.propTypes = {
  offerInfo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    location: PropTypes.shape({
      city: PropTypes.string,
      coordinates: PropTypes.arrayOf(PropTypes.number, PropTypes.number).isRequired,
    }).isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    isPremium: PropTypes.bool,
    description: PropTypes.string.isRequired,
    photos: PropTypes.arrayOf(
        PropTypes.shape({
          src: PropTypes.string,
        })
    ),
    host: PropTypes.string.isRequired,
  }),
  cardMouseEnterHandler: PropTypes.func,
};

PropertyCard.defaultProps = {
  id: 1,
  title: `Some title`,
  type: `Room`,
  price: 88,
  description: ``,
  photos: [],
  host: ``
};

export {PropertyCard};
