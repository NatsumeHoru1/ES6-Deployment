import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white p-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
        <h1 className="text-xl font-bold">My Store</h1>
        <nav className="flex gap-4">
          <Button asChild data-testid="btn-login" variant="outline">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild data-testid="btn-register">
            <Link href="/register">Register</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1 p-6 lg:px-8 max-w-7xl mx-auto w-full">
        <h2 className="text-2xl font-bold mb-6">Our Products</h2>
        <div 
          data-testid="product-list" 
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}
