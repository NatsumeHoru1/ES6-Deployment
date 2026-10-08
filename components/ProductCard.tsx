import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/lib/products";
import { FavoriteButton } from "./FavoriteButton";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card data-testid="product-card" className="overflow-hidden flex flex-col h-full">
      <div className="relative w-full aspect-square bg-gray-100">
        <Image
          data-testid="product-image"
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
      </div>
      <CardHeader className="flex-none flex flex-row justify-between items-start gap-2 space-y-0">
        <CardTitle data-testid="product-name" className="text-xl">{product.name}</CardTitle>
        <FavoriteButton productId={product.id} />
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription data-testid="product-description">{product.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex-none pt-4 flex justify-between items-center">
        <p data-testid="product-price" className="text-lg font-bold">
          ${product.price.toFixed(2)}
        </p>
        <Link 
          href={`/products/${product.id}`}
          data-testid="link-detail" 
          className="text-sm font-bold text-gray-900 px-4 py-2 rounded-md transition-all duration-300 shadow-sm hover:bg-[#76c893]"
          style={{ 
            backgroundColor: "#b5e48c",
            border: "2px solid #99d98c"
          }}
        >
          View Details
        </Link>
      </CardFooter>
    </Card>
  );
}
