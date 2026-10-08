"use client";

import { useFavorites } from "@/contexts/FavoritesContext";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export function FavoriteButton({ productId }: { productId: number }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { user } = useAuth();
  const router = useRouter();

  const favorite = isFavorite(productId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent linking if inside a Link component
    if (!user) {
      router.push("/login");
      return;
    }
    toggleFavorite(productId);
  };

  return (
    <button
      data-testid="btn-favorite"
      aria-pressed={favorite}
      onClick={handleClick}
      className={`p-2 rounded-full border transition-colors ${
        favorite
          ? "bg-red-50 text-red-500 border-red-200"
          : "bg-white text-gray-400 border-gray-200 hover:text-gray-600"
      }`}
      aria-label="Toggle favorite"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={favorite ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    </button>
  );
}
