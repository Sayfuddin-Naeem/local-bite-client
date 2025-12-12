import { Star, XCircle } from "lucide-react";
import Label from "../../../../components/form/Label";

function StarRating({ rating, setRating, setValue, error }) {
  return (
    <div className="bg-linear-to-br from-[oklch(75%_0.18_45)]/5 to-[oklch(70%_0.18_140)]/5 rounded-2xl p-6">
      <Label icon={Star} label={"Your Rating *"} />
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => {
                setRating(star);
                setValue("rating", star, { shouldValidate: true });
              }}
              className={`transition-all duration-200 hover:scale-110 ${
                star <= rating ? "text-primary" : "text-base-300"
              }`}
            >
              <Star
                className={`w-12 h-12 ${star <= rating ? "fill-primary" : ""}`}
              />
            </button>
          ))}
        </div>
        {rating > 0 && (
          <div className="badge badge-lg bg-[oklch(75%_0.18_45)] text-white border-0 gap-2">
            <Star className="w-4 h-4 fill-white" />
            {rating}.0
          </div>
        )}
      </div>
      {error && (
        <span className="text-xs text-error flex items-center gap-1 mt-1">
          <XCircle className="w-3 h-3" />
          {error.message}
        </span>
      )}
    </div>
  );
}

export default StarRating;
