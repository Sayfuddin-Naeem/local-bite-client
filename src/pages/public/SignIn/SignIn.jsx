import toast from "react-hot-toast";
import { Link } from "react-router";
import GoogleSignInButton from "../../../components/auth/GoogleSignInButton";
import { useGoogleSignIn } from "../../../hooks/auth";
import { useSignIn } from "../../../hooks/auth/useSignIn";
import { useCreateUser } from "../../../hooks/user";
import { useAuth } from "../../../providers/AuthProvider";
import SignInForm from "./SignInForm";

export default function SignIn() {
  const { setIsLoadUser } = useAuth();
  const { mutateAsync: signIn, isPending } = useSignIn();
  const { mutateAsync: createUser } = useCreateUser();
  const { mutateAsync: googleSignIn, isPending: isPendingGoogle } =
    useGoogleSignIn();

  const onSubmit = async (data, reset) => {
    setIsLoadUser(false);
    try {
      await signIn(data);

      setIsLoadUser(true);

      toast.success("Logged in Successfully! 🎉");
      reset();
    } catch (err) {
      toast.error(err?.message || "Login failed");
      // setIsLoadUser(true);
    }
  };

  // Google Login
  const handleGoogleSignIn = async () => {
    setIsLoadUser(false);
    try {
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
        console.log("User already exists");
      }

      setIsLoadUser(true);

      toast.success("Google Sign-in Successful!");
    } catch (err) {
      toast.error(err?.message || "Google sign-in failed");
      // setIsLoadUser(true);
    }
  };

  return (
    <>
      <title>Sign In - Local Bite</title>
      <div className="min-h-screen bg-gradient flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-primary rounded-2xl mb-4 shadow-lg">
              <span className="text-4xl">🍊</span>
            </div>
            <h1 className="text-4xl font-bold font-popins text-base-content mb-2">
              Welcome Back 👋
            </h1>
            <p className="text-neutral font-inter">
              Continue your food journey
            </p>
          </div>

          <div className="bg-base-100 rounded-2xl shadow-2xl p-8 border-2 border-base-300">
            <GoogleSignInButton
              onClick={handleGoogleSignIn}
              loading={isPendingGoogle}
            />

            <div className="divider my-6">OR CONTINUE WITH EMAIL</div>

            <SignInForm loading={isPending} onSubmit={onSubmit} />

            <p className="text-center mt-6 text-sm text-[oklch(35%_0.02_60)] font-inter">
              New to Local Bite?
              <Link
                to="/signup"
                className="text-[oklch(75%_0.18_45)] font-semibold hover:underline ml-1"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
