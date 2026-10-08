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
        <div className="flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h1 data-testid="detail-name" className="text-3xl font-bold">{product.name}</h1>
            <FavoriteButton productId={product.id} />
          </div>
          <p data-testid="detail-category" className="text-sm text-gray-500 uppercase tracking-wide mb-4">
            {product.category}
          </p>
          <p data-testid="detail-price" className="text-2xl font-semibold mb-6">
            ${product.price.toFixed(2)}
          </p>
          <div data-testid="detail-description" className="text-gray-700 leading-relaxed mb-8">
            {product.description}
          </div>
        </div>
      </div>
    </div>
  );
}
