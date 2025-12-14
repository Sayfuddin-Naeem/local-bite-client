import { Heart, Notebook, Star } from "lucide-react";
import StatsCard from "../../../../features/cards/StatsCard";

function StatsCards({ totalReview, avgRating, totalFavorite }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <StatsCard
        icon={Notebook}
        value={totalReview}
        label="Total Reviews"
        color="text-primary"
      />
      <StatsCard
        icon={Star}
        value={avgRating}
        label="Average Ratings"
        color="text-secondary"
      />
      <StatsCard
        icon={Heart}
        value={totalFavorite}
        label="Total Favorites"
        color="text-accent"
      />
    </div>
  );
}

export default StatsCards;
