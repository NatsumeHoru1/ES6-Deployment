import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/lib/products";

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
      <CardHeader className="flex-none">
        <CardTitle data-testid="product-name">{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription data-testid="product-description">{product.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex-none pt-4">
        <p data-testid="product-price" className="text-lg font-bold">
          ${product.price.toFixed(2)}
        </p>
      </CardFooter>
    </Card>
  );
}
