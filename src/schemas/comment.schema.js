import { z } from "zod";

export const commentSchema = z.object({
  text: z
    .string()
    .min(5, "Comment must be at least 5 characters")
    .max(300, "Comment must be less than 300 characters"),
});
