import { useQueryClient } from "@tanstack/react-query";
import { Loader, Plus, Star } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import LoadingState from "../../../components/shared/LoadingState/LoadingState";
import ReviewMobileCard from "../../../features/cards/MyReviews/ReviewMobileCard";
import ReviewTableRow from "../../../features/cards/MyReviews/ReviewTableRow";
import DeleteConfirmationModal from "../../../features/modals/DeleteConfirmationModal";
import { useDeleteReview, useUserReviews } from "../../../hooks/review";
import { useAuth } from "../../../providers/AuthProvider";
import Header from "./Sections/Header";
import StatsCards from "./Sections/StatsCards";

const MyReviews = () => {
  const [page, setPage] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    review: null,
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { dbUser } = useAuth();

  const { data, isLoading } = useUserReviews({
    userId: dbUser._id,
    page,
    limit: 6,
  });
  const { mutateAsync: deleteReview, isPending } = useDeleteReview();

  useEffect(() => {
    if (data) {
      setReviews((prev) =>
        page === 1 ? data.reviews : [...prev, ...data.reviews]
      );
      setHasMore(data.pagination.hasNextPage);
    }
  }, [data, page]);

  const handleLoadMore = async () => {
    if (!hasMore) return;
    setPage((prev) => prev + 1);
  };

  const handleEdit = (reviewId) => {
    navigate(`/edit-review/${reviewId}`);
  };

  const handleDeleteClick = (review) => {
    setDeleteModal({ isOpen: true, review });
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteReview({
        url: `/reviews/${deleteModal.review._id}`,
      });

      toast.success("Review deleted successfully!");

      // UI update
      setReviews((prev) =>
        prev.filter((r) => r._id !== deleteModal.review._id)
      );

      // update cache
      queryClient.invalidateQueries({
        queryKey: ["user-reviews", dbUser._id],
      });
    } catch {
      toast.error("Failed to delete review");
    } finally {
      setDeleteModal({ isOpen: false, review: null });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, review: null });
  };

  if (isLoading) {
    return <LoadingState />;
  }
  return (
    <div className="min-h-screen bg-gradient py-12 px-4 md:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Header />

        {/* Stats Cards */}
        <StatsCards
          totalReview={data?.summary?.totalReview || 0}
          avgRating={data?.summary?.avgRating || 0}
          totalFavorite={data?.summary?.totalFavorites || 0}
        />

        {/* Reviews Table for Desktop */}
        <div className="hidden md:block bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="table">
              <thead className="bg-linear-to-r from-primary to-secondary">
                <tr>
                  <th className="text-white font-popins">Food</th>
                  <th className="text-white font-popins">Restaurant</th>
                  <th className="text-white font-popins">Posted Date</th>
                  <th className="text-white font-popins text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review) => (
                  <ReviewTableRow
                    key={review._id}
                    review={review}
                    onEdit={handleEdit}
                    onDelete={handleDeleteClick}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Reviews Cards for Mobile */}
        <div className="md:hidden space-y-4 mb-6">
          {reviews.map((review) => (
            <ReviewMobileCard
              key={review._id}
              review={review}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center">
            <button
              onClick={handleLoadMore}
              disabled={isLoading}
              className="btn btn-wide bg-primary text-white border-0 rounded-2xl hover:bg-[oklch(70%_0.18_45)] shadow-lg gap-2"
            >
              {isLoading ? (
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
        {!hasMore && reviews.length > 0 && (
          <div className="text-center py-8">
            <div className="inline-flex items-center gap-2 text-neutral bg-white px-6 py-3 rounded-full shadow-lg">
              <Star className="w-5 h-5 text-primary" />
              <span className="font-inter">
                You've reached the end of your reviews
              </span>
            </div>
          </div>
        )}

        {/* Empty State */}
        {reviews.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Star className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-2xl font-bold font-popins text-base-content mb-3">
              No Reviews Yet
            </h3>
            <p className="text-neutral font-inter mb-6">
              Start sharing your food experiences with the community
            </p>
            <button className="btn bg-primary text-white border-0 rounded-2xl gap-2 hover:bg-[oklch(70%_0.18_45)]">
              <Plus className="w-5 h-5" />
              Add Your First Review
            </button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        reviewName={deleteModal.review?.food.name}
        isDeleting={isPending}
      />
    </div>
  );
};

export default MyReviews;
