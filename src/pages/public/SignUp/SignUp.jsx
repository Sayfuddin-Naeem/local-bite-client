import toast from "react-hot-toast";
import { Link } from "react-router";
import GoogleSignInButton from "../../../components/auth/GoogleSignInButton";
import {
  useGoogleSignIn,
  useSignUp,
  useUpdateProfile,
} from "../../../hooks/auth";
import { useUploadImage } from "../../../hooks/image/useUploadImage";
import { useCreateUser } from "../../../hooks/user/useCreateUser";
import { useAuth } from "../../../providers/AuthProvider";
import SignUpForm from "./SignUpForm";

const SignUp = () => {
  const { setIsLoadUser } = useAuth();

  const { mutateAsync: signUp, isPending } = useSignUp();
  const { mutateAsync: uploadImage } = useUploadImage();
  const { mutateAsync: updateProfile } = useUpdateProfile();
  const { mutateAsync: createUser } = useCreateUser();
  const { mutateAsync: googleSignIn, isPending: isPendingGoogle } =
    useGoogleSignIn();

  const onSubmit = async (data, reset) => {
    setIsLoadUser(false);
    try {
      //Create firebase user
      const user = await signUp({
        email: data.email,
        password: data.password,
      });

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

      //Update firebase profile
      await updateProfile({
        displayName: data.displayName,
        photoURL,
      });

      //Save user into backend DB
      await createUser({
        body: {
          firebaseUid: user.uid,
          email: user.email,
          displayName: data.displayName,
          photoURL,
          cloudinary_public_id,
          role: "user",
        },
      });
      toast.success("Account Created Successfully! 🎉");
      reset();

      setIsLoadUser(true);

    } catch (err) {
      toast.error(err?.message || "Signup Failed");
      // setIsLoadUser(true);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoadUser(false);

      const fbUser = await googleSignIn();

      try {
        await createUser({
          body: {
            firebaseUid: fbUser.uid,
            email: fbUser.email,
            displayName: fbUser.displayName,
            photoURL: fbUser.photoURL,
            cloudinary_public_id: null,
            role: "user",
          },
        });
      } catch {
        console.log("Skipping createUser — user already exists");
      }

      toast.success("Google Sign-in Successful!");

      setIsLoadUser(true);
    } catch (err) {
      toast.error(err?.message || "Google sign-in failed");
      // setIsLoadUser(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo & Title */}{" "}
        <div className="text-center mb-8">
          {" "}
          <div className="inline-block p-4 bg-primary rounded-2xl mb-4 shadow-lg">
            {" "}
            <span className="text-4xl">🍊</span>{" "}
          </div>{" "}
          <h1 className="text-4xl font-bold font-popins text-base-content mb-2">
            {" "}
            Join Local Bite{" "}
          </h1>{" "}
          <p className="text-neutral font-inter">
            {" "}
            Start your food adventure today{" "}
          </p>{" "}
        </div>
        <div className="bg-base-100 rounded-2xl shadow-2xl p-8 border-2 border-base-300">
          <GoogleSignInButton
            onClick={handleGoogleSignIn}
            loading={isPendingGoogle}
          />
          <div className="divider my-6">OR CONTINUE WITH EMAIL</div>
          <SignUpForm loading={isPending} onSubmit={onSubmit} />{" "}
          <p
            className="text-center mt-6 text-sm text-[oklch(35%_0.02_60)]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {" "}
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-[oklch(75%_0.18_45)] font-semibold hover:underline"
            >
              {" "}
              Sign In{" "}
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
