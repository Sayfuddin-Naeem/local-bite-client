import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signUpSchema } from "../../../schemas/auth.schema";
import { CheckCircle, Mail, User } from "lucide-react";
import { useState } from "react";
import PasswordStrengthMeter from "../../../components/auth/PasswordStrengthMeter";
import InputField from "../../../components/form/InputField";
import PasswordField from "../../../components/form/PasswordField";
import PhotoUploader from "../../../components/form/PhotoUploader";
import getPasswordStrength from "../../../utils/auth.utils";

function SignUpForm({onSubmit, loading}) {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [preview, setPreview] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signUpSchema) });

  const password = watch("password");

  const passwordStrength = getPasswordStrength(password);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("photoFile", file, { shouldValidate: true });
      setPreview(URL.createObjectURL(file));
    }
  };

  const submitHandler = (data) => onSubmit(data, reset);
  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
      <InputField
        label="Full Name"
        type="text"
        icon={User}
        name="displayName"
        placeholder={"John Doe"}
        register={register}
        error={errors.displayName}
      />

      <InputField
        label="Email"
        icon={Mail}
        type="email"
        name="email"
        placeholder="you@example.com"
        register={register}
        error={errors.email}
      />

      <PhotoUploader
        register={register}
        preview={preview}
        label={"Profile Photo"}
        onChangeEvent={handlePhotoChange}
        error={errors.photoFile}
      />

      <PasswordField
        label="Password"
        name="password"
        register={register}
        error={errors.password}
        show={showPass}
        setShow={setShowPass}
      />
      {password && <PasswordStrengthMeter {...passwordStrength} />}

      <PasswordField
        label="Confirm Password"
        name="confirmPassword"
        register={register}
        error={errors.confirmPassword}
        show={showConfirmPass}
        setShow={setShowConfirmPass}
      />

      <button
        type="submit"
        disabled={loading}
        className="btn w-full bg-primary text-white rounded-xl"
      >
        {loading ? (
          <>
            <span className="loading loading-spinner"></span>
            Creating Account...
          </>
        ) : (
          <>
            <CheckCircle className="w-5 h-5" /> Create Account
          </>
        )}
      </button>
    </form>
  );
}

export default SignUpForm;
