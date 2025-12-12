function Label({ icon: Icon, iconColor = "text-primary", label }) {
  return (
    <label className="block mb-2">
      <span className="text-sm font-semibold font-inter flex items-center gap-2 text-base-content">
        {Icon && <Icon className={`inline w-5 h-5 mr-2 ${iconColor}`} />}
        {label}
      </span>
    </label>
  );
}

export default Label;
