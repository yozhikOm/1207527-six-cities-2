import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Header} from '../header/header.jsx';
import {Menu} from '../menu/menu.jsx';
import {Sorting} from '../sorting/sorting.jsx';
import {Map} from '../map/map.jsx';
import {Properties} from '../properties/properties.jsx';

class MainPage extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      offers
    } = this.props;

    const coordinatesArray = offers.map((offer) => offer.coordinates);

    return (
      <div className="page page--gray page--main">
        <Header />
        <main className="page__main page__main--index">
          <Menu />
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">312 places to stay in Amsterdam</b>
                <Sorting />
                <Properties items={offers} />
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map coordinatesArray={coordinatesArray}/>
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

MainPage.propTypes = {
  offers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        photos: PropTypes.arrayOf(
            PropTypes.shape({
              src: PropTypes.string,
            })
        ),
        coordinates: PropTypes.arrayOf(PropTypes.number, PropTypes.number).isRequired,
        host: PropTypes.string.isRequired,
      })
  )
};

export {MainPage};
