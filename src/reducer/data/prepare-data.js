
export const prepareOffers = (allOffers) => {

  const preparedData = allOffers.map((offer) => {
    return {
      id: offer.id,
      city: {
        name: offer.city.name,
        location: {
          latitude: offer.city.location.latitude,
          longitude: offer.city.location.longitude,
          zoom: offer.city.location.zoom,
        }
      },
      previewImage: offer.preview_image,
      images: offer.images,
      title: offer.title,
      isFavorite: offer.is_favorite,
      isPremium: offer.is_premium,
      rating: prepareRating(offer.rating),
      type: offer.type,
      bedrooms: offer.bedrooms,
      maxAdults: offer.max_adults,
      price: offer.price,
      goods: offer.goods,
      host: {
        id: offer.host.id,
        name: offer.host.name,
        isPro: offer.host.is_pro,
        avatarUrl: offer.host.avatar_url,
      },
      description: offer.description,
      location: {
        latitude: offer.location.latitude,
        longitude: offer.location.longitude,
        zoom: offer.location.zoom,
      },
    };
  });

  return preparedData;
};

export const prepareReviews = (reviews) => {

  const preparedData = reviews.map((review) => {
    return {
      id: review.id,
      user: {
        id: review.user.id,
        isPro: review.user.is_pro,
        name: review.user.name,
        avatarUrl: review.user.avatar_url
      },
      rating: prepareRating(review.rating),
      comment: review.comment,
      date: prepareDate(review.date),
    };
  });
  return preparedData;
};

const prepareRating = (rating) => {
  return Math.round(rating / 5 * 100);
};

const prepareDate = (dateStr) => {
  const date = new Date(dateStr);
  const month = capitalizeFirstLetter(date.toLocaleString(`default`, {month: `long`}));
  const year = date.getFullYear();
  return month + ` ` + year;
};

const capitalizeFirstLetter = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};
