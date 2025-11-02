import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Categories from "@/components/home/Categories";
import AboutSection from "@/components/home/AboutSection";

const manrope = Manrope({
  subsets: ["latin"],
  // variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Audiophile E-Commerce App",
  description:
    "Experience high-end audio gear. Shop headphones, speakers, and earphones designed for real sound lovers.",
  keywords: [
    "audiophile",
    "headphones",
    "earphones",
    "speakers",
    "hi-fi audio",
    "e-commerce",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <>
        <main>{children}</main>
        <Categories />
        <AboutSection />
      </>
  );
}
