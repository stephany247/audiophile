import Image from "next/image";
import Link from "next/link";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram, FaTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-true-black text-white py-12">
      <div className="container px-6 flex flex-col lg:flex-row justify-center items-center text-center gap-12">
        {/*Logo */}
        <Link href="/">
          <Image
            src="/images/audiophile 2.svg" // starts from /public
            alt="Hero"
            width={140}
            height={60}
          />
        </Link>

        <nav className="flex flex-col gap-6 uppercase">
          <Link href="/" className="tracking-widest">
            Home
          </Link>
          <Link href="/headphones" className="tracking-widest">
            Headphones
          </Link>
          <Link href="/speakers" className="tracking-widest">
            Speakers
          </Link>
          <Link href="/earphones" className="tracking-widest">
            Earphones
          </Link>
        </nav>
        <p className="max-w-md text-white/50!">
          Audiophile is an all in one stop to fulfill your audio needs. We're a
          small team of music lovers and sound specialists who are devoted to
          helping you get the most out of personal audio. Come and visit our
          demo facility - we’re open 7 days a week.
        </p>
        <div className="w-full flex flex-col gap-12">
          <p className="text-white/50!">Copyright 2021. All Rights Reserved</p>
          <div className="flex gap-4 items-center justify-center text-2xl">
            <FaFacebookSquare />
            <FaTwitter />
            <FaInstagram />
          </div>
        </div>
      </div>
    </footer>
  );
}
