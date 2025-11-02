import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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
    <html lang="en">
      <body className={`${manrope.className} antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
