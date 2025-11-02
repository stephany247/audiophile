"use client";

import { useState } from "react";
import NumberInput from "@/components/ui/NumberInput";
import Button from "../ui/Button";

type Props = {
  productId: string;
};

export default function ClientActions({ productId }: Props) {
  const [quantity, setQuantity] = useState<number>(1);

  function handleAddToCart() {
    console.log("add to cart", { productId, quantity });
  }

  return (
    <div className="flex gap-4 items-center">
      <NumberInput value={quantity} onChange={setQuantity} />
      <Button variant="primary" onClick={handleAddToCart}>
        Add to cart
      </Button>
    </div>
  );
}
