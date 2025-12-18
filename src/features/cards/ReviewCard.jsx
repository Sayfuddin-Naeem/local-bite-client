import { ExternalLink, Heart, MapPin, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { formatDate } from "../../utils/auth.utils";
import FavoriteButton from "./FavoriteButton";
import { useGetFavorite } from "../../hooks/favorite";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const ReviewCard = ({
  review,
  onToggleFavorite,
  onViewDetails,
}) => {
  const [totalFavorite, setTotalFavorite] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  const { dbUser } = useAuth();
  const { data: favorite } = useGetFavorite({
      userId: dbUser?._id,
      reviewId: review?._id,
    });

  useEffect(() => {
    if (review) {
      setTotalFavorite(review.totalFavorite);
    }
    if(favorite){
      setIsFavorited(true);
    }
  }, [review, favorite]);

  if (!review) return null;
  return (
    <motion.div
  layout
  whileHover={{ y: -4 }}
  transition={{ type: "spring", stiffness: 200, damping: 20 }}
  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
>
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={review?.food?.image[review?.imageIndex]}
          alt={review?.food?.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3 badge badge-accent badge-lg shadow-lg">
          {review.food.category}
        </div>

        {/* Favorite Button */}
        <div className="absolute top-3 right-3">
          <FavoriteButton
            isFavorited={isFavorited}
            onToggle={() =>
              onToggleFavorite({
                reviewId: review._id,
                isFavorited,
                setIsFavorited,
                setTotalFavorite,
              })
            }
            isLoggedIn={!!dbUser}
          />
        </div>

        {/* Food Name on Image */}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-xl font-bold font-popins text-white line-clamp-1">
            {review.food.name}
          </h3>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Rating */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < review.rating
                      ? "fill-primary text-primary"
                      : "text-base-content-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-neutral">
              {review.rating}.0
            </span>
          </div>

          {/* Favorite Count */}
          <div className="flex items-center gap-1 text-neutral">
            <Heart className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold">
              {totalFavorite}
            </span>
          </div>
        </div>

        {/* Restaurant Info */}
        <div className="space-y-1 mb-3">
          <div className="flex items-center gap-2 text-sm text-neutral">
            <MapPin className="w-4 h-4 text-secondary" />
            <span className="font-medium">{review.restaurantName}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-neutral">
            <span className="ml-6 line-clamp-1">
              {review.restaurantLocation}
            </span>
          </div>
        </div>

        {/* Review Text Preview */}
        <p
          className="text-sm text-neutral line-clamp-2 mb-4"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {review.text}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-base-content-300">
          {/* Reviewer Info */}
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <div className="avatar">
              <div className="w-8 h-8 rounded-full ring-2 ring-primary/20">
                <img
                  src={review.user?.photoURL}
                  alt={review.user?.displayName}
                />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-base-content truncate">
                {review.user?.displayName}
              </p>
              <p className="text-xs text-neutral">
                {formatDate(review.createdAt)}
              </p>
            </div>
          </div>

          {/* View Details Button */}
          <button
            onClick={() => onViewDetails(review._id)}
            className="btn btn-sm bg-primary text-white border-0 rounded-full hover:bg-[oklch(70%_0.18_45)] gap-1 shrink-0"
          >
            <ExternalLink className="w-3 h-3" />
            View
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewCard;
