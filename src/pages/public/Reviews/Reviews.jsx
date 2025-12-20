import { useQueryClient } from "@tanstack/react-query";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router";
import LoadMoreData from "../../../features/LoadMoreData/LoadMoreData";
import SearchBar from "../../../features/SearchBar/SearchBar";
import ReviewCard from "../../../features/cards/ReviewCard";
import { useAddFavorite, useRemoveFavorite } from "../../../hooks/favorite";
import { useAllReviews } from "../../../hooks/review";
import { useAuth } from "../../../providers/AuthProvider";
import EmptyState from "./sections/EmptyState";
import ReviewCardSkeleton from "./sections/ReviewCardSkeleton";
import SignInAlertModal from "../../../features/modals/SignInAlertModal";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerGrid = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

// Main All Reviews Page Component
const Reviews = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [signInModal, setSignInModal] = useState({
      isOpen: false,
      foodName: null,
    });
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const search = searchParams.get("search") || "";
  const queryClient = useQueryClient();
  const { dbUser } = useAuth();

  // api hooks
  const { data: reviewData, isPending: isPendingReview } = useAllReviews({
    page,
    limit: 10,
    search: debouncedSearch,
  });
  const { mutateAsync: addFavorite } = useAddFavorite();
  const { mutateAsync: removeFavorite } = useRemoveFavorite();

  // Debounce search
  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setIsSearching(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Reset page after debounce
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  // Set state values
  useEffect(() => {
    if (reviewData) {
      setReviews((prev) =>
        page === 1 ? reviewData.reviews : [...prev, ...reviewData.reviews]
      );
      setHasMore(reviewData.pagination.hasNextPage);
    }
    if(search){
      setSearchQuery(search);
      setSearchParams((prev)=>{
        prev.set("search", "");
        return prev;
      })
    }
  }, [reviewData, page, search, setSearchParams]);

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setDebouncedSearch("");
  };

  const handleLoadMore = async () => {
    if (!hasMore) return;
    setPage((prev) => prev + 1);
  };

  const handleToggleFavorite = async ({
    reviewId,
    isFavorited,
    setIsFavorited,
    setTotalFavorite,
  }) => {
    if (!dbUser) return;

    setIsFavorited((prev) => !prev);
    setTotalFavorite((prev) => (isFavorited ? prev - 1 : prev + 1));
    try {
      if (isFavorited) {
        await removeFavorite({
          url: `/favorites/${reviewId}`,
        });
      } else {
        await addFavorite({
          body: {
            userId: dbUser?._id,
            reviewId,
          },
        });
      }
      toast.success(
        isFavorited ? "Removed from favorites!" : "Added to favorites!"
      );
      queryClient.invalidateQueries({
        queryKey: [
          "all-reviews",
          page,
          reviewData?.pagination?.limit,
          debouncedSearch,
        ],
      });
    } catch {
      setIsFavorited((prev) => !prev);
      setTotalFavorite((prev) => (isFavorited ? prev + 1 : prev - 1));
      toast.error("Some technical problem happened!");
    }
  };

  const handleViewDetails = (reviewId) => {
    navigate(`/review/${reviewId}`);
  };

  const handleNavigateSignIn = () => {
    navigate("/signin");
  };
  const handleModalClose = () => {
    setSignInModal({ isOpen: false, foodName: null });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-gradient py-12 px-4 lg:px-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold font-popins text-base-content mb-3">
            All Reviews
          </h1>
          <p className="text-neutral font-inter text-lg">
            Discover amazing food experiences from our community
          </p>
        </motion.div>

        {/* Search Bar */}
        <div className="mb-10">
          <SearchBar
            value={searchQuery}
            onChange={handleSearchChange}
            onClear={handleClearSearch}
            isSearching={isSearching}
          />
        </div>

        {/* Results Count */}
        {reviews.length > 0 && (
          <div className="mb-6">
            <p className="text-neutral font-inter">
              {searchQuery ? (
                <>
                  Found{" "}
                  <span className="font-semibold text-base-content">
                    {reviews.length}
                  </span>{" "}
                  results for{" "}
                  <span className="font-semibold text-primary">
                    "{searchQuery}"
                  </span>
                </>
              ) : (
                <>
                  Showing{" "}
                  <span className="font-semibold text-base-content">
                    {reviews.length}
                  </span>{" "}
                  reviews
                </>
              )}
            </p>
          </div>
        )}

        {/* Reviews Grid */}
        {isPendingReview && page === 1 ? (
          <motion.div
            variants={staggerGrid}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          >
            {[...Array(10)].map((_, i) => (
              <ReviewCardSkeleton key={i} />
            ))}
          </motion.div>
        ) : reviews.length > 0 ? (
          <>
            <motion.div
              variants={staggerGrid}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
            >
              <AnimatePresence>
                {reviews.map((review) => (
                  <motion.div
                    key={review._id}
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ReviewCard
                      review={review}
                      onToggleFavorite={handleToggleFavorite}
                      onViewDetails={handleViewDetails}
                      setSignInModal={setSignInModal}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Load More */}
            <LoadMoreData
              hasMore={hasMore}
              handleLoadMore={handleLoadMore}
              isPending={isPendingReview}
              totalItem={reviews.length}
              itemName="Reviews"
            />
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <EmptyState searchQuery={searchQuery} onClear={handleClearSearch} />
          </motion.div>
        )}
      </div>
      <SignInAlertModal
        isOpen={signInModal.isOpen}
        onConfirm={handleNavigateSignIn}
        onClose={handleModalClose}
        foodName={signInModal.foodName}
      />
    </motion.div>
  );
};

export default Reviews;
