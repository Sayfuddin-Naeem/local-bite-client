import { Calendar, ExternalLink, Heart, MapPin, Star, Trash2 } from "lucide-react";
import { formatDate } from "../../utils/auth.utils";
import LoadingState from "../../components/shared/LoadingState/LoadingState";

const FavoriteCard = ({ favorite, onRemove, onViewReview }) => {
  const { review, user } = favorite;

  if(!favorite){
    <LoadingState />
  }
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={review?.food?.image[review?.imageIndex]}
          alt={review?.food?.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 badge bg-primary text-white border-0 gap-1">
          <Heart className="w-3 h-3 fill-white" />
          {review?.totalFavorite}
        </div>
        <div className="absolute top-3 right-3 badge badge-accent badge-lg">
          {review?.food?.category}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Food Name */}
        <h3 className="text-xl font-bold font-popins text-base-content mb-2 line-clamp-1">
          {review?.food?.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < review?.rating
                    ? 'fill-primary text-primary'
                    : 'text-base-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-neutral">{review?.rating}.0</span>
        </div>

        {/* Restaurant Info */}
        <div className="space-y-1 mb-3">
          <div className="flex items-center gap-2 text-sm text-neutral">
            <MapPin className="w-4 h-4 text-secondary" />
            <span className="font-medium">{review?.restaurantName}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-neutral">
            <span className="ml-6">{review?.restaurantLocation}</span>
          </div>
        </div>

        {/* Review Text Preview */}
        <p className="text-sm text-neutral font-inter line-clamp-2 mb-4">
          {review?.text}
        </p>

        {/* Reviewer Info */}
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-base-300">
          <div className="avatar">
            <div className="w-8 h-8 rounded-full ring-2 ring-primary/20">
              <img src={user?.photoURL} alt={user?.displayName} />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-base-content truncate">{user?.displayName}</p>
            <p className="text-xs text-neutral">
              {formatDate(review?.createdAt)}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-neutral mb-4">
          <Calendar className="w-3 h-3" />
          <span>Added {formatDate(favorite.createdAt)}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onViewReview(review._id)}
            className="btn btn-sm flex-1 bg-primary text-white border-0 rounded-xl hover:bg-[oklch(70%_0.18_45)] gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            View Review
          </button>
          <button
            onClick={() => onRemove(favorite)}
            className="btn btn-sm btn-ghost text-error hover:bg-error hover:text-white rounded-xl"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoriteCard;