import ClientActions from "@/components/product/ClientActions";
import ProductCard from "@/components/product/ProductCard";
import { products } from "@/data/products";
import { formatCurrency } from "@/utils/formatCurrency";
import { recommendProducts } from "@/utils/recommendProducts";
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

  const recommendations = recommendProducts(
    item.id,
    item.category,
    products,
    3
  );
  return (
    <div className="space-y-16 p-6">
      <section className="space-y-6">
        <Link
          href={`/${category}`}
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
            {item.name}{" "}
            <span className="block">
              {item.category === "speakers" ? "Speaker" : item.category}
            </span>
          </h1>
        </header>

        <div className="mt-6 grid md:grid-cols-2 gap-8">
          <div>
            <p className="mb-4 font-medium">{item.description}</p>
            <h6 className="mb-6">{formatCurrency(item.price)} </h6>

            {/* Add actions */}
            {/* Client-only interactive part */}
            <ClientActions productId={String(item.id)} />
          </div>
        </div>
      </section>
      <section className="space-y-2">
        <h6 className="uppercase">Features</h6>
        <p>{item.features[0]}</p>
        <p>{item.features[1]}</p>
      </section>
      <section className="space-y-6">
        <h6 className="uppercase">In the box</h6>
        <ul className="space-y-3">
          {item.in_the_box.map((i, idx) => (
            <li key={idx} className="flex items-center gap-4">
              <span className="text-primary font-bold">{i.quantity}x</span>
              <p>{i.item}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="grid grid-cols-1 grid-rows-4 md:grid-cols-3 gap-4">
        {item.images.slice(2, 5).map((src, idx) => (
          <div
            key={idx}
            className={`relative w-full rounded overflow-hidden ${
              idx === 2 ? "row-span-2 object-[25%, 75%]" : "aspect-video"
            }`}
          >
            <Image
              src={src}
              alt={`${item.name} ${idx + 3}`} // +3 so alt matches actual image position
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
        ))}
      </section>
      {recommendations.length > 0 && (
        <section className="space-y-6 text-center">
          <h2 className="text-h5! uppercase">You may also like</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            {recommendations.map((rec) => (
              <ProductCard key={rec.id} product={rec} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
