import { useQueryClient } from "@tanstack/react-query";
import { Heart, MapPin, Star } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import LoadingState from "../../../components/shared/LoadingState/LoadingState";
import FavoriteCard from "../../../features/cards/FavoriteCard";
import StatsCard from "../../../features/cards/StatsCard";
import RemoveFavoriteModal from "../../../features/modals/RemoveFavoriteModal";
import { useRemoveFavorite } from "../../../hooks/favorite/useRemoveFavorite";
import { useUserFavorites } from "../../../hooks/favorite/useUserFavorites";
import { useAuth } from "../../../providers/AuthProvider";
import EmptyState from "./sections/EmptyState";

const MyFavorites = () => {
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [removeModal, setRemoveModal] = useState({
    isOpen: false,
    favorite: null,
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { dbUser } = useAuth();

  const { data, isPending } = useUserFavorites({
    userId: dbUser?._id,
    page,
    limit: 6,
  });
  const { mutateAsync: removeFavorite, isPending: isPendingFavorite } =
    useRemoveFavorite();

  useEffect(() => {
    if (data) {
      setFavorites((prev) =>
        page === 1 ? data.favorites : [...prev, ...data.favorites]
      );
      setHasMore(data.pagination.hasNextPage);
    }
  }, [data, page]);

  const handleLoadMore = async () => {
    if (!hasMore) return;
    setPage((prev) => prev + 1);
  };

  const handleRemoveClick = (favorite) => {
    setRemoveModal({ isOpen: true, favorite });
  };

  const handleRemoveConfirm = async () => {
    try {
      await removeFavorite({
        url: `/favorites/${removeModal.favorite._id}`,
      });
      toast.success("Review removed from favorite successfully");

      // Update UI
      setFavorites((prev) =>
        prev.filter((f) => f._id !== removeModal.favorite._id)
      );
      // update cache
      queryClient.invalidateQueries({
        queryKey: ["user-favorites", dbUser._id],
      });
    } catch {
      toast.error("Failed to remove review from favorite");

    } finally {
      setRemoveModal({ isOpen: false, favorite: null });
    }
  };

  const handleRemoveCancel = () => {
    setRemoveModal({ isOpen: false, favorite: null });
  };

  const handleViewReview = (reviewId) => {
    console.log("View review:", reviewId);
    alert(`Navigate to review detail page: ${reviewId}`);
  };

  const handleBrowseReviews = () => {
    navigate("/reviews");
  };

  if (isPending) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen bg-gradient py-12 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
              <Heart className="w-6 h-6 text-white fill-white" />
            </div>
            <h1 className="text-4xl font-bold font-popins text-base-content">
              My Favorites
            </h1>
          </div>
          <p className="text-neutral font-inter ml-15">
            Your collection of favorite food reviews
          </p>
        </div>

        {favorites.length > 0 ? (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <StatsCard
                icon={Heart}
                value={data?.summary?.totalFavorite}
                label="Total Favorites"
                color="text-primary"
              />
              <StatsCard
                icon={Star}
                value={data?.summary?.avgRating}
                label="Average Rating"
                color="text-primary"
              />
              <StatsCard
                icon={MapPin}
                value={data?.summary?.uniqueCategories}
                label="Food Categories"
                color="text-accent"
              />
            </div>

            {/* Favorites Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((favorite) => (
                <FavoriteCard
                  key={favorite._id}
                  favorite={favorite}
                  onRemove={handleRemoveClick}
                  onViewReview={handleViewReview}
                />
              ))}
            </div>
            {/* Load More Button */}
            {hasMore && (
              <div className="text-center">
                <button
                  onClick={handleLoadMore}
                  disabled={isPending}
                  className="btn btn-wide bg-primary text-white border-0 rounded-2xl hover:bg-[oklch(70%_0.18_45)] shadow-lg gap-2"
                >
                  {isPending ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>Load More Reviews</>
                  )}
                </button>
              </div>
            )}

            {/* No More Reviews Message */}
            {!hasMore && favorites.length > 0 && (
              <div className="text-center py-8">
                <div className="inline-flex items-center gap-2 text-neutral bg-white px-6 py-3 rounded-full shadow-lg">
                  <Star className="w-5 h-5 text-primary" />
                  <span className="font-inter">
                    You've reached the end of your reviews
                  </span>
                </div>
              </div>
            )}
          </>
        ) : (
          <EmptyState
            icon={Heart}
            title="No Favorites Yet"
            description="Start exploring and save your favorite food reviews to build your personalized collection"
            actionText="Browse Reviews"
            onAction={handleBrowseReviews}
          />
        )}
      </div>

      {/* Remove Confirmation Modal */}
      <RemoveFavoriteModal
        isOpen={removeModal.isOpen}
        onClose={handleRemoveCancel}
        onConfirm={handleRemoveConfirm}
        foodName={removeModal.favorite?.review.food.name}
        isRemoving={isPendingFavorite}
      />
    </div>
  );
};

export default MyFavorites;
