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

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
