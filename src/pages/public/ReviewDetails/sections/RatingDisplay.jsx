import { Star } from "lucide-react";

const RatingDisplay = ({ rating, size = "md", showValue = true }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`${sizeClasses[size]} ${
              i < rating ? "fill-primary text-primary" : "text-base-300"
            }`}
          />
        ))}
      </div>
      {showValue && (
        <span className="font-semibold text-base-content">{rating}.0</span>
      )}
    </div>
  );
};

export default RatingDisplay;