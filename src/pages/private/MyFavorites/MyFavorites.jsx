import { useQueryClient } from "@tanstack/react-query";
import { Heart, MapPin, Star } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import LoadingState from "../../../components/shared/LoadingState/LoadingState";
import Tittle from "../../../components/shared/Tittle";
import FavoriteCard from "../../../features/cards/FavoriteCard";
import StatsCard from "../../../features/cards/StatsCard";
import LoadMoreData from "../../../features/LoadMoreData/LoadMoreData";
import RemoveFavoriteModal from "../../../features/modals/RemoveFavoriteModal";
import { useRemoveFavorite, useUserFavorites } from "../../../hooks/favorite";
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

  const { data, isPendingGet } = useUserFavorites({
    userId: dbUser?._id,
    page,
    limit: 6,
  });
  const { mutateAsync: removeFavorite, isPending: isPendingRemove } =
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
        url: `/favorites/${removeModal.favorite.review._id}`,
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
    navigate(`/review/${reviewId}`);
  };

  const handleBrowseReviews = () => {
    navigate("/reviews");
  };

  if (isPendingGet) {
    return <LoadingState />;
  }

  return (
    <Tittle titleText={`My Favorites | Local Bite`}>
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
              <LoadMoreData
                hasMore={hasMore}
                handleLoadMore={handleLoadMore}
                isPending={isPendingGet}
                totalItem={favorites.length}
                itemName={"Favorites"}
              />
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
          isRemoving={isPendingRemove}
        />
      </div>
    </Tittle>
  );
};

export default MyFavorites;
