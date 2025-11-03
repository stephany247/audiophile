"use client";
import React from "react";
import NumberInput from "@/components/ui/NumberInput";
import { useCart } from "@/stores/cart";
import { formatCurrency } from "@/utils/formatCurrency";
import { products } from "@/data/products";
import Image from "next/image";

type CartItemType = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

export default function CartItem({ item }: { item: CartItemType }) {
  const { updateQty } = useCart();

  const product = products.find((p) => p.id === item.id);
  const productImage =
    product?.images.find((src) => src.includes("image-product")) ??
    product?.images[0] ??
    "/images/placeholder.png";

  return (
    <div className="flex items-center gap-4">
      {/* Thumbnail */}
      <div className="w-14 h-14 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
        <Image
          src={productImage}
          alt={item.name}
          width={56}
          height={56}
          className="object-cover w-full h-full"
        />
      </div>


      <div className="flex-1">
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col justify-center">
            {/* <div className="text-sm font-semibold">{item.name}</div> */}
            <h6 className="text-true-black">{item.name}</h6>
            <div className="text-xs text-true-black/50! font-medium">
              {formatCurrency(item.price)}
            </div>
          </div>

          <NumberInput
            value={item.qty}
            onChange={(v) => updateQty(item.id, v)}
            min={1}
            max={99}
          />
        </div>
      </div>
    </div>
  );
}
