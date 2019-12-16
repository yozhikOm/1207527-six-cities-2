import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Header} from '../header/header.jsx';
import {Menu} from '../menu/menu.jsx';
import {Properties} from '../properties/properties.jsx';
import {NoProperties} from '../no-properties/no-properties.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item.js';
import withVisibleSorting from '../../hocs/with-visible-sorting/with-visible-sorting.js';
import {SORT_TYPES} from '../../constants/constants.js';

const PropertiesWrapped = withVisibleSorting(withActiveItem(Properties));

class MainPage extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      allOffers,
      currentCity,
      cities,
      offers,
      onCityClick,
      isAuthorizationRequired,
      userInfo,
      sortBy,
    } = this.props;

    return (
      <div className="page page--gray page--main">
        <Header isAuthorizationRequired={isAuthorizationRequired} userInfo={userInfo} />
        <main className="page__main page__main--index">
          <Menu cities={cities} onCityClick={(city) => {
            onCityClick(city, allOffers, sortBy);
          }}/>

          {offers.length === 0 ? <NoProperties {...currentCity}/> :
            <PropertiesWrapped
              offers={offers}
              currentCity={currentCity}
            />
          }
        </main>
      </div>
    );
  }
}

MainPage.propTypes = {
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
    coordinates: PropTypes.arrayOf(PropTypes.number, PropTypes.number).isRequired,
  }),
  cities: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        coordinates: PropTypes.arrayOf(PropTypes.number, PropTypes.number).isRequired,
      })
  ),
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
  onCityClick: PropTypes.func.isRequired,
  isAuthorizationRequired: PropTypes.bool,
  userInfo: PropTypes.shape({
    id: PropTypes.id,
    name: PropTypes.string,
    avatarUrl: PropTypes.string,
    isPro: PropTypes.bool
  }),
  sortBy: PropTypes.oneOf([SORT_TYPES.POPULAR, SORT_TYPES.CHEAP_FIRST,
    SORT_TYPES.EXPENSIVE_FIRST, SORT_TYPES.TOP_RATED_FIRST]),
};

export {MainPage};
