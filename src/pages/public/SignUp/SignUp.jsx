// components/auth/SignUp/SignUpForm.jsx
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, Mail, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import GoogleSignInButton from "../../../components/auth/GoogleSignInButton";
import PasswordStrengthMeter from "../../../components/auth/PasswordStrengthMeter";
import InputField from "../../../components/form/InputField";
import PasswordField from "../../../components/form/PasswordField";
import PhotoUploader from "../../../components/form/PhotoUploader";
import { signUpSchema } from "../../../schemas/auth.schema";

const SignUpForm = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signUpSchema) });

  const password = watch("password");

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("photoFile", file, { shouldValidate: true });
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    console.log("Submitting:", data);
    setTimeout(() => setLoading(false), 1500);
  };

  const passwordStrength = getPasswordStrength(password);

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
          <GoogleSignInButton onClick={() => console.log("Google")} />

          <div className="divider my-6">OR CONTINUE WITH EMAIL</div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                Creating Account
                </>
                
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" /> Create Account
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

function getPasswordStrength(pass) {
  if (!pass) return { strength: 0, text: "", color: "" };

  let strength = 0;

  // Length levels
  if (pass.length >= 8) strength++;
  if (pass.length >= 12) strength++;

  // Character type checks
  if (/[A-Z]/.test(pass)) strength++;
  if (/[a-z]/.test(pass)) strength++;
  if (/[0-9]/.test(pass)) strength++;
  if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pass)) strength++;

  // Strength scale (0 - 6)
  if (strength <= 2) return { strength: 25, text: "Weak", color: "bg-error" };
  if (strength <= 4) return { strength: 50, text: "Fair", color: "bg-warning" };
  if (strength === 5)
    return { strength: 75, text: "Good", color: "bg-warning" };

  return { strength: 100, text: "Strong", color: "bg-success" };
}

export default SignUpForm;
