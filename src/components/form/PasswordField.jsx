import { Eye, EyeOff, Lock, XCircle } from "lucide-react";

const PasswordField = ({ label, register, name, show, setShow, error }) => (
  <div>
    <label className="block mb-2 text-sm font-medium">
      <Lock className="inline w-4 h-4 mr-2 text-primary" /> {label}
    </label>

    <div className="relative">
      <input
        type={show ? "text" : "password"}
        placeholder="••••••••"
        {...register(name)}
        className={`input input-bordered w-full rounded-2xl pr-12 ${error ? "input-error" : ""}`}
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute z-3 right-4 top-1/2 -translate-y-1/2"
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>

    {error && (
      <span className="text-xs text-error flex items-center gap-1 mt-1">
        <XCircle className="w-3 h-3" />
        {error.message}
      </span>
    )}
  </div>
);

export default PasswordField;
