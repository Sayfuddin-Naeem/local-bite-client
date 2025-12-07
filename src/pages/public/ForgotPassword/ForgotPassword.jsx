import toast from "react-hot-toast";
import { Link } from "react-router";
import { useForgotPassword } from "../../../hooks/auth/useForgotPassword";
import ForgotPasswordForm from "./ForgotPasswordForm";

export default function ForgotPassword() {
  const { mutateAsync: resetPassword, isPending } = useForgotPassword();

  const onSubmit = async ({ email }) => {
    try {
      await resetPassword({ email });
      toast.success("Password reset email sent! 📩");
    } catch (err) {
      toast.error(err?.message || "Failed to send reset email");
    }
  };

  return (
    <div className="min-h-screen bg-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-primary rounded-2xl mb-4 shadow-lg">
            <span className="text-4xl">🍊</span>
          </div>
          <h1 className="text-3xl font-bold text-base-content">
            Reset Your Password
          </h1>
          <p className="text-neutral mt-1">
            Enter your email to receive reset instructions
          </p>
        </div>

        <div className="bg-base-100 rounded-2xl shadow-2xl p-8 border-2 border-base-300">
          <ForgotPasswordForm onSubmit={onSubmit} loading={isPending} />

          <p className="text-center mt-6 text-sm text-neutral font-inter">
            Remember your password?
            <Link
              to="/signin"
              className="text-primary font-semibold hover:underline ml-1"
            >
              Sign In
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
