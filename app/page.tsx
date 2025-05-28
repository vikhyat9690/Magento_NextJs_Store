'use client'

export default function Home() {
  return (
    <div className="h-full w-full bg-black p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Home Page</h1>
      <h2 className="hover:underline"><a href="/products">Explore products</a></h2>
    </div>
  );
}
