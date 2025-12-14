import React from "react";

const ReviewCard = ({ review, showFavorite = true }) => {
  return (
    <div className="card bg-base-100 shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-(--radius-box) overflow-hidden group">
      {/* Image Container */}
      <figure className="relative h-56 overflow-hidden">
        <img
          src={review.food.image[review.imageIndex]}
          alt={review.food.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Favorite Button (Top Right) */}
        {showFavorite && (
          <button className="absolute top-3 right-3 btn btn-circle btn-sm bg-base-100/80 backdrop-blur-sm border-0 hover:bg-primary hover:text-primary-content">
            <HeartIcon className={isFavorited ? "fill-primary" : ""} />
          </button>
        )}
        {/* Category Badge (Top Left) */}
        <div className="absolute top-3 left-3 badge badge-accent badge-lg font-semibold">
          {review.food.category}
        </div>
      </figure>

      {/* Card Body */}
      <div className="card-body p-5">
        {/* Food Name */}
        <h3 className="card-title font-popins text-2xl text-base-content line-clamp-1">
          {review.food.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-2">
          <div className="rating rating-sm">
            {[1, 2, 3, 4, 5].map((star) => (
              <input
                key={star}
                type="radio"
                className="mask mask-star-2 bg-primary"
                checked={star === review.rating}
                disabled
              />
            ))}
          </div>
          <span className="text-sm font-inter text-neutral">
            {review.rating}.0
          </span>
        </div>

        {/* Restaurant Info */}
        <div className="space-y-1 mb-3">
          <p className="flex items-center gap-2 text-sm text-neutral">
            <StorefrontIcon className="w-4 h-4" />
            <span className="font-medium">{review.restaurantName}</span>
          </p>
          <p className="flex items-center gap-2 text-sm text-neutral/80">
            <MapPinIcon className="w-4 h-4" />
            <span>{review.restaurantLocation}</span>
          </p>
        </div>

        {/* Review Text Preview */}
        <p className="text-sm text-base-content/70 line-clamp-2 mb-4 font-inter">
          {review.text}
        </p>

        {/* Footer */}
        <div className="card-actions justify-between items-center pt-3 border-t border-base-300">
          {/* Reviewer Info */}
          <div className="flex items-center gap-2">
            <div className="avatar">
              <div className="w-8 h-8 rounded-full ring-2 ring-primary/20">
                <img src={review.user.photoURL} alt={review.user.displayName} />
              </div>
            </div>
            <span className="text-xs text-neutral font-medium">
              {review.user.displayName}
            </span>
          </div>

          {/* View Details Button */}
          <Link to={`/reviews/${review._id}`}>
            <button className="btn btn-sm border-0 bg-linear-to-r from-primary to-accent text-primary-content rounded-full">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
