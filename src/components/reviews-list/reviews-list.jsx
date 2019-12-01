import React from 'react';
import PropTypes from 'prop-types';
import {Review} from '../review/review.jsx';
import {ReviewForm} from '../review-form/review-form.js';

const ReviewsList = (props) => {
  const {isAuthorizationRequired, reviews} = props;
  // const reviewsList = reviews.filter((r) => r.offerId === offerId);

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.map((item) => (
          <React.Fragment key={item.id}>
            <Review review={item} />
          </React.Fragment>
        ))}
      </ul>
      {isAuthorizationRequired ? <React.Fragment /> : <ReviewForm />}
    </section>

  );
};

ReviewsList.propTypes = {
  isAuthorizationRequired: PropTypes.bool,
  reviews: PropTypes.array,
};

export {ReviewsList};
