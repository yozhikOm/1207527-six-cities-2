import React from 'react';
// import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const SORT_TYPES = [`Popular`, `Price: low to high`, `Price: high to low`, `Top rated first`];

const Sorting = (props) => {
  const {isSortingVisible, setSortingVisibility} = props;

  let ulElementClassName = `places__options places__options--custom`;
  if (isSortingVisible) {
    ulElementClassName += ` places__options--opened`;
  }

  const onSortClick = () => {
    setSortingVisibility();
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex="0" onClick={onSortClick}>
        sortBy
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={ulElementClassName} >
        {SORT_TYPES.map((it, i) => (
          <li className="places__option" tabIndex="0" key={`sortby-${i}`}>{it}</li>
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
};

export {Sorting};

// export default connect(mapStateToProps, mapDispatchToProps)(Sorting);
