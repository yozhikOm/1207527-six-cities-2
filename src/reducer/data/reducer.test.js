import * as ActionCreator from './action-creator.js';
import {offers} from '../../mocks/offers.js';
import {SortType} from '../../constants/constants.js';
import {reviews} from '../../mocks/reviews.js';

describe(`Reducer works correctly`, () => {

  it(`Action creator for loading all offers returns correct action`, () => {
    expect(ActionCreator.loadAllOffers(offers)).toEqual({
      type: `LOAD_ALL_OFFERS`,
      payload: offers,
    });
  });

  it(`Action creator for changing loadingState returns correct action`, () => {
    expect(ActionCreator.changeLoadingState(true)).toEqual({
      type: `CHANGE_LOADING_STATE`,
      payload: true,
    });
  });

  it(`Action creator for changing city returns correct action`, () => {
    expect(ActionCreator.changeCity(`Moscow`)).toEqual({
      type: `CHANGE_CITY`,
      payload: `Moscow`,
    });
  });

  it(`Action creator for getting offers returns correct action`, () => {
    expect(ActionCreator.getOffersList(`Cologne`, offers, SortType.CHEAP_FIRST)).toEqual({
      type: `GET_OFFERS_LIST`,
      payload: [],
    });
  });

  it(`Action creator for getting cities list returns correct action`, () => {
    expect(ActionCreator.getCitiesList(offers)).toEqual({
      type: `GET_CITIES_LIST`,
      payload: [
        {
          title: `Cologne`,
          coordinates: [50.938361, 6.959974]
        },
        {
          title: `Brussels`,
          coordinates: [50.846557, 4.351697],
        },
        {
          title: `Dusseldorf`,
          coordinates: [51.225402, 6.776314],
        },
      ],
    });
  });

  it(`Action creator for loading reviews returns correct action`, () => {
    expect(ActionCreator.loadOfferReviews(reviews)).toEqual({
      type: `LOAD_OFFER_REVIEWS`,
      payload: reviews,
    });
  });

  it(`Action creator for loading favorites returns correct action`, () => {
    expect(ActionCreator.loadFavorites(offers)).toEqual({
      type: `LOAD_FAVORITES`,
      payload: offers,
    });
  });

  it(`Action creator for changing sortBy correct action`, () => {
    expect(ActionCreator.changeSortBy(SortType.EXPENSIVE_FIRST)).toEqual({
      type: `CHANGE_SORT_BY`,
      payload: SortType.EXPENSIVE_FIRST,
    });
  });

});
