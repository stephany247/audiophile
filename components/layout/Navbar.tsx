"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { MdMenu } from "react-icons/md";
import MobileMenu from "./MobileMenu";
import CartModal from "../cartModal/CartModal";
import { useCart } from "@/stores/cart";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const cartCount = useCart((state) =>
    state.items.reduce((sum, item) => sum + item.qty, 0),
  );

  return (
    <header className="w-full bg-true-black text-white">
      <div className="page-container flex items-center justify-between px-6 py-6 relative">
        {/* MOBILE + TABLET LEFT SECTION */}
        <div className="flex items-center gap-4 lg:gap-8">
          {/* Menu icon (hidden on desktop) */}
          <button
            className="lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Open menu"
          >
            <MdMenu size={28} />
          </button>

          {/*Tablet Logo */}
          <Link href="/" className="hidden md:block">
            <Image
              src="/images/audiophile 2.svg"
              alt="Hero"
              width={140}
              height={60}
            />
          </Link>
        </div>
        {/* Mobile Logo */}

        <Link href="/" className="md:hidden">
          <Image
            src="/images/audiophile 2.svg" // starts from /public
            alt="Hero"
            width={140}
            height={60}
          />
        </Link>

        {/* NAV LINKS (center on desktop only) */}
        <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 gap-8 text-subtitle uppercase tracking-[0.1rem]">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <Link href="/headphones" className="hover:text-primary">
            Headphones
          </Link>
          <Link href="/speakers" className="hover:text-primary">
            Speakers
          </Link>
          <Link href="/earphones" className="hover:text-primary">
            Earphones
          </Link>
        </nav>

        {/* CART ICON */}
        <button
          className="relative text-white cursor-pointer"
          onClick={() => setCartOpen(true)}
          aria-label="Open cart"
        >
          <IoCartOutline size={26} />

          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* divider line */}
      <div className="h-px bg-[#2C2C2C] mx-6"></div>
      <MobileMenu open={open} onClose={() => setOpen(false)} />

      {/* cart modal */}
      {cartOpen && (
        <CartModal open={cartOpen} onClose={() => setCartOpen(false)} />
      )}
    </header>
  );
}
