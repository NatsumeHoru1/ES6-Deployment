"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewSchema, ReviewInput } from "@/lib/reviewSchema";
import { useReviews } from "@/contexts/ReviewsContext";

interface ReviewFormProps {
  productId: number;
}

export function ReviewForm({ productId }: ReviewFormProps) {
  const { submitReview } = useReviews();
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReviewInput>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      product_id: productId,
      rating: "" as unknown as number,
      comment: "",
    },
  });

  const onSubmit = async (data: ReviewInput) => {
    setServerError(null);
    setSuccessMessage(null);
    try {
      await submitReview(data.rating, data.comment);
      setSuccessMessage("Review submitted successfully!");
      reset({
        product_id: productId,
        rating: "" as unknown as number,
        comment: "",
      });
    } catch (err: any) {
      setServerError(err.message || "An error occurred");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm mb-8">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Write a Review</h3>

      <form data-testid="review-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input type="hidden" {...register("product_id", { valueAsNumber: true })} value={productId} />

        <div>
          <label htmlFor="input-rating" className="block text-sm font-semibold text-gray-700 mb-1">
            Rating
          </label>
          <select
            id="input-rating"
            data-testid="input-rating"
            {...register("rating", { valueAsNumber: true })}
            className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-green-500 focus:border-green-500"
          >
            <option value="">Select a rating (1-5)</option>
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Very Good</option>
            <option value="3">3 - Good</option>
            <option value="2">2 - Fair</option>
            <option value="1">1 - Poor</option>
          </select>
          {errors.rating && (
            <p data-testid="error-rating" className="text-red-500 text-sm mt-1">
              {errors.rating.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="input-comment" className="block text-sm font-semibold text-gray-700 mb-1">
            Comment
          </label>
          <textarea
            id="input-comment"
            data-testid="input-comment"
            rows={4}
            {...register("comment")}
            placeholder="Share your experience with this product..."
            className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-green-500 focus:border-green-500"
          />
          {errors.comment && (
            <p data-testid="error-comment" className="text-red-500 text-sm mt-1">
              {errors.comment.message}
            </p>
          )}
        </div>

        {serverError && (
          <p data-testid="error-review" className="text-red-500 text-sm font-medium">
            {serverError}
          </p>
        )}

        {successMessage && (
          <p data-testid="review-success" className="text-green-600 text-sm font-medium">
            {successMessage}
          </p>
        )}

        <button
          type="submit"
          data-testid="btn-submit-review"
          disabled={isSubmitting}
          className="px-5 py-2.5 font-bold text-gray-900 rounded-lg transition-all duration-200 shadow-sm disabled:opacity-50"
          style={{ backgroundColor: "#b5e48c" }}
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}
