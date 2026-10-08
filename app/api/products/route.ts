import { NextResponse } from "next/server";
import { products } from "@/lib/products";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.toLowerCase();
  const category = searchParams.get("category")?.toLowerCase();

  let filteredProducts = products;

  if (q) {
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  if (category && category !== "all") {
    filteredProducts = filteredProducts.filter(
      (p) => p.category.toLowerCase() === category
    );
  }

  return NextResponse.json(filteredProducts);
}
