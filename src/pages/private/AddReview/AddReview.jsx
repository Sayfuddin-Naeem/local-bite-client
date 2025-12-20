import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router";
import Tittle from "../../../components/shared/Tittle";
import { useUploadImage } from "../../../hooks/image";
import { useCreateReview, useUpdateReview } from "../../../hooks/review";
import { useAuth } from "../../../providers/AuthProvider";
import ReviewForm from "./section/ReviewForm";
import Tips from "./section/Tips";

const AddEditReview = ({ isEditMode = false }) => {
  const [rating, setRating] = useState(0);

  const { dbUser } = useAuth();
  const { id: reviewId } = useParams();

  const { mutateAsync: createReview } = useCreateReview();
  const { mutateAsync: updateReview } = useUpdateReview(reviewId);
  const { mutateAsync: uploadImage } = useUploadImage();

  const onSubmit = async (
    data,
    { setIsSubmitting, setImagePreview, setUploadProgress, reset, review }
  ) => {
    setIsSubmitting(true);

    try {
      let image = review?.food?.image?.[review?.imageIndex] ?? null;
      let cloudinary_public_id =
        review?.food?.cloudinary_public_id?.[review?.imageIndex] ?? null;

      // Upload image to Cloudinary if new image selected
      if (data.image instanceof File) {
        setUploadProgress(30);
        const formData = new FormData();
        formData.append("image", data.image);

        const res = await uploadImage({ body: formData });
        setUploadProgress(60);

        image = res.url;
        cloudinary_public_id = res.public_id;
        setUploadProgress(100);
      }

      // Prepare review data
      const reviewData = {
        food: data.food,
        foodDescription: data.foodDescription,
        category: data.category,
        rating: rating,
        text: data.text,
        restaurantName: data.restaurantName,
        restaurantLocation: data.restaurantLocation,
        image,
        cloudinary_public_id,
      };

      // Create review
      if (isEditMode) {
        reviewData.user = dbUser._id;
        await updateReview({ body: reviewData });
        toast.success("Review updated successfully!");
      } else {
        await createReview({ body: reviewData });
        toast.success("Review created successfully!");

        reset();
        setRating(0);
        setImagePreview(null);
      }

      if (!isEditMode) {
        reset();
        setRating(0);
        setImagePreview(null);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        "Failed to " + (isEditMode ? "update" : "create") + " review"
      );
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  return (
    <Tittle titleText={"Add Review | Local Bite"}>
      <div className="min-h-screen bg-gradient py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link to={"/my-profile"}>
              <button className="btn btn-ghost gap-2 mb-4 text-neutral hover:text-primary">
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
            </Link>
            <h1 className="text-4xl font-bold font-popins text-base-content mb-2">
              {isEditMode ? "Edit Review" : "Add New Review"}
            </h1>
            <p className="text-neutral font-inter">
              {isEditMode
                ? "Update your food experience"
                : "Share your food experience with the community"}
            </p>
          </div>

          {/* Form Card */}
          <ReviewForm
            isEditMode={isEditMode}
            setRating={setRating}
            rating={rating}
            onSubmit={onSubmit}
            reviewId={reviewId}
          />

          {/* Tips Section */}
          <Tips />
        </div>
      </div>
    </Tittle>
  );
};

export default AddEditReview;
