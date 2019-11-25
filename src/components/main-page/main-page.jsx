import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Header} from '../header/header.jsx';
import {Menu} from '../menu/menu.jsx';
import {Properties} from '../properties/properties.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item.js';

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
    } = this.props;

    return (
      <div className="page page--gray page--main">
        <Header />
        <main className="page__main page__main--index">
          <Menu cities={cities} onCityClick={onCityClick}/>

          <PropertiesWrapped offers={offers} currentCity={currentCity}/>

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
  offers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        location: PropTypes.shape({
          city: PropTypes.string.isRequired,
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
  onCityClick: PropTypes.func.isRequired,
};

export {MainPage};
