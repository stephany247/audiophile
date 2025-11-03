// components/product/ProductCard.tsx
import Link from "next/link";
import Image from "next/image";
import Button from "../ui/Button";
import type { Product } from "@/utils/recommendProducts";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const href = `/${product.category}/${product.id}`;

  return (
    <article className="text-center space-y-6 md:space-y-10">
      <div className="relative w-full aspect-5/3 md:aspect-2/3 lg:aspect-square rounded overflow-hidden bg-surface">
        <Image
          src={product.images?.[1] ?? "/images/headphone.png"}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-contain md:object-cover w-20 h-auto"
        />
      </div>

      <h3 className="text-xl font-bold uppercase tracking-wide">{product.name} {product.category === "speakers" ? "Speaker" : ""}</h3>

      <Link href={href}>
        {/* If your Button accepts href prop you can pass it directly instead */}
        <Button>See Product</Button>
      </Link>
    </article>
  );
}
