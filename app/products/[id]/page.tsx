import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";
import { FavoriteButton } from "@/components/FavoriteButton";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  const product = products.find((p) => p.id.toString() === id);
  if (!product) {
    return {
      title: "Product Not Found",
    };
  }
  return {
    title: `${product.name} | My Store`,
  };
}

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = products.find((p) => p.id.toString() === id);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link href="/" data-testid="link-back" className="text-blue-500 hover:underline mb-6 inline-block">
        &larr; Back to Home
      </Link>
      <div data-testid="product-detail" className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
        <div className="flex flex-col justify-center">
          <div className="bg-white p-8 rounded-2xl shadow-sm border flex flex-col h-full justify-center">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span data-testid="detail-category" className="inline-block px-3 py-1 bg-gray-100 text-gray-800 text-xs font-bold uppercase tracking-wider rounded-full mb-3">
                  {product.category}
                </span>
                <h1 data-testid="detail-name" className="text-3xl font-extrabold text-gray-900 tracking-tight leading-none mb-2">
                  {product.name}
                </h1>
              </div>
              <div className="transform scale-110 mt-1">
                <FavoriteButton productId={product.id} />
              </div>
            </div>
            
            <p data-testid="detail-price" className="text-4xl font-bold text-blue-600 mb-6">
              ${product.price.toFixed(2)}
            </p>
            
            <div className="h-px bg-gray-200 w-full mb-6"></div>
            
            <div data-testid="detail-description" className="text-gray-600 leading-relaxed mb-8 text-lg">
              {product.description}
            </div>
            
            <div className="mt-auto">
              <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 p-4 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                In stock and ready to ship
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
