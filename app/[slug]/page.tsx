// app/category/[slug]/page.tsx
import { products } from "@/data/products";
import Image from "next/image";

type Props = { params: { slug: string } };

export default async function CategoryPage({ params }: Props) {
   const { slug } = await params;
  const categoryProducts = products.filter(p => p.category === slug);

  return (
    <main className="container px-6 py-12">
      <h1 className="text-h2 uppercase">{slug}</h1>

      {categoryProducts.length === 0 ? (
        <p className="mt-6 text-sm">No products found for {slug}.</p>
      ) : (
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryProducts.map(p => (
            <article key={p.id} className="bg-surface rounded p-4">
              <div className="relative w-full h-40 mb-4">
                <Image src={p.images[0]} alt={p.name} fill className="object-cover rounded" />
              </div>
              <h3 className="font-bold">{p.name}</h3>
              <p className="text-sm mt-1">{p.description}</p>
              <div className="mt-3 font-semibold">${p.price}</div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
