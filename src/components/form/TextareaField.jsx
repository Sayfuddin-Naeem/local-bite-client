import { XCircle } from "lucide-react";
import Label from "./Label";

function TextareaField({
  icon,
  iconColor,
  label,
  name,
  placeholder,
  register,
  error,
  textLength,
}) {
  const maxLength = name === "text" ? "600" : "400";
  const hide = name === "text" ? "h-40" : "h-28";

  return (
    <div>
      {" "}
      <Label icon={icon} iconColor={iconColor} label={label} />
      <textarea
        {...register(name)}
        placeholder={placeholder}
        className={`textarea textarea-bordered w-full rounded-2xl resize-none ${hide} focus:outline-primary/30 focus:outline-2 ${
          error ? "textarea-error" : ""
        }`}
        maxLength={maxLength}
      />
      <div className="flex justify-between items-center mt-1">
        <span className="text-xs text-[oklch(35%_0.02_60)]">
          {textLength}/{maxLength} characters
        </span>
        {error && (
          <span className="text-xs text-error flex items-center gap-1 mt-1">
            <XCircle className="w-3 h-3" />
            {error.message}
          </span>
        )}
      </div>
    </div>
  );
}

export default TextareaField;
