import { XCircle } from "lucide-react";
import Label from "./Label";

const InputField = ({
  label,
  icon,
  iconColor,
  error,
  register,
  name,
  type = "text",
  placeholder,
}) => (
  <div>
    <Label icon={icon} iconColor={iconColor} label={label} />

    <input
      type={type}
      placeholder={placeholder}
      {...register(name)}
      className={`input input-bordered w-full rounded-[1.25rem] focus:outline-primary/30 focus:outline-2 ${
        error ? "input-error" : ""
      }`}
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
