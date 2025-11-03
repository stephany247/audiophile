"use client";

import { useEffect, useState } from "react";
import NumberInput from "@/components/ui/NumberInput";
import Button from "../ui/Button";
import { useCart } from "@/stores/cart";

type Props = {
  productId: string;
  productName: string;
  productPrice: number;
};

export default function ClientActions({
  productId,
  productName,
  productPrice,
}: Props) {
  const [quantity, setQuantity] = useState(1);
  const { add } = useCart();
  const cartItem = useCart((s) => s.items.find((it) => it.id === productId));

  useEffect(() => {
    if (cartItem?.qty && Number.isFinite(cartItem.qty)) {
      setQuantity(cartItem.qty);
    } else {
      setQuantity(1);
    }
  }, [cartItem?.qty, productId]);

  function handleAddToCart() {
    add({
      id: productId,
      name: productName,
      price: productPrice,
      qty: quantity,
    });
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
