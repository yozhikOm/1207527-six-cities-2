import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Header} from '../header/header.jsx';
import {Menu} from '../menu/menu.jsx';
import {Properties} from '../properties/properties.jsx';
import {NoProperties} from '../no-properties/no-properties.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item.js';
import withVisibleSorting from '../../hocs/with-visible-sorting/with-visible-sorting.js';

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
      sortOffers,
    } = this.props;

    return (
      <div className="page page--gray page--main">
        <Header isAuthorizationRequired={isAuthorizationRequired} userInfo={userInfo} />
        <main className="page__main page__main--index">
          <Menu cities={cities} onCityClick={(city) => {
            onCityClick(city, allOffers);
          }}/>

          {offers.length === 0 ? <NoProperties {...currentCity}/> :
            <PropertiesWrapped
              offers={offers}
              currentCity={currentCity}
              sortBy={sortBy}
              sortOffers={sortOffers}/>
          }
        </main>
      </div>
    );
  }
}

MainPage.propTypes = {
  allOffers: PropTypes.array,
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
  offers: PropTypes.array,
  onCityClick: PropTypes.func.isRequired,
  isAuthorizationRequired: PropTypes.bool,
  userInfo: PropTypes.shape({
    id: PropTypes.id,
    name: PropTypes.string,
    avatarUrl: PropTypes.string,
    isPro: PropTypes.bool
  }),
  sortBy: PropTypes.string,
  sortOffers: PropTypes.func,
};

export {MainPage};
