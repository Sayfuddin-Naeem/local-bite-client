import React from "react";

const TrendingFoodCard = ({ food }) => {
  return (
    <div className="card bg-linear-to-br from-base-100 to-base-200 shadow-lg hover:shadow-xl transition-all duration-300 rounded-(--radius-box)">
      <figure className="px-4 pt-4">
        <img 
          src={food.image[0]} 
          alt={food.name}
          className="rounded-(--radius-box) h-48 w-full object-cover"
        />
      </figure>
      <div className="card-body items-center text-center p-4">
        <h3 className="card-title font-popins text-lg">{food.name}</h3>
        <div className="flex items-center gap-2">
          <div className="rating rating-sm">
            <StarIcon className="fill-primary w-4 h-4" />
          </div>
          <span className="text-sm font-semibold text-primary">{food.avgRating.toFixed(1)}</span>
          <span className="text-xs text-neutral">({food.totalReviews} reviews)</span>
        </div>
        <div className="badge badge-outline badge-sm mt-2">{food.category}</div>
      </div>
    </div>
  );
};

export default TrendingFoodCard;