import React from 'react';
import {connect} from 'react-redux';
import * as ActionCreatorData from '../../reducer/data/action-creator.js';
import {getAllOffers, getIsOffersLoading, getCurrentCity, getSortBy} from '../../reducer/data/selectors';
import PropTypes from 'prop-types';
import {SortType} from '../../constants/constants.js';

const Sorting = (props) => {
  const {isSortingVisible, onSetSortingVisibility,
    sortBy, sortOffers, allOffers, currentCity} = props;

  let ulElementClassName = `places__options places__options--custom`;
  if (isSortingVisible) {
    ulElementClassName += ` places__options--opened`;
  }

  const sortTypes = Object.keys(SortType).map((it) => SortType[it]);

  const onSortClick = () => {
    onSetSortingVisibility();
  };

  const onSortOffersClick = (evt) => {
    sortOffers(currentCity, allOffers, evt.target.textContent);
    onSetSortingVisibility();
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex="0" onClick={onSortClick}>
        {sortBy}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={ulElementClassName} >
        {sortTypes.map((it, i) => (
          <li className="places__option" tabIndex="0" key={`sortby-${i}`} onClick={onSortOffersClick}>{it}</li>
        ))}
      </ul>
    </form>
  );
};

Sorting.propTypes = {
  isSortingVisible: PropTypes.bool,
  onSetSortingVisibility: PropTypes.func,
  sortBy: PropTypes.oneOf([SortType.POPULAR, SortType.CHEAP_FIRST,
    SortType.EXPENSIVE_FIRST, SortType.TOP_RATED_FIRST]),
  sortOffers: PropTypes.func,
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
  }).isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  allOffers: getAllOffers(state),
  isOffersLoading: getIsOffersLoading(state),
  currentCity: getCurrentCity(state),
  sortBy: getSortBy(state),
});

const mapDispatchToProps = (dispatch) => ({
  sortOffers: (currentCity, allOffers, sortBy) => {
    dispatch(ActionCreatorData.changeSortBy(sortBy));
    dispatch(ActionCreatorData.getOffersList(currentCity, allOffers, sortBy));
  }
});

export {Sorting};
export default connect(mapStateToProps, mapDispatchToProps)(Sorting);
