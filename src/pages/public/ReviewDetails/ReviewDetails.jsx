import { useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  Calendar,
  Heart,
  MapPin,
  MessageCircle,
  Utensils,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router";
import LoadingState from "../../../components/shared/LoadingState/LoadingState";
import ConfirmationModal from "../../../features/modals/ConfirmationModal";
import {
  useCreateComment,
  useDeleteComment,
  useGetComments,
  useUpdateComment,
} from "../../../hooks/comment";
import {
  useAddFavorite,
  useGetFavorite,
  useRemoveFavorite,
} from "../../../hooks/favorite";
import { useReviewById } from "../../../hooks/review";
import { useAuth } from "../../../providers/AuthProvider";
import { formatDate } from "../../../utils/auth.utils";
import AddCommentForm from "./sections/AddCommentForm";
import AuthPrompt from "./sections/AuthPrompt";
import CommentItem from "./sections/CommentItem";
import InfoBadge from "./sections/InfoBadge";
import RatingDisplay from "./sections/RatingDisplay";
import LoadMoreData from "../../../features/LoadMoreData/LoadMoreData";

// Main Review Detail Page Component
const ReviewDetail = () => {
  const [comments, setComments] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);
  const [totalFavorite, setTotalFavorite] = useState(0);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    comment: null,
  });

  const navigate = useNavigate();
  const { dbUser } = useAuth();
  const { reviewId } = useParams();
  const queryClient = useQueryClient();

  const { data: review, isPending: isPendingReview } = useReviewById(reviewId);
  // Favorite hooks
  const { mutateAsync: addFavorite } = useAddFavorite();
  const { data: favorite } = useGetFavorite({
    userId: dbUser?._id,
    reviewId,
  });
  const { mutateAsync: removeFavorite } = useRemoveFavorite();
  // Comment hooks
  const { mutateAsync: createComment, isPending } = useCreateComment();
  const { data: commentData, isPending: isPendingGetComment } = useGetComments({
    reviewId,
    page,
    limit: 10,
  });
  const { mutateAsync: updateComment } = useUpdateComment();
  const { mutateAsync: deleteComment, isPending: isPendingDeleteComment } =
    useDeleteComment();

  useEffect(() => {
    if (favorite) {
      setIsFavorited(true);
    }
    if (review) {
      setTotalFavorite(review.totalFavorite);
    }
    if (commentData) {
      setComments((prev) =>
        page === 1 ? commentData.comments : [...prev, ...commentData.comments]
      );
      setHasMore(commentData.pagination.hasNextPage);
    }
  }, [favorite, review, page, commentData]);

  const handleToggleFavorite = async () => {
    try {
      if (isFavorited) {
        await removeFavorite({
          url: `/favorites/${reviewId}`,
        });
        setTotalFavorite((prev) => prev - 1);
      } else {
        await addFavorite({
          body: {
            userId: dbUser?._id,
            reviewId,
          },
        });
        setTotalFavorite((prev) => prev + 1);
      }
      toast.success(
        isFavorited ? "Removed from favorites!" : "Added to favorites!"
      );
      queryClient.invalidateQueries({
        queryKey: ["review-by-id", reviewId],
      });
      setIsFavorited((prev) => !prev);
    } catch {
      toast.error("Some technical problem happened!");
    }
  };

  const handleAddComment = async (text) => {
    try {
      const newComment = await createComment({
        body: {
          userId: dbUser?._id,
          reviewId,
          text,
        },
      });
      setComments([newComment, ...comments]);
      toast.success("Comment posted successfully!");

      queryClient.invalidateQueries({
        queryKey: ["comments", reviewId],
      });
    } catch {
      toast.error("Some technical error happened!");
    }
  };

  const handleEditComment = async (commentId, newText) => {
    try {
      const updated = await updateComment({
        url: `/comments/${commentId}`,
        body: { text: newText },
      });
      // UI update
      if (updated) {
        setComments(
          comments.map((c) =>
            c._id === commentId ? { ...c, text: newText } : c
          )
        );
      }

      toast.success("Comment updated successfully!");

      queryClient.invalidateQueries({
        queryKey: ["comments", reviewId],
      });
    } catch {
      toast.error("Some technical problems happened !");
    }
  };

  const handleDeleteClick = (comment) => {
    setDeleteModal({ isOpen: true, comment });
  };

  const handleDeleteComment = async () => {
    try {
      await deleteComment({
        url: `/comments/${deleteModal.comment._id}`,
      });
      toast.success("Comment deleted successfully!");
      // update UI
      setComments((prev) =>
        prev.filter((c) => c._id !== deleteModal.comment._id)
      );

      queryClient.invalidateQueries({
        queryKey: ["comments", reviewId],
      });
    } catch {
      toast.error("Delete failed!");
    } finally {
      setDeleteModal({ isOpen: false, comment: null });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, comment: null });
  };

  const handleLoadMore = async () => {
    if (!hasMore) return;
    setPage((prev) => prev + 1);
  };

  const handleSignIn = () => {
    navigate("/signin");
  };

  if (isPendingReview) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen bg-gradient py-8 px-4 md:px-12">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link to={"/reviews"}>
          <button className="btn btn-ghost gap-2 mb-6 text-neutral hover:text-primary">
            <ArrowLeft className="w-5 h-5" />
            Back to Reviews
          </button>
        </Link>

        {/* Review Content Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-8">
          {/* Hero Image */}
          <div className="relative h-96 overflow-hidden">
            <img
              src={review?.food.image[review?.imageIndex]}
              alt={review?.food.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>

            <div className="absolute top-6 left-6 badge badge-accent badge-lg font-semibold shadow-lg">
              {review?.food.category}
            </div>

            {/* Favorite Button */}
            {dbUser && (
              <button
                onClick={handleToggleFavorite}
                className={`absolute top-6 right-6 btn btn-circle shadow-lg ${
                  isFavorited
                    ? "bg-primary border-0 text-white"
                    : "bg-white/80 backdrop-blur-sm border-0 hover:bg-primary hover:text-white"
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${isFavorited ? "fill-white" : ""}`}
                />
              </button>
            )}

            {/* Title on Image */}
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-4xl md:text-5xl font-bold font-popins text-white mb-2">
                {review?.food.name}
              </h1>
              <RatingDisplay rating={review?.rating} size="lg" />
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Restaurant Info */}
            <div className="grid md:grid-cols-2 gap-4 mb-6 p-5 bg-base-200 rounded-2xl">
              <InfoBadge
                icon={Utensils}
                text={review?.restaurantName}
                color="text-base-content"
              />
              <InfoBadge
                icon={MapPin}
                text={review?.restaurantLocation}
                color="text-neutral"
              />
            </div>

            {/* Food Description */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-base-content font-popins mb-3 flex items-center gap-2">
                <Utensils className="w-5 h-5 text-primary" />
                About this Dish
              </h3>
              <p className="text-neutral font-inter leading-relaxed">
                {review?.food.description[review?.descriptionIndex]}
              </p>
            </div>

            {/* Review Text */}
            <div className="mb-6">
              <h3 className="text-xl font-bold font-popins text-base-content mb-3 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-primary" />
                Review
              </h3>
              <p className="text-base-content font-inter text-lg leading-relaxed">
                {review?.text}
              </p>
            </div>

            {/* Reviewer Info */}
            <div className="flex items-center justify-between pt-6 border-t border-base-300">
              <div className="flex items-center gap-4">
                <div className="avatar">
                  <div className="w-14 h-14 rounded-full ring-2 ring-primary">
                    <img
                      src={review?.user.photoURL}
                      alt={review?.user.displayName}
                    />
                  </div>
                </div>
                <div>
                  <p className="font-semibold font-inter text-base-content">
                    {review?.user.displayName}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-neutral">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Reviewed on {formatDate(review?.createdAt, "long")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="flex items-center gap-2 text-neutral mb-1">
                  <Heart className="w-4 h-4 text-primary" />
                  <span className="text-2xl font-bold font-popins text-primary">
                    {totalFavorite}
                  </span>
                </div>
                <p className="text-xs text-neutral">Favorites</p>
              </div>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold font-popins text-base-content flex items-center gap-3">
            <MessageCircle className="w-8 h-8 text-primary" />
            Comments ({commentData?.totalComments || 0})
          </h2>

          {/* Add Comment Form or Auth Prompt */}
          {dbUser ? (
            <AddCommentForm
              onSubmit={handleAddComment}
              isSubmitting={isPending}
              userPhotoURL={
                dbUser?.photoURL || "https://via.placeholder.com/100"
              }
            />
          ) : (
            <AuthPrompt
              message="Sign in to join the conversation and share your thoughts"
              actionText="Sign In to Comment"
              onAction={handleSignIn}
            />
          )}

          {/* Comments List */}
          <div className="space-y-4">
            {comments ? (
              <>
                {comments.map((comment) => (
                  <CommentItem
                    key={comment?._id}
                    comment={comment}
                    currentUserId={dbUser?._id}
                    onEdit={handleEditComment}
                    onDelete={handleDeleteClick}
                  />
                ))}

                <LoadMoreData
                  hasMore={hasMore}
                  handleLoadMore={handleLoadMore}
                  isPending={isPendingGetComment}
                  totalItem={comments.length}
                  itemName="Comments"
                />
              </>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                <MessageCircle className="w-16 h-16 text-base-300 mx-auto mb-4" />
                <p className="text-neutral font-inter">
                  No comments yet. Be the first to share your thoughts!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteComment}
        foodName={review?.food.name}
        isPending={isPendingDeleteComment}
      />
    </div>
  );
};

export default ReviewDetail;
