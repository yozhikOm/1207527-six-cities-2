import React from 'react';
import PropTypes from 'prop-types';

const Properties = (props) => {
  return (
    <React.Fragment>
      {props.items.map((item) => (
        <React.Fragment key={item.id}>
          <article className="cities__place-card place-card">
            <div className="place-card__mark">
              <span>Premium</span>
            </div>
            <div className="cities__image-wrapper place-card__image-wrapper">
              <a href="#">
                <img className="place-card__image" src="img/apartment-01.jpg" width="260" height="200" alt="Place image" />
              </a>
            </div>
            <div className="place-card__info">
              <div className="place-card__price-wrapper">
                <div className="place-card__price">
                  <b className="place-card__price-value">&euro;{item.price}</b>
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
              <h2 className="place-card__name" onClick={props.onClickTitle}>
                <a href="#">{item.title}</a>
              </h2>
              <p className="place-card__type">{item.type}</p>
            </div>
          </article>
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

Properties.propTypes = {
  items: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        onClickTitle: PropTypes.func
      }).isRequired
  ).isRequired,
  onClickTitle: PropTypes.func
};

export {Properties};
