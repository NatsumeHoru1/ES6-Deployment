"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useReviews } from "@/contexts/ReviewsContext";
import { useAuth } from "@/contexts/AuthContext";
import { ReviewForm } from "@/components/ReviewForm";
import { Review } from "@/lib/reviews";

interface ReviewsSectionProps {
  productId: number;
}

export function ReviewsSection({ productId }: ReviewsSectionProps) {
  const { reviews, myReview, updateReview, deleteReview } = useReviews();
  const { user, loading } = useAuth();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editRating, setEditRating] = useState<number>(5);
  const [editComment, setEditComment] = useState<string>("");
  const [editError, setEditError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const count = reviews.length;
  const average =
    count > 0
      ? Math.round((reviews.reduce((acc, r) => acc + r.rating, 0) / count) * 10) / 10
      : 0;

  const handleStartEdit = (review: Review) => {
    setEditingId(review.id);
    setEditRating(review.rating);
    setEditComment(review.comment);
    setEditError(null);
  };

  const handleSaveEdit = async () => {
    if (!editComment.trim() || editComment.length > 500) {
      setEditError("Comment must be between 1 and 500 characters");
      return;
    }
    if (editRating < 1 || editRating > 5) {
      setEditError("Rating must be between 1 and 5");
      return;
    }

    setIsUpdating(true);
    setEditError(null);
    try {
      await updateReview(editRating, editComment.trim());
      setEditingId(null);
    } catch (err: any) {
      setEditError(err.message || "Failed to update review");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (review: Review) => {
    setDeleteError(null);
    try {
      await deleteReview(review.id);
    } catch (err: any) {
      setDeleteError(err.message || "Failed to delete review");
    }
  };

  return (
    <div className="mt-12 border-t pt-8">
      {/* Header & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1.5">
              <span className="text-yellow-400 text-xl font-bold">★</span>
              <span data-testid="rating-average" className="text-2xl font-extrabold text-gray-900">
                {average}
              </span>
              <span className="text-gray-500 text-sm font-medium">/ 5</span>
            </div>
            <span className="text-gray-300">•</span>
            <div className="text-gray-600 text-sm">
              <span data-testid="review-count" className="font-bold text-gray-900">
                {count}
              </span>{" "}
              {count === 1 ? "review" : "reviews"}
            </div>
          </div>
        </div>
      </div>

      {deleteError && (
        <div className="p-3 mb-6 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
          {deleteError}
        </div>
      )}

      {/* Review Form or Login Prompt */}
      {!loading && (
        <>
          {!user ? (
            <div className="bg-gray-50 p-6 rounded-xl border text-center mb-8">
              <p className="text-gray-700 mb-3 font-medium">Want to share your thoughts?</p>
              <Link
                href="/login"
                data-testid="link-login-to-review"
                className="inline-block px-5 py-2.5 font-bold text-gray-900 rounded-lg transition-all shadow-sm hover:opacity-90"
                style={{ backgroundColor: "#b5e48c" }}
              >
                Log in to write a review
              </Link>
            </div>
          ) : (
            !myReview && <ReviewForm productId={productId} />
          )}
        </>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div
            data-testid="reviews-empty"
            className="py-12 text-center text-gray-500 bg-gray-50 rounded-xl border border-dashed"
          >
            No reviews yet. Be the first to review this product!
          </div>
        ) : (
          reviews.map((review) => {
            const isOwnReview = !!user && user.id === review.user_id;
            const isBeingEdited = editingId === review.id;

            return (
              <div
                key={review.id}
                data-testid="review-item"
                className="bg-white p-6 rounded-xl border shadow-sm transition-all"
              >
                <div className="flex justify-between items-start gap-4 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-green-100 text-green-800 flex items-center justify-center font-bold text-sm uppercase">
                      {review.author ? review.author.charAt(0) : "U"}
                    </div>
                    <div>
                      <h4 data-testid="review-author" className="font-bold text-gray-900">
                        {review.author}
                      </h4>
                      <p className="text-xs text-gray-400">
                        {new Date(review.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 bg-yellow-50 px-2.5 py-1 rounded-full border border-yellow-200">
                    <span className="text-yellow-500 font-bold text-xs">★</span>
                    <span data-testid="review-rating" className="text-sm font-bold text-gray-900">
                      {review.rating}
                    </span>
                  </div>
                </div>

                <p data-testid="review-comment" className="text-gray-700 leading-relaxed mt-2 text-base">
                  {review.comment}
                </p>

                {/* Own Review Actions */}
                {isOwnReview && (
                  <div className="mt-4 pt-4 border-t flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      data-testid="btn-edit-review"
                      onClick={() =>
                        isBeingEdited ? setEditingId(null) : handleStartEdit(review)
                      }
                      className="text-xs font-semibold px-3 py-1.5 rounded bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors"
                    >
                      {isBeingEdited ? "Cancel Edit" : "Edit"}
                    </button>
                    <button
                      type="button"
                      data-testid="btn-delete-review"
                      onClick={() => handleDelete(review)}
                      className="text-xs font-semibold px-3 py-1.5 rounded bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                )}

                {/* Expanded Inline Edit Form */}
                {isOwnReview && isBeingEdited && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border space-y-3">
                    <h5 className="font-bold text-sm text-gray-800">Edit Your Review</h5>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Rating (1-5)
                      </label>
                      <select
                        value={editRating}
                        onChange={(e) => setEditRating(Number(e.target.value))}
                        className="w-full p-2 bg-white border rounded text-sm text-gray-900"
                      >
                        <option value="5">5 - Excellent</option>
                        <option value="4">4 - Very Good</option>
                        <option value="3">3 - Good</option>
                        <option value="2">2 - Fair</option>
                        <option value="1">1 - Poor</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Comment
                      </label>
                      <textarea
                        rows={3}
                        value={editComment}
                        onChange={(e) => setEditComment(e.target.value)}
                        className="w-full p-2 bg-white border rounded text-sm text-gray-900"
                      />
                    </div>

                    {editError && <p className="text-red-500 text-xs">{editError}</p>}

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleSaveEdit}
                        disabled={isUpdating}
                        className="px-4 py-1.5 text-xs font-bold text-gray-900 rounded shadow-sm disabled:opacity-50"
                        style={{ backgroundColor: "#b5e48c" }}
                      >
                        {isUpdating ? "Saving..." : "Save Changes"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="px-4 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-200 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
