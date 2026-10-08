import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

import { Header } from "@/components/Header";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const q = (resolvedSearchParams.q as string)?.toLowerCase();
  const category = (resolvedSearchParams.category as string)?.toLowerCase();

  let filteredProducts = products;

  if (q) {
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  if (category && category !== "") {
    filteredProducts = filteredProducts.filter(
      (p) => p.category.toLowerCase() === category
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 p-6 lg:px-8 max-w-7xl mx-auto w-full">
        <h2 className="text-2xl font-bold mb-6">Our Products</h2>
        
        <form method="get" action="/" className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            name="q"
            defaultValue={resolvedSearchParams.q as string}
            data-testid="search-input"
            placeholder="Search products..."
            className="border rounded-md px-3 py-2 flex-grow"
          />
          <select
            name="category"
            defaultValue={resolvedSearchParams.category as string}
            data-testid="category-select"
            className="border rounded-md px-3 py-2 bg-white"
          >
            <option value="">All</option>
            <option value="Clothing">Clothing</option>
            <option value="Accessories">Accessories</option>
            <option value="Footwear">Footwear</option>
            <option value="Home">Home</option>
          </select>
          <Button type="submit" data-testid="btn-search">Search</Button>
        </form>

        {filteredProducts.length === 0 ? (
          <div data-testid="no-results" className="text-center py-12 text-gray-500">
            No products found.
          </div>
        ) : (
          <div 
            data-testid="product-list" 
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
