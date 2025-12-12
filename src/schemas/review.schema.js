import { z } from 'zod';

export const reviewSchema = z.object({
  food: z.string()
    .min(2, "Food name must be at least 2 characters")
    .max(100, "Food name too long"),
  foodDescription: z.string()
    .min(10, "Description must be at least 10 characters")
    .max(400, "Description must be less than 400 characters"),
  category: z.enum([
    "Street Food",
    "Homemade",
    "Traditional",
    "Snacks",
    "Fast Food",
    "Dessert",
    "Drinks",
    "Others"
  ]),
  restaurantName: z.string()
    .min(2, "Restaurant name required")
    .max(100, "Restaurant name too long"),
  restaurantLocation: z.string()
    .min(3, "Location required")
    .max(200, "Location too long"),
  rating: z.number()
    .min(1, "Please select a rating")
    .max(5, "Rating cannot exceed 5"),
  text: z.string()
    .min(20, "Review must be at least 20 characters")
    .max(600, "Review must be less than 600 characters"),
  image: z.instanceof(File, { message: "Food image is required" })
    .refine((file) => file.size <= 5000000, "Image must be less than 5MB")
    .refine(
      (file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
      "Only .jpg, .png, .webp formats are allowed"
    )
});

// For edit mode, make image optional
export const editReviewSchema = reviewSchema.extend({
  image: z.instanceof(File).optional()
    .refine((file) => !file || file.size <= 5000000, "Image must be less than 5MB")
    .refine(
      (file) => !file || ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
      "Only .jpg, .png, .webp formats are allowed"
    )
});