import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Header} from '../header/header.jsx';
import {ReviewsList} from '../reviews-list/reviews-list.jsx';
import {Map} from '../map/map.jsx';
import {PropertyCard} from '../property-card/property-card.jsx';
import {MAX_NEIGHBOURS, MAX_DISTANCE} from '../../constants/constants.js';

class PropertyDetails extends Component {

  constructor(props) {
    super(props);

    this._offer = null;
    this._currCityOffers = null;

    this.handleOfferGet = this.handleOfferGet.bind(this);
    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
    this.handleFavoriteSuccessSet = this.handleFavoriteSuccessSet.bind(this);
  }

  componentDidMount() {
    const {loadOfferReviews, match: {params}} = this.props;

    const id = parseInt(params.id, 10);

    loadOfferReviews(id);
  }

  handleOfferGet() {
    const {allOffers, cities, match: {params}} = this.props;
    const id = parseInt(params.id, 10);
    this._offer = allOffers.find((item) => item.id === id);
    const cityName = this._offer.city.name;
    const currCity = cities.find((c) => c.title === cityName);
    this._currCityOffers = allOffers.filter((it) => it.city.name === currCity.title);
  }

  handleFavoriteClick() {
    const {setFavoriteStatus} = this.props;
    setFavoriteStatus(this._offer.id, !this._offer.isFavorite | 0, this.handleFavoriteSuccessSet);
  }

  handleFavoriteSuccessSet() {
    this._offer.isFavorite = !this._offer.isFavorite;
    const bookmark = document.querySelector(`.property__bookmark-icon `);
    let fillCollor = this._offer.isFavorite ? `4481c3` : `none`;
    bookmark.style.fill = fillCollor;
  }

  handleNeighboringOffersGet(offer, cityOffers) {
    const neighboringOffers = cityOffers.filter((it) => it !== offer &&
            Math.abs(it.location.latitude - offer.location.latitude) <= MAX_DISTANCE &&
            Math.abs(it.location.longitude - offer.location.longitude) <= MAX_DISTANCE);

    return neighboringOffers.slice(0, MAX_NEIGHBOURS);
  }

