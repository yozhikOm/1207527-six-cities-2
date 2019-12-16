import React from 'react';
import PropTypes from 'prop-types';
import {Review} from '../review/review.jsx';
import {ReviewForm} from '../review-form/review-form.jsx';
import {MAX_REVIEWS} from '../../constants/constants.js';

const ReviewsList = (props) => {
  const {isAuthorizationRequired, offerId, reviews, postReview} = props;

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.slice(0, MAX_REVIEWS).map((item) => (
          <React.Fragment key={item.id}>
            <Review review={item} />
          </React.Fragment>
        ))}
      </ul>
      {isAuthorizationRequired ? <React.Fragment /> : <ReviewForm offerId={offerId} postReview={postReview}/>}
    </section>

  );
};

ReviewsList.propTypes = {
  isAuthorizationRequired: PropTypes.bool,
  reviews: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        user: PropTypes.shape({
          id: PropTypes.number,
          isPro: PropTypes.bool,
          name: PropTypes.string,
          avatarUrl: PropTypes.string,
        }),
        rating: PropTypes.number.isRequired,
        comment: PropTypes.string,
        date: PropTypes.date,
      }).isRequired
  ),
  offerId: PropTypes.number,
  postReview: PropTypes.func,
};

export {ReviewsList};
