"use client";
import React, { useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import Button from "../ui/Button";
import CategoryCard from "./CategoryCard";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
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

  return (
    <div role="dialog" aria-modal="true" className="fixed top-20 inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-true-black/40"
        onClick={onClose}
        aria-hidden
      />

      {/* Drawer */}
      <div className="relative z-10 w-full h-fit bg-white overflow-auto pb-8 pt-24 sm:pb-16 rounded-b-2xl">
        {/* Drawer */}
        <section className="container grid sm:grid-cols-3 gap-y-16 gap-x-4 bg-white">
          <CategoryCard
            title="Headphones"
            href="/headphones"
            imgSrc="/images/headphone.png"
          />
          <CategoryCard
            title="Speakers"
            href="/speakers"
            imgSrc="/images/speaker.png"
          />
          <CategoryCard
            title="Earphones"
            href="/earphones"
            imgSrc="/images/earphone.png"
          />
        </section>
      </div>
    </div>
  );
}
