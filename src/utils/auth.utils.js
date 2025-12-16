export default function getPasswordStrength(pass) {
  if (!pass) return { strength: 0, text: "", color: "" };

  let strength = 0;

  // Length levels
  if (pass.length >= 8) strength++;
  if (pass.length >= 10) strength++;

  // Character type checks
  if (/[A-Z]/.test(pass)) strength++;
  if (/[a-z]/.test(pass)) strength++;
  if (/[0-9]/.test(pass)) strength++;
  if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pass)) strength++;

  // Strength scale (0 - 8)
  if (strength <= 2) return { strength: 25, text: "Weak", color: "bg-error" };
  if (strength <= 4) return { strength: 50, text: "Fair", color: "bg-warning" };
  if (strength === 5)
    return { strength: 75, text: "Good", color: "bg-warning" };

  return { strength: 100, text: "Strong", color: "bg-success" };
}

export const formatDate = (dateString, month = "short") => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: month,
    day: "numeric",
    year: "numeric",
  });
};

export const formatCommentDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return formatDate(date);
  };