  render() {
    const {reviews} = this.props;

    if (!reviews) {
      return (
        <div>Loading...</div>
      );
    } else {
      const {
        activeItemID, onSetActiveItem, currentCity, postReview,
        isAuthorizationRequired, userInfo,
      } = this.props;


      this.handleOfferGet();

      let fillCollor = this._offer.isFavorite ? `4481c3` : `none`;

      const neighboringOffers = this.handleNeighboringOffersGet(this._offer, this._currCityOffers);

      const offersArrayForMap = neighboringOffers.map((neibOffer) => (
        {
          id: neibOffer.id,
          coordinates: [neibOffer.location.latitude, neibOffer.location.longitude],
        })).concat([{
        id: this._offer.id,
        coordinates: [this._offer.location.latitude, this._offer.location.longitude],
      }]);

      return (
        <React.Fragment>
          <Header isAuthorizationRequired={isAuthorizationRequired} userInfo={userInfo}/>
          <main className="page__main page__main--property">
            <section className="property">
              <div className="property__gallery-container container">
                <div className="property__gallery">
                  {this._offer.images.map((it, i) => {
                    return (
                      <div key={`photo-${i}`} className="property__image-wrapper">
                        <img className="property__image" src={it} alt="Photo studio" />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="property__container container">
                <div className="property__wrapper">
                  {this._offer.isPremium ?
                    <div className="place-card__mark">
                      <span>Premium</span>
                    </div> :
                    <React.Fragment/>
                  }
                  <div className="property__name-wrapper">
                    <h1 className="property__name">
                      {this._offer.title}
                    </h1>
                    <button className="property__bookmark-button button" type="button" onClick={this.handleFavoriteClick}>
                      <svg className="property__bookmark-icon" width="31" height="33" style={{fill: `${fillCollor}`}}>
                        <use xlinkHref="#icon-bookmark"></use>
                      </svg>
                      <span className="visually-hidden">To bookmarks</span>
                    </button>
                  </div>
                  <div className="property__rating rating">
                    <div className="property__stars rating__stars">
                      <span style={{width: `${this._offer.rating}%`}}></span>
                      <span className="visually-hidden">Rating</span>
                    </div>
                    <span className="property__rating-value rating__value">{this._offer.rating * 5 / 100}</span>
                  </div>
                  <ul className="property__features">
                    <li className="property__feature property__feature--entire">
                  Entire place
                    </li>
                    <li className="property__feature property__feature--bedrooms">
                      {this._offer.bedrooms} Bedrooms
                    </li>
                    <li className="property__feature property__feature--adults">
                  Max {this._offer.maxAdults} adults
                    </li>
                  </ul>
                  <div className="property__price">
                    <b className="property__price-value">&euro;{this._offer.price}</b>
                    <span className="property__price-text">&nbsp;night</span>
                  </div>
                  <div className="property__inside">
                    <h2 className="property__inside-title">What&apos;s inside</h2>
                    <ul className="property__inside-list">
                      {this._offer.goods.map((it, i) => {
                        return (
                          <li key={`goods-${i}`} className="property__inside-item">
                            {it}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="property__host">
                    <h2 className="property__host-title">Meet the host</h2>
                    <div className="property__host-user user">
                      <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                        <img className="property__avatar user__avatar" src={this._offer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                      </div>
                      <span className="property__user-name">
                        {this._offer.host.name}
                      </span>
                      {this._offer.host.isPro ?
                        <span className="property__user-status">
                      Pro
                        </span> :
                        <React.Fragment/>
                      }

                    </div>
                    <div className="property__description">
                      <p className="property__text">
                        {this._offer.description}
                      </p>
                    </div>
                  </div>
                  <ReviewsList
                    isAuthorizationRequired={isAuthorizationRequired}
                    offerId={this._offer.id}
                    reviews={reviews}
                    postReview={postReview}
                  />
                </div>
              </div>
              <section className="property__map map">
                <Map
                  currentCityCoords={currentCity.coordinates}
                  offersArray={offersArrayForMap}
                  activeItemID={activeItemID === -1 ? this._offer.id : activeItemID}
                />
              </section>
            </section>
            <div className="container">
              <section className="near-places places">
                <h2 className="near-places__title">Other places in the neighbourhood</h2>
                <div className="near-places__list places__list">
                  {neighboringOffers.map((item) => (
                    <React.Fragment key={item.id}>
                      <PropertyCard offer={item} cardMouseEnterHandler={onSetActiveItem} />
                    </React.Fragment>
                  ))}
                </div>
              </section>
            </div>
          </main>
        </React.Fragment>
      );
    }
  }
}

PropertyDetails.propTypes = {
  allOffers: PropTypes.arrayOf(PropTypes.shape({
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
    coordinates: PropTypes.arrayOf(
        PropTypes.number,
        PropTypes.number
    ).isRequired,
  }),
  cities: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        coordinates: PropTypes.arrayOf(PropTypes.number, PropTypes.number).isRequired,
      })
  ),
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
  }),
  neighboringOffers: PropTypes.arrayOf(PropTypes.shape({
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
  activeItemID: PropTypes.number,
  onSetActiveItem: PropTypes.func,
  isAuthorizationRequired: PropTypes.bool,
  userInfo: PropTypes.shape({
    id: PropTypes.id,
    name: PropTypes.string,
    avatarUrl: PropTypes.string,
    isPro: PropTypes.bool
  }),
  loadOfferReviews: PropTypes.func,
  reviews: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number,
      isPro: PropTypes.bool,
      name: PropTypes.string,
      avatarUrl: PropTypes.string,
    }),
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string,
    date: PropTypes.date,
  })),
  postReview: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.any,
  }),
  setFavoriteStatus: PropTypes.func,
};

export {PropertyDetails};

