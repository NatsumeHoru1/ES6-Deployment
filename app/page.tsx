import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white p-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
        <h1 className="text-xl font-bold">My Store</h1>
        <nav className="flex gap-4">
          <Link href="/login" data-testid="btn-login" className={buttonVariants({ variant: "outline" })}>
            Login
          </Link>
          <Link href="/register" data-testid="btn-register" className={buttonVariants()}>
            Register
          </Link>
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
