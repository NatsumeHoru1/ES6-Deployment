"use client";

import Link from "next/link";
import { buttonVariants, Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/contexts/FavoritesContext";

export function Header() {
  const { user, signOut, loading } = useAuth();
  const { favorites } = useFavorites();

  return (
    <header className="border-b p-4 flex justify-between items-center sticky top-0 z-10 shadow-sm" style={{ backgroundColor: "#b5e48c" }}>
      <Link href="/">
        <h1 className="text-xl font-bold text-gray-900">My Store</h1>
      </Link>
      <nav className="flex gap-4 items-center">
        {!loading && (
          user ? (
            <>
              <Link href="/favorites" data-testid="link-favorites" className="text-sm font-medium text-gray-900 hover:text-black hover:underline flex items-center gap-1">
                Favorites (<span data-testid="favorites-count">{favorites.length}</span>)
              </Link>
              <Link href="/account" data-testid="user-email" className="text-sm font-medium text-gray-900 hover:text-black hover:underline">
                {user.email}
              </Link>
              <Button data-testid="btn-logout" onClick={() => signOut()} variant="outline">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" data-testid="btn-login" className={buttonVariants({ variant: "outline" })}>
                Login
              </Link>
              <Link href="/register" data-testid="btn-register" className={buttonVariants()}>
                Register
              </Link>
            </>
          )
        )}
      </nav>
    </header>
  );
}
