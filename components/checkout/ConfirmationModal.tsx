"use client";
import React, { useEffect, useRef, useState } from "react";
import { formatCurrency } from "@/utils/formatCurrency";
import CartItem from "@/components/cartModal/CartItem";
import clsx from "clsx";
import Button from "../ui/Button";
import { FaCircleCheck } from "react-icons/fa6";

export default function ConfirmationModal({
  open,
  onClose,
  orderId,
  customerName,
  items,
  grandTotal,
}: {
  open: boolean;
  onClose: () => void;
  orderId?: string;
  customerName?: string;
  items: { id?: string; name: string; price: number; qty: number }[];
  grandTotal: number;
}) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false); // used to trigger mount animation
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (open) {
      setVisible(true);
      // focus panel for accessibility
      setTimeout(() => panelRef.current?.focus(), 120);
    } else {
      // on close start fade-out
      setVisible(false);
      // collapse when hidden
      setExpanded(false);
    }
  }, [open]);

  // close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // close when clicking / tapping outside the panel
  useEffect(() => {
    if (!open) return;

    function handlePointerDown(e: PointerEvent) {
      const panel = panelRef.current;
      if (!panel) return;
      // if click target is not inside the panel => close
      if (e.target instanceof Node && !panel.contains(e.target)) {
        onClose();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open, onClose]);

  if (!open && !visible) return null;

  const first = items[0];
  const others = Math.max(0, items.length - 1);

  return (
    <div
      ref={overlayRef}
      className={clsx(
        "fixed inset-0 z-60 flex items-center justify-center p-4",
        "bg-black/50 transition-opacity duration-300",
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        // panel slide+fade
        className={clsx(
          "w-full max-w-lg bg-white rounded-lg p-6 md:p-8 shadow-lg transform transition-all duration-300 outline-none",
          visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        )}
        style={{ willChange: "transform, opacity" }}
      >
        <div className="space-y-6 md:space-y-8">
          <div className="flex justify-center">
            <FaCircleCheck className="text-primary w-16 h-16" />
          </div>

          <h5 className="uppercase font-bold mb-2 leading-tight text-center">
            THANK YOU
            <br />
            FOR YOUR ORDER
          </h5>
          <p className="text-gray mb-6 text-center">
            You will receive an email confirmation shortly.
          </p>

          <div className="grid md:grid-cols-5 w-full">
            {/* Card with first item + expand control */}
            <div className="bg-surface rounded-t-lg md:rounded-l-lg md:rounded-r-none p-6 pb-2 md:col-span-3">
              {/* Compact first-item row using CartItem (read-only) */}
              {first && (
                <div className="flex items-center justify-between border-b border-gray pb-4">
                  <div className="flex-1">
                    {/* Pass a safe id in case first.id is undefined */}
                    <CartItem
                      item={{
                        id:
                          first.id ??
                          `${first.name.replace(/\s+/g, "-").toLowerCase()}-0`,
                        name: first.name,
                        price: first.price,
                        qty: first.qty,
                      }}
                      editable={false}
                      compact
                    />
                  </div>
                </div>
              )}

              {others > 0 && (
                <div className="mt-5 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setExpanded((s) => !s)}
                    className="text-sm text-true-black/50 hover:underline font-bold"
                    aria-expanded={expanded ? "true" : "false"}
                    aria-controls="confirmation-expanded-items"
                  >
                    and {others} other item{others > 1 ? "s" : ""}
                  </button>
                </div>
              )}

              {/* Expand area: animated height + content */}
              <div
                className={clsx(
                  "mt-3 overflow-hidden transition-[max-height] duration-300",
                  expanded ? "max-h-80" : "max-h-0"
                )}
              >
                {expanded && (
                  <div className="space-y-3">
                    {items.slice(1).map((it, idx) => {
                      const safeItem = {
                        id:
                          it.id ??
                          `${it.name.replace(/\s+/g, "-").toLowerCase()}-${
                            idx + 1
                          }`,
                        name: it.name,
                        price: it.price,
                        qty: it.qty,
                      };
                      return (
                        <div key={safeItem.id} className="py-1">
                          <CartItem item={safeItem} editable={false} compact />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col justify-center gap-2 p-6 bg-true-black md:col-span-2 rounded-b-l md:rounded-r-lg md:rounded-l-none">
              <span className="text-white/50 uppercase text-sm">
                GRAND TOTAL
              </span>
              <h6 className="text-white text-lg">
                {formatCurrency(grandTotal)}
              </h6>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              variant="primary"
              btnType="button"
              onClick={onClose}
              className="w-full"
            >
              BACK TO HOME
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
