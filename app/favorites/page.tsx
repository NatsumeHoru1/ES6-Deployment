"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Header } from "@/components/Header";
import { Product, products } from "@/lib/products";
import Link from "next/link";
import { FavoriteButton } from "@/components/FavoriteButton";

export default function FavoritesPage() {
  const { user, loading } = useAuth();
  const { favorites } = useFavorites();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p>Loading...</p>
        </main>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-6 lg:px-8 max-w-4xl mx-auto w-full">
        <h2 className="text-2xl font-bold mb-6">Your Favorites</h2>
        
        {favoriteProducts.length === 0 ? (
          <div data-testid="favorites-empty" className="text-center py-12 text-gray-500">
            You have no favorite products yet.
          </div>
        ) : (
          <div data-testid="favorites-page" className="space-y-4">
            {favoriteProducts.map((product) => (
              <div 
                key={product.id} 
                data-testid="favorite-item"
                className="flex items-center justify-between p-4 border rounded-lg bg-white shadow-sm"
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-lg">{product.name}</span>
                  <span className="text-gray-600">${product.price.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-4">
                  <Link 
                    href={`/products/${product.id}`}
                    className="text-sm font-bold text-gray-900 px-4 py-2 rounded-md transition-all duration-300 shadow-sm"
                    style={{ 
                      backgroundColor: "#b5e48c",
                      border: "2px solid #99d98c"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#76c893")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#b5e48c")}
                  >
                    View Details
                  </Link>
                  <FavoriteButton productId={product.id} />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
