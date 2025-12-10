import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../components/form/InputField";
import PasswordField from "../../../components/form/PasswordField";
import { signInSchema } from "../../../schemas/auth.schema";
import { Link } from "react-router";

export default function SignInForm({ onSubmit, loading }) {
  const [showPass, setShowPass] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signInSchema) });

  const submitHandler = (data) => onSubmit(data, reset);
  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
      <InputField
        label="Email"
        icon={Mail}
        type="email"
        name="email"
        placeholder="you@example.com"
        register={register}
        error={errors.email}
      />

      <PasswordField
        label="Password"
        name="password"
        register={register}
        error={errors.password}
        show={showPass}
        setShow={setShowPass}
      />

      <div className="flex justify-end">
        <Link
          to="/forgot-password"
          className="text-sm text-neutral hover:underline"
        >
          Forgot Password?
        </Link>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="btn w-full bg-primary text-white rounded-xl"
      >
        {loading ? (
          <>
            <span className="loading loading-spinner"></span>
            Signing In...
          </>
        ) : (
          <>
            <LogIn className="w-5 h-5" /> Sign In
          </>
        )}
      </button>
    </form>
  );
}
