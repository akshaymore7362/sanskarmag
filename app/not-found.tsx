import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#F7F5EF] px-6 py-24 text-center text-[#102A43]">
      <h1 className="font-serif text-5xl">Page Not Found</h1>
      <Link href="/" className="mt-6 inline-block text-[#102A43]">Return Home</Link>
    </main>
  );
}
