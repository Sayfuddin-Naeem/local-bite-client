import { z } from "zod";

export const profileUpdateSchema = z.object({
  displayName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .optional()
    .or(z.literal("")),

  photoFile: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= 5000000,
      "Image must be less than 5MB"
    )
    .refine(
      (file) =>
        !file ||
        ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Only .jpg, .png, .webp formats are allowed"
    ),
})
.refine(
  (data) => {
    return data.displayName?.trim() || data.photoFile;
  },
  {
    message: "At least one field is required",
    path: ["displayName"],
  }
);
