const PasswordStrengthMeter = ({ strength, text, color }) => (
  <div className="mt-2 space-y-1">
    <progress
      className={`progress ${color} w-full transition-all duration-200`}
      value={strength}
      max="100"
    ></progress>
    {text && (
      <span className="text-xs font-semibold capitalize">
        {text}
      </span>
    )}
  </div>
);

export default PasswordStrengthMeter;
