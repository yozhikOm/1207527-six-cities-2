import React from 'react';
import PropTypes from 'prop-types';

const ReviewForm = (props) => {
  let rating = -1;
  let commentText = ``;
  let commentTextArea = React.createRef();

  const isCommentLengthOK = (text) => {
    let result = false;
    if(text.length >= 50) {
      result = true;
    }
    return result;
  };

  const getRating = (ratingInputs) => {
    let rat = -1;
    ratingInputs.forEach((it) => {
      if(it.checked) {
        rat = parseInt(it.value);
        if(isNaN(rat)) {
          return -1;
        }
      }
    });
    return rat;
  }

  const onChangeHandler = (evt) => {
    evt.preventDefault();
    const form = document.querySelector('form');
    const ratingInputs = form.querySelectorAll('input');
    rating = getRating(ratingInputs);
    commentText = commentTextArea.current.value;
    const button = form.querySelector('button[type="submit"]');

    if(rating !== -1 && isCommentLengthOK(commentText)){
      button.disabled = false;
    }
    else {
      button.disabled = true;
    }
  }

  const clearForm = (form) => {
    const ratingInputs = form.querySelectorAll('input');
    ratingInputs.forEach((it) => {
      it.checked = false;
    });
    commentTextArea.current.value = ``;
    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
  };

  const onSubmitHandler = (evt) => {
    evt.preventDefault();
    const form = evt.target;
    clearForm(form);
    const {offerId, postReview} = props;
    postReview(offerId, rating, commentText);
    const fieldset = form.parentElement;
    fieldset.disabled = true;
  }

  return (
    <fieldset style={{border:`none`}}>
    <form className="reviews__form form" action="#" method="post" onSubmit={onSubmitHandler} onChange={onChangeHandler}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea ref={commentTextArea} maxLength="300" className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
      </div>
    </form>
    </fieldset>
  );
};

ReviewForm.propTypes = {
  offerId: PropTypes.number,
  postReview: PropTypes.func,
};

export {ReviewForm};
