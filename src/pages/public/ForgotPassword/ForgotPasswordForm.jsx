import { useForm } from "react-hook-form";
import { Mail, Send } from "lucide-react";
import InputField from "../../../components/form/InputField";

export default function ForgotPasswordForm({ onSubmit, loading }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

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

      <button
        type="submit"
        disabled={loading}
        className="btn w-full bg-primary text-white rounded-xl"
      >
        {loading ? (
          <>
            <span className="loading loading-spinner"></span>
            Sending Reset Email...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" /> Send Reset Link
          </>
        )}
      </button>
    </form>
  );
}
