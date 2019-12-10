import React from 'react';
// import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {SORT_TYPES} from '../../constants/constants.js';

const Sorting = (props) => {
  const {isSortingVisible, setSortingVisibility, sortBy, sortOffers, offers} = props;

  let ulElementClassName = `places__options places__options--custom`;
  if (isSortingVisible) {
    ulElementClassName += ` places__options--opened`;
  }

  const sortTypes = Object.keys(SORT_TYPES).map((it) => SORT_TYPES[it]);

  const onSortClick = () => {
    setSortingVisibility();
  };

  const onSortOffersClick = (evt) => {
    sortOffers(evt.target.textContent, offers);
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

// const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
//   sortOrder: state.user.sortOrder,
// });

// const mapDispatchToProps = (dispatch) => ({
//   setSortOrder: (order) => dispatch(ActionCreator.changeSorting(order)),
// });


Sorting.propTypes = {
  isSortingVisible: PropTypes.bool,
  setSortingVisibility: PropTypes.func,
  sortBy: PropTypes.string,
  sortOffers: PropTypes.func,
  offers: PropTypes.array,
};

export {Sorting};

// export default connect(mapStateToProps, mapDispatchToProps)(Sorting);
