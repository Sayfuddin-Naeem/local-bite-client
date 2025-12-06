import { LogIn, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import InputField from "../../../components/form/InputField";
import PasswordField from "../../../components/form/PasswordField";
import { useState } from "react";
import { signInSchema } from "../../../schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";

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
