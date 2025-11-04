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
    <div className="page-container space-y-16 md:space-y-20 p-6">
      <section className="space-y-6 w-full">
        <Link
          href={`/${category}`}
          className="text-gray font-medium inline-block"
        >
          Go back
        </Link>
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 w-full">
          <Image
            src={item.images[2]}
            alt={item.name}
            width={400}
            height={400}
            className="rounded object-cover aspect-square md:aspect-[2_4] w-full h-auto"
          />
          <div className="space-y-6 w-full">
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
            <div className="mt-6">
              <div>
                <p className="mb-4 font-medium">{item.description}</p>
                <h6 className="mb-6">{formatCurrency(item.price)}</h6>

                {/* Add actions */}
                {/* Client-only interactive part */}
                <ClientActions
                  productId={String(item.id)}
                  productName={item.name}
                  productPrice={item.price}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* FEATURES */}
        <section className="space-y-4 lg:space-y-6">
          <h6 className="uppercase text-h5! md:text-h3!">Features</h6>
          <p>{item.features[0]}</p>
          <p>{item.features[1]}</p>
        </section>

        {/* IN THE BOX */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 w-full">
          <h6 className="uppercase text-h5! md:text-h3!">In the box</h6>{" "}
          <ul className="space-y-3">
            {item.in_the_box.map((i, idx) => (
              <li key={idx} className="flex items-center gap-4">
                <span className="text-primary font-bold">{i.quantity}x</span>
                <p>{i.item}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="grid grid-cols-1 grid-rows-4 md:grid-cols-7 md:grid-rows-2 gap-4">
        {item.images.slice(3, 6).map((src, idx) => {
          // classes per position on md+
          const classes =
            idx === 0
              ? "aspect-video md:col-start-1 md:col-span-3 md:row-start-1" // first: row 1, span 2 cols
              : idx === 1
                ? "aspect-video md:col-start-1 md:col-span-3 md:row-start-2" // second: row 2, span 2 cols
                : "aspect-square md:aspect-auto md:col-start-4 md:col-span-4 row-span-2"; // third: span 4 cols & 2 rows

          return (
            <div
              key={idx}
              className={`relative w-full rounded overflow-hidden ${classes}`}
            >
              <Image
                src={src}
                alt={`${item.name} gallery ${idx + 1}`}
                fill
                //   sizes="(max-width: 767px) 80vw, (min-width: 768px) 50vw"
                className="object-cover object-center md:object-[25%_75%] w-full h-auto"
                priority={idx === 2} // optional: preload the large/tall image
              />
            </div>
          );
        })}
      </section>

      {recommendations.length > 0 && (
        <section className="space-y-6 text-center">
          <h2 className="text-h5! uppercase">You may also like</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-12 gap-x-4">
            {recommendations.map((rec) => (
              <ProductCard key={rec.id} product={rec} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
