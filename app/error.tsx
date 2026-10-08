"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center" data-testid="error-boundary">
      <h2 className="text-2xl font-bold mb-4 text-red-600">Something went wrong!</h2>
      <p className="mb-6 text-gray-600">An unexpected error occurred while loading this page.</p>
      <Button
        data-testid="btn-retry"
        onClick={() => reset()}
      >
        Try again
      </Button>
    </div>
  );
}
