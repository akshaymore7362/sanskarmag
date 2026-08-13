import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#050606] px-6 py-24 text-center text-white">
      <h1 className="font-serif text-5xl">Page Not Found</h1>
      <Link href="/" className="mt-6 inline-block text-[#c9923f]">Return Home</Link>
    </main>
  );
}
