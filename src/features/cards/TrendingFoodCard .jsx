import { Star } from "lucide-react";

const TrendingFoodCard = ({ food, onViewReview }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group">
      <figure className="relative h-48 overflow-hidden">
        <img
          src={food.image[0]}
          alt={food.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 badge badge-accent shadow-lg">
          {food.category}
        </div>
      </figure>
      <div className="p-5 text-center">
        <h3 className="text-lg font-bold text-base-content mb-2 font-popins line-clamp-1">
          {food.name}
        </h3>
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-primary text-primary" />
          </div>
          <span className="text-sm font-semibold text-primary">
            {food.avgRating.toFixed(1)}
          </span>
          <span className="text-xs text-neutral">
            ({food.totalReviews} reviews)
          </span>
        </div>
        <button
          onClick={()=> onViewReview(food.name)}
          className="btn btn-sm btn-outline btn-primary rounded-full w-full mt-2"
        >
          View Reviews
        </button>
      </div>
    </div>
  );
};

export default TrendingFoodCard;
