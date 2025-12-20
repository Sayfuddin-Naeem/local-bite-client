import { useQueryClient } from "@tanstack/react-query";
import { ArrowRight, Award, Star, TrendingUp, Users } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import LoadingState from "../../../components/shared/LoadingState/LoadingState";
import ReviewCard from "../../../features/cards/ReviewCard";
import StatsCard from "../../../features/cards/StatsCard";
import TrendingFoodCard from "../../../features/cards/TrendingFoodCard ";
import SignInAlertModal from "../../../features/modals/SignInAlertModal";
import { useAddFavorite, useRemoveFavorite } from "../../../hooks/favorite";
import { useTrendingFoods } from "../../../hooks/food/useTrendingFoods";
import { useGetHeroSlides } from "../../../hooks/heroSlide/useGetHeroSlides";
import { useMostFavoriteReviews } from "../../../hooks/review";
import { useAuth } from "../../../providers/AuthProvider";
import ReviewCardSkeleton from "../Reviews/sections/ReviewCardSkeleton";
import CTABanner from "./components/CTABanner";
import HeroSlider from "./components/HeroSlider";
import HeroSliderSkeleton from "./components/HeroSliderSkeleton";
import SectionHeader from "./components/SectionHeader";

const statsData = [
  {
    icon: Users,
    value: "12.5K",
    label: "Food Enthusiasts",
    color: "text-primary",
  },
  {
    icon: Star,
    value: "2.3K",
    label: "Reviews Shared",
    color: "text-secondary",
  },
  { icon: Award, value: "450+", label: "Restaurants", color: "text-accent" },
  {
    icon: TrendingUp,
    value: "4.8",
    label: "Avg Rating",
    color: "text-warning",
  },
];

const Home = () => {
  const [signInModal, setSignInModal] = useState({
    isOpen: false,
    foodName: "",
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { dbUser } = useAuth();

  //api custom hooks
  const { data: heroSlides, isPending: isPendingSlider } = useGetHeroSlides();
  const { data: featuredReviews, isPending: isPendingReview } =
    useMostFavoriteReviews({
      page: 1,
      limit: 6,
    });

  const { mutateAsync: addFavorite } = useAddFavorite();
  const { mutateAsync: removeFavorite } = useRemoveFavorite();
  const { data: trendingFoods, isPending: isPendingFood } = useTrendingFoods({
    page: 1,
    limit: 8,
  });

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
        queryKey: ["most-favorite-reviews"],
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

  const handleViewReviews = (foodName) => {
    navigate(`/reviews?search=${foodName}`);
  };

  const handleShowAllReviews = () => {
    navigate("/reviews");
  };

  const handleNavigateSignIn = () => {
    navigate("/signin");
  };
  const handleModalClose = () => {
    setSignInModal({ isOpen: false, foodName: null });
  };

  return (
    <>
      <title>Home - Local Bite</title>
      <div className="min-h-screen bg-gradient px-4 lg:px-12">
        {/* Hero Section */}
        <section className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            {isPendingSlider ? (
              <HeroSliderSkeleton />
            ) : (
              <HeroSlider slides={heroSlides} />
            )}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 px-4 bg-base-200">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {statsData.map((stat, index) => (
                <StatsCard
                  key={index}
                  icon={stat.icon}
                  value={stat.value}
                  label={stat.label}
                  color={stat.color}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Reviews Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              icon={Star}
              title="Featured Reviews"
              subtitle="Top-rated food experiences from our community"
              action={
                <button
                  onClick={handleShowAllReviews}
                  className="btn btn-primary rounded-full gap-2"
                >
                  Show All Reviews
                  <ArrowRight className="w-5 h-5" />
                </button>
              }
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isPendingReview
                ? [...Array(10)].map((_, i) => <ReviewCardSkeleton key={i} />)
                : featuredReviews.reviews.map((review) => (
                    <div key={review._id}>
                      <ReviewCard
                        review={review}
                        onToggleFavorite={handleToggleFavorite}
                        onViewDetails={handleViewDetails}
                        setSignInModal={setSignInModal}
                      />
                    </div>
                  ))}
            </div>
          </div>
        </section>

        {/* Trending Foods Section */}
        <section className="py-16 px-4 bg-base-200">
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              icon={TrendingUp}
              title="Trending Foods"
              subtitle="Most loved dishes based on reviews and ratings"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {isPendingFood ? (
                <LoadingState />
              ) : (
                trendingFoods.foods.map((food) => (
                  <TrendingFoodCard
                    key={food._id}
                    food={food}
                    onViewReview={handleViewReviews}
                  />
                ))
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <CTABanner
              title="Join Our Food Community"
              description="Share your food experiences, discover hidden gems, and connect with fellow food enthusiasts"
              buttonText="Get Started Free"
              onClick={handleNavigateSignIn}
              bgGradient="bg-gradient-to-r from-primary to-secondary"
            />
          </div>
        </section>

        {/* Sign In Modal */}
        <SignInAlertModal
          isOpen={signInModal.isOpen}
          onConfirm={handleNavigateSignIn}
          onClose={handleModalClose}
          foodName={signInModal.foodName}
        />
      </div>
    </>
  );
};

export default Home;
