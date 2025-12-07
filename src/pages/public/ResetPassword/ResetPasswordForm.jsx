import { CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import PasswordField from "../../../components/form/PasswordField";
import { useState } from "react";
import getPasswordStrength from "../../../utils/auth.utils";
import PasswordStrengthMeter from "../../../components/auth/PasswordStrengthMeter";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "../../../schemas/auth.schema";

export default function ResetPasswordForm({ onSubmit, loading }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(resetPasswordSchema)});

  const newPass = watch("newPassword");
  const passwordStrength = getPasswordStrength(newPass);

  const submitHandler = (data) => onSubmit(data, reset);
  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
      <PasswordField
        label="New Password"
        name="newPassword"
        register={register}
        error={errors.newPassword}
        show={showPassword}
        setShow={setShowPassword}
      />
      {newPass && <PasswordStrengthMeter {...passwordStrength} />}

      <PasswordField
        label="Confirm Password"
        name="confirmPassword"
        register={register}
        error={errors.confirmPassword}
        show={showConfirmPassword}
        setShow={setShowConfirmPassword}
      />

      <button
        type="submit"
        disabled={loading}
        className="btn w-full bg-primary text-white rounded-xl"
      >
        {loading ? (
          <>
            <span className="loading loading-spinner"></span>
            Resetting...
          </>
        ) : (
          <>
            <CheckCircle className="w-5 h-5" /> Update Password
          </>
        )}
      </button>
    </form>
  );
}
