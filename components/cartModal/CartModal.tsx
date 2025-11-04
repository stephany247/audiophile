"use client";
import { useCart } from "@/stores/cart";
import CartItem from "./CartItem";
import { useCallback, useEffect, useRef } from "react";
import Button from "../ui/Button";
import { formatCurrency } from "@/utils/formatCurrency";
import { useRouter } from "next/navigation";

export default function CartModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { items, clear } = useCart();
  const router = useRouter();
  const panelRef = useRef<HTMLDivElement | null>(null);

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

  // close when clicking outside the modal panel
  useEffect(() => {
    if (!open) return;

    function handlePointerDown(e: PointerEvent) {
      const panel = panelRef.current;
      if (!panel) return;
      // if the click is outside the panel, close
      if (e.target instanceof Node && !panel.contains(e.target)) {
        onClose();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open, onClose]);

  if (!open) return null;

  // subtotal (price assumed to be in same currency units)
  const subtotal = items.reduce((acc, it) => acc + it.price * it.qty, 0);

  const handleCheckout = () => {
    if (items.length === 0) return; // guard
    onClose();
    router.push("/checkout");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center md:justify-end md:pr-8 lg:pr-24 items-start pt-24">
      <div
        ref={panelRef}
        className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 space-y-6"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-h6! uppercase text-true-black">
            Cart ({items.length})
          </h2>
          <button
            onClick={clear}
            className="text-sm text-gray font-medium underline hover:no-underline hover:text-primary cursor-pointer"
          >
            Remove all
          </button>
        </div>

        <div className="space-y-2 max-h-70 overflow-y-auto">
          {items.length ? (
            items.map((item) => <CartItem key={item.id} item={item} />)
          ) : (
            <p className="text-sm text-gray-500 text-center">Your cart is empty</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="uppercase text-true-black/50">Total</span>
          <span className="text-lg font-bold text-true-black">
            {formatCurrency(subtotal)}
          </span>
        </div>

        <Button
          variant="primary"
          btnType="button"
          onClick={handleCheckout}
          className="w-full"
          disabled={items.length === 0}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
}
