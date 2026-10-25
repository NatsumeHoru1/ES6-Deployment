import { supabase } from "@/lib/supabaseClient";

export interface Review {
  id: number;
  user_id: string;
  product_id: number;
  rating: number;
  comment: string;
  author: string;
  created_at: string;
}

export interface ProductReviewsData {
  average: number;
  count: number;
  reviews: Review[];
}

export async function getProductReviews(productId: number): Promise<ProductReviewsData> {
  try {
    const { data, error } = await supabase
      .from("reviews")
      .select("id, user_id, product_id, rating, comment, author, created_at")
      .eq("product_id", productId)
      .order("created_at", { ascending: false });

    if (error || !data) {
      return {
        average: 0,
        count: 0,
        reviews: [],
      };
    }

    const reviews = data as Review[];
    const count = reviews.length;
    let average = 0;
    if (count > 0) {
      const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
      average = Math.round((sum / count) * 10) / 10;
    }

    return {
      average,
      count,
      reviews,
    };
  } catch {
    return {
      average: 0,
      count: 0,
      reviews: [],
    };
  }
}
