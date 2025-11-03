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

interface CartItemProps {
  item: CartItemType;
  editable?: boolean; // show NumberInput when true (default)
  compact?: boolean; // tighter spacing for summary cards
  onQtyChange?: (id: string, qty: number) => void; // override internal update
}

export default function CartItem({
  item,
  editable = true,
  compact = false,
  onQtyChange,
}: CartItemProps) {
  const { updateQty } = useCart();

  const product = products.find((p) => p.id === item.id);
  const productImage =
    product?.images.find((src) => src.includes("image-product")) ??
    product?.images[0] ??
    "/images/placeholder.png";

  return (
    <div className={`flex items-center gap-4 ${compact ? "py-2" : "py-4"}`}>
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
            <p className="text-sm font-medium">
              {formatCurrency(item.price)}
            </p>
          </div>
          {editable ? (
            <NumberInput
              value={item.qty}
              onChange={(v) => updateQty(item.id, v)}
              min={1}
              max={99}
            />
          ) : (
            <p className="font-bold self-start">x{item.qty}</p>
          )}
        </div>
      </div>
    </div>
  );
}
