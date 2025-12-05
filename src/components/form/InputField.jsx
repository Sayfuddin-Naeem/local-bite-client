import { XCircle } from "lucide-react";

const InputField = ({ label, icon: Icon, error, register, name, type = "text", placeholder }) => (
  <div>
    <label className="block mb-2 text-sm font-medium">
      {Icon && <Icon className="inline w-4 h-4 mr-2 text-primary" />}
      {label}
    </label>

    <input
      type={type}
      placeholder={placeholder}
      {...register(name)}
      className={`input input-bordered w-full rounded-2xl ${error ? "input-error" : ""}`}
    />

    {error && (
      <span className="text-xs text-error flex items-center gap-1 mt-1">
        <XCircle className="w-3 h-3" />
        {error.message}
      </span>
    )}
  </div>
);

export default InputField;
