"use client";
import { useCart } from "@/stores/cart";
import CartItem from "./CartItem";
import { useCallback, useEffect } from "react";
import Button from "../ui/Button";
import { formatCurrency } from "@/utils/formatCurrency";

export default function CartModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { items, clear } = useCart();

  // simple body scroll lock
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // close on Escape
  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onKey]);

  if (!open) return null;

  // sum price * qty (price stored in cents)
  const subtotal = items.reduce((acc, it) => acc + it.price * it.qty, 0);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-start pt-24">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-h6! uppercase text-true-black">
            Cart ({items.length})
          </h2>
          <button
            onClick={clear}
            className="text-sm text-gray font-medium underline hover:no-underline hover:text-red-500"
          >
            Remove all
          </button>
        </div>

        <div className="space-y-4 max-h-80 overflow-y-auto">
          {items.length ? (
            items.map((item) => <CartItem key={item.id} item={item} />)
          ) : (
            <p className="text-sm text-gray-500 text-center">
              Your cart is empty
            </p>
          )}
        </div>

        {/* Totals */}
        {/* <div className="mt-6 border-t pt-4"> */}
          <div className="flex items-center justify-between">
            <span className="uppercase text-true-black/50">Total</span>
            <span className="text-lg font-bold text-true-black">
              {formatCurrency(subtotal)}
            </span>
          </div>
        {/* </div> */}

        <Button variant="primary" onClick={onClose} className="w-full">
          Checkout
        </Button>
      </div>
    </div>
  );
}
