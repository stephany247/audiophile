// app/category/[category]/page.tsx
import Button from "@/components/ui/Button";
import { products } from "@/data/products";
import Image from "next/image";

type Props = { params: { category: string } };

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const categoryProducts = products.filter((p) => p.category === category);

  return (
    <section className="">
      <h1 className="text-h4! uppercase bg-true-black text-white p-4 text-center tracking-[2px]">
        {category}
      </h1>

      {categoryProducts.length === 0 ? (
        <p className="mt-6 text-sm">No products found for {category}.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-24 py-12 px-6 text-center">
          {categoryProducts.map((p) => (
            <article key={p.id} className="space-y-4">
                <Image
                  src={p.images[0]}
                  alt={p.name}
                  width={120}
                  height={120}
                  className="object-cover w-full h-auto aspect-square rounded"
                />
              {p.is_new && (
                <p className="text-primary! uppercase text-sm tracking-[10px]">
                  New product
                </p>
              )}
              <h3 className="font-bold">
                {p.name}
                <span className="block">
                  {p.category === "speakers" ? "Speaker" : p.category}
                </span>
              </h3>

              <p className="font-medium">{p.description}</p>
              <Button variant="primary" href={`/${category}/${p.id}`}>See product</Button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
