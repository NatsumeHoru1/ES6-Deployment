import Link from "next/link";
import { Header } from "@/components/Header";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center" data-testid="not-found">
        <h2 className="text-3xl font-bold mb-4">404 - Not Found</h2>
        <p className="mb-6">Could not find requested resource</p>
        <Link href="/" className="text-blue-500 hover:underline">
          Return Home
        </Link>
      </main>
    </div>
  );
}
