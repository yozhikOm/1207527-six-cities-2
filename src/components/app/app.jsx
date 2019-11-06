import * as React from 'react';
import PropTypes from "prop-types";
import {PureComponent} from 'react';
import {Header} from '../header/header.jsx';
import {Menu} from '../menu/menu.jsx';
import {Sorting} from '../sorting/sorting.jsx';
import {Properties} from '../properties/properties.jsx';

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      offers
    } = this.props;

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
                <section className="cities__map map"></section>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

App.propTypes = {
  offers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        photos: PropTypes.arrayOf(
            PropTypes.shape({
              src: PropTypes.string,
            })
        )
      })
  )
};

export {App};
