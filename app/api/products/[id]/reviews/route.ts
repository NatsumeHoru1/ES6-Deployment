import { NextResponse } from "next/server";
import { products } from "@/lib/products";
import { getProductReviews } from "@/lib/reviews";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const product = products.find((p) => p.id.toString() === id);

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const reviewsData = await getProductReviews(product.id);
  return NextResponse.json(reviewsData, { status: 200 });
}
