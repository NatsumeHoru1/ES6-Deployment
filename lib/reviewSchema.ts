import { z } from "zod";

export const reviewSchema = z.object({
  product_id: z.number().int().positive("Product ID must be a positive integer"),
  rating: z
    .number({
      message: "Rating is required and must be an integer between 1 and 5",
    })
    .int("Rating must be an integer")
    .min(1, "Rating must be between 1 and 5")
    .max(5, "Rating must be between 1 and 5"),
  comment: z
    .string({
      message: "Comment is required",
    })
    .trim()
    .min(1, "Comment must be between 1 and 500 characters")
    .max(500, "Comment cannot exceed 500 characters"),
});

export type ReviewInput = z.infer<typeof reviewSchema>;
