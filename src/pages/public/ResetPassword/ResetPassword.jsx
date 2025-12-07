import toast from "react-hot-toast";
import { Link, useNavigate, useSearchParams } from "react-router";
import { useConfirmPasswordReset } from "../../../hooks/auth/useConfirmPasswordReset";
import ResetPasswordForm from "./ResetPasswordForm";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const oobCode = params.get("oobCode");
  const mode = params.get("mode");

  const { mutateAsync: resetPassword, isPending } = useConfirmPasswordReset();

  const onSubmit = async (data, reset) => {
    const { newPassword } = data;

    try {
      await resetPassword({ oobCode, newPassword });

      toast.success("Password reset successfully 🎉");
      reset();
      navigate("/signin");
    } catch (err) {
      toast.error(err?.message || "Failed to reset password");
    }
  };

  if (!oobCode || mode !== "resetPassword") {
    return (
      <div className="text-center p-8">
        <p className="text-xl font-bold">Invalid or expired link</p>
        <Link to="/forgot-password" className="btn mt-4 btn-primary">
          Try Again
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-primary rounded-2xl mb-4 shadow-lg">
            <span className="text-4xl">🍊</span>
          </div>
          <h1 className="text-3xl font-bold text-base-content">
            Choose a New Password
          </h1>
          <p className="text-neutral">Strong passwords keep you safe 🔒</p>
        </div>

        <div className="bg-base-100 rounded-2xl shadow-2xl p-8 border-2 border-base-300">
          <ResetPasswordForm onSubmit={onSubmit} loading={isPending} />
        </div>
      </div>
    </div>
  );
}
