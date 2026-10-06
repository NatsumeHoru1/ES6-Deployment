"use client";

import Link from "next/link";
import { buttonVariants, Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export function Header() {
  const { user, signOut, loading } = useAuth();

  return (
    <header className="border-b bg-white p-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
      <Link href="/">
        <h1 className="text-xl font-bold">My Store</h1>
      </Link>
      <nav className="flex gap-4 items-center">
        {!loading && (
          user ? (
            <>
              <Link href="/account" data-testid="user-email" className="text-sm font-medium hover:underline">
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
