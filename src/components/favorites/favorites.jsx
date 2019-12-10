import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Header} from '../header/header.jsx';
import {getCities} from '../../reducer/data/selectors.js';
import {PropertyCard} from '../property-card/property-card.jsx';

class Favorites extends PureComponent {

  componentDidMount() {
    this.props.loadFavorites();
  }

  render() {
    const {favorites, isAuthorizationRequired, userInfo, setActiveItem} = this.props;

    if (!favorites) {
      return (
        <div>Loading...</div>
      );
    } else {

      const cities = getCities(favorites);

      return (
        <div className="page page--gray page--main">
          <Header isAuthorizationRequired={isAuthorizationRequired} userInfo={userInfo} />

          <main className="page__main page__main--favorites">
            <div className="page__favorites-container container">
              <section className="favorites">
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">
                  {cities.map((it, i) => (
                    <li className="favorites__locations-items" key={`fav-${i}`}>
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <a className="locations__item-link" href="#">
                            <span>{it.title}</span>
                          </a>
                        </div>
                      </div>
                      <div className="favorites__places">
                        {favorites.filter((f) => f.city.name === it.title).map((offer) => (
                          <React.Fragment key={offer.id}>
                            <PropertyCard offer={offer} cardMouseEnterHandler={setActiveItem}/>
                          </React.Fragment>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </main>
          <footer className="footer container">
            <a className="footer__logo-link" href="main.html">
              <img className="footer__logo" src="/img/logo.svg" alt="6 cities logo" width="64" height="33" />
            </a>
          </footer>
        </div>
      );
    }
  }
}

Favorites.propTypes = {
  history: PropTypes.object,
  isAuthorizationRequired: PropTypes.bool,
  userInfo: PropTypes.shape({
    id: PropTypes.id,
    name: PropTypes.string,
    avatarUrl: PropTypes.string,
    isPro: PropTypes.bool
  }),
  loadFavorites: PropTypes.func,
  favorites: PropTypes.array,
  setActiveItem: PropTypes.func,
};

export {Favorites};
