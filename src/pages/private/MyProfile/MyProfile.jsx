import {
  Award,
  Heart,
  LogOut,
  MapPin,
  MessageCircle,
  Star,
  TrendingUp,
} from "lucide-react";
import ProfileHeader from "./Section/ProfileHeader";
import { useSignOut } from "../../../hooks/auth";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

// Mock data - Replace with real data from your backend
const mockUser = {
  _id: "123456789",
  displayName: "Sarah Johnson",
  email: "sarah.johnson@example.com",
  photoURL:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
  role: "user",
  createdAt: "2024-01-15T10:30:00Z",
  stats: {
    totalReviews: 24,
    totalFavorites: 12,
    totalComments: 89,
    avgRating: 4.3,
  },
  achievements: [
    {
      id: 1,
      name: "Food Explorer",
      icon: "🗺️",
      description: "Reviewed 20+ restaurants",
    },
    {
      id: 2,
      name: "Top Reviewer",
      icon: "⭐",
      description: "Top 10% of reviewers",
    },
    {
      id: 3,
      name: "Community Hero",
      icon: "💬",
      description: "50+ helpful comments",
    },
  ],
  recentActivity: [
    {
      id: 1,
      type: "review",
      food: "Chicken Biryani",
      restaurant: "Star Kabab",
      date: "2 days ago",
      rating: 5,
    },
    {
      id: 2,
      type: "favorite",
      food: "Beef Burger",
      restaurant: "Burger Lab",
      date: "5 days ago",
    },
    {
      id: 3,
      type: "comment",
      food: "Fuchka",
      restaurant: "Street Corner",
      date: "1 week ago",
    },
  ],
};

const MyProfile = () => {
  const navigate = useNavigate();
  const { mutate: logout, isPending } = useSignOut();

  const handleLogout = () => {
      logout(undefined, {
        onSuccess: () => {
          navigate("/signin");
        },
        onError: (error) => {
          toast.error(`Logout failed: ${error}`)
        },
      });
    };
  return (
    <div className="min-h-screen bg-gradient py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <ProfileHeader />

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Star className="w-6 h-6 text-primary" />
            </div>
            <div className="text-3xl font-bold font-popins text-primary mb-1">
              {mockUser.stats.totalReviews}
            </div>
            <div className="text-sm text-neutral font-inter">Total Reviews</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Heart className="w-6 h-6 text-secondary" />
            </div>
            <div className="text-3xl font-bold font-popins text-secondary mb-1">
              {mockUser.stats.totalFavorites}
            </div>
            <div className="text-sm font-inter text-neutral">Favorites</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform">
            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <MessageCircle className="w-6 h-6 text-accent" />
            </div>
            <div className="text-3xl font-bold font-popins text-accent mb-1">
              {mockUser.stats.totalComments}
            </div>
            <div className="text-sm text-neutral font-inter">Comments</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform">
            <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-warning" />
            </div>
            <div className="text-3xl font-bold font-popins text-warning mb-1">
              {mockUser.stats.avgRating.toFixed(1)}
            </div>
            <div className="text-sm text-neutral font-inter">Avg Rating</div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Achievements */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold font-popins text-base-content mb-6 flex items-center gap-2">
                <Award className="w-6 h-6 text-primary" />
                Achievements
              </h2>
              <div className="grid gap-4">
                {mockUser.achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="flex items-center gap-4 p-4 bg-linear-to-r from-primary/5 to-secondary/5 rounded-2xl border-2 border-primary/20 hover:border-primary/40 transition-all"
                  >
                    <div className="text-4xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-bold font-popins text-base-content mb-1">
                        {achievement.name}
                      </h3>
                      <p className="text-sm font-inter text-neutral">
                        {achievement.description}
                      </p>
                    </div>
                    <div className="badge badge-success gap-2">
                      <Award className="w-3 h-3" />
                      Unlocked
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold font-popins text-base-content mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-primary" />
                Recent Activity
              </h2>
              <div className="space-y-4">
                {mockUser.recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-4 p-4 bg-base-200 rounded-2xl hover:bg-base-300 transition-colors"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.type === "review"
                          ? "bg-primary/10 text-primary"
                          : activity.type === "favorite"
                          ? "bg-secondary/10 text-secondary"
                          : "bg-accent/20 text-accent"
                      }`}
                    >
                      {activity.type === "review" && (
                        <Star className="w-5 h-5" />
                      )}
                      {activity.type === "favorite" && (
                        <Heart className="w-5 h-5" />
                      )}
                      {activity.type === "comment" && (
                        <MessageCircle className="w-5 h-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold font-inter text-base-content mb-1">
                        {activity.type === "review" &&
                          `Reviewed ${activity.food}`}
                        {activity.type === "favorite" &&
                          `Added ${activity.food} to favorites`}
                        {activity.type === "comment" &&
                          `Commented on ${activity.food}`}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-[oklch(35%_0.02_60)]">
                        <MapPin className="w-4 h-4" />
                        <span>{activity.restaurant}</span>
                        {activity.rating && (
                          <>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-primary text-primary" />
                              <span>{activity.rating}.0</span>
                            </div>
                          </>
                        )}
                      </div>
                      <p className="text-xs text-[oklch(35%_0.02_60)] mt-1">
                        {activity.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold font-popins text-neutral mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="btn btn-outline w-full rounded-2xl justify-start gap-3 border-primary text-primary hover:bg-primary hover:text-white">
                  <Star className="w-5 h-5" />
                  My Reviews
                </button>
                <button className="btn btn-outline w-full rounded-2xl justify-start gap-3 border-secondary text-secondary hover:bg-secondary hover:text-white">
                  <Heart className="w-5 h-5" />
                  My Favorites
                </button>
                <button className="btn btn-outline w-full rounded-2xl justify-start gap-3 border-accent text-accent hover:bg-accent hover:text-white">
                  <MessageCircle className="w-5 h-5" />
                  Add Review
                </button>
              </div>
            </div>

            {/* Account Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold font-popins text-base-content mb-4">
                Account Info
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-base-200 rounded-2xl">
                  <span className="text-sm text-neutral font-inter">
                    User ID
                  </span>
                  <span className="font-mono text-xs text-base-content">
                    {mockUser._id.slice(0, 12)}...
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-base-content rounded-2xl">
                  <span className="text-sm text-neutral font-inter">
                    Account Status
                  </span>
                  <div className="badge badge-success gap-2">Active</div>
                </div>
                <div className="flex justify-between items-center p-3 bg-base-200 rounded-2xl">
                  <span className="text-sm text-neutral font-inter">
                    Email Verified
                  </span>
                  <div className="badge badge-success gap-2">✓ Yes</div>
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <button className="btn btn-error w-full rounded-2xl gap-2" onClick={handleLogout} disabled={isPending}>
              <LogOut className="w-5 h-5" />
              {isPending ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
