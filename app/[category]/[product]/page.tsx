// app/categories/[category]/products/[product]/page.tsx
import { products } from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: { category: string; product: string } };

export default async function ProductPage({ params }: Props) {
  const { category, product } = await params;

  // find by id or slug — adapt if your product uses 'slug' instead of 'id'
  const item = products.find(
    (p) => String(p.id) === String(product) && p.category === category
  );

  if (!item) {
    // server-side 404
    return notFound();
  }

  return (
    <article className="space-y-6 p-6">
      <Link
        href={`/categories/${category}`}
        className="text-gray font-medium inline-block"
      >
        Go back
      </Link>
      <Image
        src={item.images[1]}
        alt={item.name}
        width={600}
        height={600}
        className="rounded object-cover"
      />
      <header className="space-y-4">
        {item.is_new && (
          <p className="text-primary! uppercase text-sm tracking-[10px]">
            New product
          </p>
        )}

        <h1 className="text-h4! font-bold uppercase">
          {item.name} <span className="block">{item.category}</span>
        </h1>
      </header>

      <div className="mt-6 grid md:grid-cols-2 gap-8">
        <div>
          <p className="mb-4 font-medium">{item.description}</p>
          <p className="mb-6">Price: ${item.price ?? "—"}</p>

          {/* Add actions */}
          <div className="flex gap-4">
            <a href="#" className="btn btn-primary">
              Add to cart
            </a>
            <a href={`/categories/${category}`} className="btn">
              Back to category
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
