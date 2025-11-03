import Button from "@/components/ui/Button";
import { products } from "@/data/products";
import clsx from "clsx";
import Image from "next/image";

type Props = { params: { category: string } };

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const categoryProducts = products.filter((p) => p.category === category);

  return (
    <section className="">
      <h1 className="text-h4! uppercase bg-true-black text-white p-4 md:py-16 text-center tracking-[2px]">
        {category}
      </h1>

      {categoryProducts.length === 0 ? (
        <p className="mt-6 text-sm">No products found for {category}.</p>
      ) : (
        <div className="page-container grid gap-24 md:gap-32 py-12 px-6 md:pt-16 text-center lg:text-left">
          {categoryProducts.map((p, idx) => (
            <article
              key={p.id}
              className={clsx(
                "flex flex-col lg:flex-row lg:gap-12 gap-y-4 md:gap-y-8 lg:items-center",
                idx % 2 === 1 && "lg:flex-row-reverse" // apply reverse layout for even index
              )}
            >
              <picture className="block w-full">
                <source media="(min-width:1024px)" srcSet={p.images[2]} />
                <source media="(min-width:768px)" srcSet={p.images[1]} />
                <Image
                  src={p.images[0]}
                  alt={p.name}
                  width={600}
                  height={600}
                  className="object-cover w-full h-auto rounded aspect-square md:aspect-video lg:aspect-square"
                />
              </picture>

              <div className="space-y-4 md:space-y-8 w-full">
                <div className="space-y-4">
                  {p.is_new && (
                    <p className="text-primary! uppercase text-sm tracking-[10px]">
                      New product
                    </p>
                  )}
                  <h3 className="font-bold uppercase md:text-h2!">
                    {p.name}
                    <span className="block">
                      {p.category === "speakers" ? "Speaker" : p.category}
                    </span>
                  </h3>
                </div>
                <p className="font-medium md:w-8/10 lg:w-full mx-auto">
                  {p.description}
                </p>
                <Button variant="primary" href={`/${category}/${p.id}`}>
                  See product
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
