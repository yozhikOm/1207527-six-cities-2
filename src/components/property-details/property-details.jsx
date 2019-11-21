import React from 'react';
import PropTypes from 'prop-types';
import {Header} from '../header/header.jsx';
import {ReviewsList} from '../reviews-list/reviews-list.jsx';
import {Map} from '../map/map.jsx';
import {PropertyCard} from '../property-card/property-card.jsx';

const PropertyDetails = (props) => {
  const {currentCityCoords, offer, neighboringOffers} = props;

  return (
    <React.Fragment>
      <Header/>
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {offer.photos.map((it, i) => {
                return (
                  <div key={`photo-${i}`} className="property__image-wrapper">
                    <img className="property__image" src={it.src} alt="Photo studio" />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              <div className="property__mark">
                <span>Premium</span>
              </div>
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {offer.title}
                </h1>
                <button className="property__bookmark-button button" type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `96%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">4.8</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  Entire place
                </li>
                <li className="property__feature property__feature--bedrooms">
                  3 Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max 4 adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{offer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  <li className="property__inside-item">
                    Wi-Fi
                  </li>
                  <li className="property__inside-item">
                    Washing machine
                  </li>
                  <li className="property__inside-item">
                    Towels
                  </li>
                  <li className="property__inside-item">
                    Heating
                  </li>
                  <li className="property__inside-item">
                    Coffee machine
                  </li>
                  <li className="property__inside-item">
                    Baby seat
                  </li>
                  <li className="property__inside-item">
                    Kitchen
                  </li>
                  <li className="property__inside-item">
                    Dishwasher
                  </li>
                  <li className="property__inside-item">
                    Cabel TV
                  </li>
                  <li className="property__inside-item">
                    Fridge
                  </li>
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src="img/avatar-angelina.jpg" width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {offer.host}
                  </span>
                  <span className="property__user-status">
                    Pro
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {offer.description}
                  </p>
                  <p className="property__text">
                    An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.
                  </p>
                </div>
              </div>
              <ReviewsList offerId={offer.id} />
            </div>
          </div>
          <section className="property__map map">
            <Map
              currentCityCoords={currentCityCoords}
              coordinatesArray={(neighboringOffers.map((neibOffer) => neibOffer.location.coordinates)).concat([offer.location.coordinates])}/>
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {neighboringOffers.map((item) => (
                <React.Fragment key={item.id}>
                  <PropertyCard offerInfo={item} cardMouseEnterHandler={() => {}} />
                </React.Fragment>
              ))}
            </div>
          </section>
        </div>
      </main>
    </React.Fragment>
  );
};

PropertyDetails.propTypes = {
  currentCityCoords: PropTypes.arrayOf(PropTypes.number.isRequired, PropTypes.number.isRequired).isRequired,
  offer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    location: PropTypes.shape({
      city: PropTypes.string,
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
  }),
  neighboringOffers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        location: PropTypes.shape({
          city: PropTypes.string,
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
      })
  ),
};

export {PropertyDetails};
