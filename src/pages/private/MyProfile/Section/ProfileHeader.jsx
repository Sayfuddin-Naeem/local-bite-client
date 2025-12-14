import { zodResolver } from "@hookform/resolvers/zod";
import {
  Award,
  Calendar,
  Camera,
  Edit2,
  Mail,
  Save,
  X,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useUpdateProfile } from "../../../../hooks/auth";
import { useUploadImage } from "../../../../hooks/image";
import { useUpdateUser } from "../../../../hooks/user";
import { useAuth } from "../../../../providers/AuthProvider";
import { profileUpdateSchema } from "../../../../schemas/profile.schema";
import { formatDate } from "../../../../utils/auth.utils";
import ProfileHeaderSkeleton from "./ProfileHeaderSkeleton";

function ProfileHeader() {
  const [isEditing, setIsEditing] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);

  const { dbUser, setIsLoadUser } = useAuth();
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      displayName: "",
      photoFile: null,
    },
  });

  useEffect(() => {
    if (dbUser) {
      reset({
        displayName: dbUser.displayName || "",
        photoFile: null,
      });
    }
  }, [dbUser, reset]);

  const { mutateAsync: uploadImage } = useUploadImage();
  const { mutateAsync: updateUser } = useUpdateUser(dbUser?._id);
  const { mutateAsync: updateProfile, isPending } = useUpdateProfile();

  const onSubmit = async (data) => {
    try {
      setIsLoadUser(false);

      let photoURL = null;
      let cloudinary_public_id = null;

      //Upload photo to cloudinary if exists
      if (data.photoFile) {
        const formData = new FormData();
        formData.append("image", data.photoFile);

        const res = await uploadImage({ body: formData });
        photoURL = res.url;
        cloudinary_public_id = res.public_id;
      }

      const updateData = {};

      if (data.displayName?.trim()) {
        updateData.displayName = data.displayName;
      }
      if (photoURL) {
        updateData.photoURL = photoURL;
      }

      await updateProfile(updateData);

      //Update user into backend DB
      const body = {};

      if (data.displayName?.trim()) {
        body.displayName = data.displayName;
      }
      if (photoURL) {
        body.photoURL = photoURL;
        body.cloudinary_public_id = cloudinary_public_id;
      }

      await updateUser({ body });

      // load backend user data
      setIsLoadUser(true);

      setIsEditing(false);
      setPhotoPreview(null);

      toast.success("User updated Successfully! 🎉");
    } catch (error) {
      toast.error(error?.message || "Update user Failed");
      // load backend user data
      setIsLoadUser(true);
    }
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
    setPhotoPreview(null);
  };

  const handlePhotoPreview = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("photoFile", file, { shouldValidate: true });
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  if (!dbUser) return <ProfileHeaderSkeleton />;
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-linear-to-r from-primary to-secondary rounded-2xl shadow-2xl p-8 mb-8 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-24 -translate-x-24"></div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
        {/* Profile Picture */}
        <div className="relative">
          <div className="avatar">
            <div className="w-32 h-32 rounded-full ring-4 ring-white ring-offset-4 ring-offset-primary">
              <img
                src={photoPreview || dbUser?.photoURL}
                alt={dbUser?.displayName}
              />
            </div>
          </div>
          {isEditing && (
            <label className="absolute bottom-0 right-0 btn btn-circle btn-sm bg-white text-primary border-0 shadow-lg hover:bg-white hover:scale-110 transition-transform cursor-pointer">
              <Camera className="w-4 h-4" />
              <input
                type="file"
                accept="image/*"
                {...register("photoFile")}
                onChange={handlePhotoPreview}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* User Info */}
        <div className="flex-1 text-center md:text-left">
          {isEditing ? (
            <>
              <input
                type="text"
                {...register("displayName")}
                className="input input-lg bg-white text-base-content font-bold font-popins rounded-2xl mb-2 w-full max-w-md"
              />
              {errors.displayName && (
                <span className="text-xs text-error flex items-center gap-1 mt-1">
                  <XCircle className="w-3 h-3" />
                  {errors?.displayName?.message}
                </span>
              )}
            </>
          ) : (
            <h1 className="text-4xl font-bold font-popins text-white mb-2">
              {dbUser?.displayName}
            </h1>
          )}
          <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-4">
            <div className="badge badge-lg bg-white text-primary border-0 gap-2">
              <Mail className="w-4 h-4" />
              {dbUser?.email}
            </div>
            <div className="badge badge-lg bg-white/20 text-white border-0 gap-2 backdrop-blur-sm">
              <Calendar className="w-4 h-4" />
              Joined {formatDate(dbUser?.createdAt)}
            </div>
            <div className="badge badge-lg bg-white/20 text-white border-0 gap-2 backdrop-blur-sm">
              <Award className="w-4 h-4" />
              {dbUser?.role}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-center md:justify-start">
            {isEditing ? (
              <>
                <button
                  type="submit"
                  disabled={isPending}
                  className="btn btn-success rounded-full gap-2 text-white"
                >
                  <Save className="w-4 h-4" />
                  {isPending ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn btn-ghost rounded-full gap-2 text-white hover:bg-white/20"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="btn bg-white text-primary border-0 rounded-full gap-2 hover:bg-white/90 shadow-lg"
              >
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

export default ProfileHeader;
