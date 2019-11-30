import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Header} from '../header/header.jsx';
import {Menu} from '../menu/menu.jsx';
import {Properties} from '../properties/properties.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item.js';
import {NoProperties} from '../no-properties/no-properties.jsx';

const PropertiesWrapped = withActiveItem(Properties);

class MainPage extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      currentCity,
      cities,
      offers,
      onCityClick,
      isAuthorizationRequired,
      userInfo
    } = this.props;

    return (
      <div className="page page--gray page--main">
        <Header isAuthorizationRequired={isAuthorizationRequired} userInfo={userInfo} />
        <main className="page__main page__main--index">
          <Menu cities={cities} onCityClick={onCityClick}/>

          {offers.length === 0 ? <NoProperties {...currentCity}/> :
            <PropertiesWrapped offers={offers} currentCity={currentCity}/>
          }
        </main>
      </div>
    );
  }
}

MainPage.propTypes = {
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
};

export {MainPage};
