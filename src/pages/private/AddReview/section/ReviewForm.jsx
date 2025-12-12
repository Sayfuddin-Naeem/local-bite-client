import { zodResolver } from "@hookform/resolvers/zod";
import {
  FileText,
  Image,
  Loader,
  MapPin,
  Save,
  Upload,
  Utensils,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import CategoryField from "../../../../components/form/CategoryField";
import InputField from "../../../../components/form/InputField";
import TextareaField from "../../../../components/form/TextareaField";
import LoadingState from "../../../../components/shared/LoadingState/LoadingState";
import { useReviewById } from "../../../../hooks/review";
import {
  editReviewSchema,
  reviewSchema,
} from "../../../../schemas/review.schema";
import StarRating from "./StarRating";

function ReviewForm({ isEditMode, setRating, rating, onSubmit, reviewId }) {
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [review, setReview] = useState(null);

  const { data: reviewData, isLoading } = useReviewById(reviewId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(isEditMode ? editReviewSchema : reviewSchema),
  });

  console.log(reviewData);
  useEffect(() => {
    if (reviewId && reviewData) {
      const r = reviewData;
      const food = r.food;
      setReview(r);
      console.log("reviewId:", reviewId, "review:", r);
      reset({
        food: food.name,
        foodDescription: food.description[r.descriptionIndex],
        category: food.category,
        text: r.text,
        restaurantName: r.restaurantName,
        restaurantLocation: r.restaurantLocation,
      });
      setRating(r.rating);
      setImagePreview(food.image[r.imageIndex]);
    }
  }, [reviewId, reviewData, reset, setRating]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("image", file, { shouldValidate: true });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setValue("image", null);
    setImagePreview(isEditMode ? reviewData?.review?.image : null);
  };

  const submitHandler = (data) => {
    onSubmit(data, {
      setIsSubmitting,
      setImagePreview,
      setUploadProgress,
      reset,
      review,
    });
  };

  const reviewLength = watch("text")?.length || 0;
  const descriptionLength = watch("foodDescription")?.length || 0;

  if (isLoading) {
    return <LoadingState />;
  }
  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-base-300"
    >
      <div className="space-y-6">
        {/* Image Upload Section */}
        <div className="bg-linear-to-br from-[oklch(75%_0.18_45)]/5 to-[oklch(70%_0.18_140)]/5 rounded-2xl p-6 border-2 border-dashed border-[oklch(75%_0.18_45)]/30">
          <label className="block mb-3">
            <span
              className="text-sm font-semibold flex items-center gap-2 text-[oklch(20%_0_0)]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <Image className="w-5 h-5 text-[oklch(75%_0.18_45)]" />
              Food Image *
            </span>
          </label>

          {imagePreview ? (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-64 object-cover rounded-2xl shadow-lg"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-3 right-3 btn btn-circle btn-sm bg-error text-white border-0 hover:bg-error/80 shadow-lg"
              >
                <X className="w-4 h-4" />
              </button>
              <label className="absolute bottom-3 right-3 btn btn-sm bg-white/90 backdrop-blur-sm rounded-full gap-2 hover:bg-white border-0 shadow-lg cursor-pointer">
                <Upload className="w-4 h-4" />
                Change
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-[oklch(75%_0.18_45)]/30 rounded-2xl cursor-pointer hover:border-[oklch(75%_0.18_45)] hover:bg-[oklch(75%_0.18_45)]/5 transition-all">
              <Upload className="w-12 h-12 text-[oklch(75%_0.18_45)] mb-3" />
              <p
                className="font-semibold text-[oklch(20%_0_0)] mb-1"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Click to upload food image
              </p>
              <p className="text-sm text-[oklch(35%_0.02_60)]">
                PNG, JPG, WEBP up to 5MB
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          )}

          {errors.image && (
            <p className="text-error text-sm mt-2 flex items-center gap-1">
              <X className="w-4 h-4" />
              {errors.image.message}
            </p>
          )}
        </div>

        {/* Food Name & Category Row */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Food Name */}
          <InputField
            name={"food"}
            type="text"
            label={"Food Name *"}
            placeholder={"e.g., Chicken Biryani"}
            icon={Utensils}
            register={register}
            error={errors.food}
          />

          {/* Category */}
          <CategoryField register={register} error={errors.category} />
        </div>

        {/* Food Description */}
        <TextareaField
          icon={FileText}
          label={"Food Description *"}
          name={"foodDescription"}
          register={register}
          placeholder={
            "Describe the food, its ingredients, taste, presentation..."
          }
          error={errors.foodDescription}
          textLength={descriptionLength}
        />

        {/* Restaurant Name & Location Row */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Restaurant Name */}

          <InputField
            icon={Utensils}
            iconColor={"text-secondary"}
            label={"Restaurant Name *"}
            name={"restaurantName"}
            register={register}
            placeholder={"e.g., Star Kabab"}
            error={errors.restaurantName}
          />
          {/* Location */}
          <InputField
            icon={MapPin}
            iconColor={"text-secondary"}
            label={"Location *"}
            name={"restaurantLocation"}
            register={register}
            placeholder={"e.g., Dhanmondi, Dhaka"}
            error={errors.restaurantLocation}
          />
        </div>

        {/* Rating */}
        <StarRating
          rating={rating}
          setRating={setRating}
          setValue={setValue}
          error={errors.rating}
        />

        {/* Review Text */}
        <TextareaField
          icon={FileText}
          label={"Your Review *"}
          name={"text"}
          register={register}
          placeholder={
            "Share your detailed experience, what you loved, what could be better..."
          }
          error={errors.text}
          textLength={reviewLength}
        />

        {/* Upload Progress */}
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="bg-base-200 rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <Loader className="w-5 h-5 text-primary animate-spin" />
              <span className="text-sm font-medium text-base-content">
                Uploading image...
              </span>
            </div>
            <progress
              className="progress progress-primary w-full"
              value={uploadProgress}
              max="100"
            ></progress>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn flex-1 rounded-[1.25rem] border-0 bg-primary text-white hover:bg-[oklch(70%_0.18_45)] shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                {isEditMode ? "Updating..." : "Creating..."}
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                {isEditMode ? "Update Review" : "Submit Review"}
              </>
            )}
          </button>

          {isEditMode && (
            <Link to={"/my-reviews"}>
              <button
                type="button"
                className="btn btn-ghost rounded-[1.25rem] px-8"
              >
                Cancel
              </button>
            </Link>
          )}
        </div>
      </div>
    </form>
  );
}

export default ReviewForm;
