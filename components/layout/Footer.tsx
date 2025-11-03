import Image from "next/image";
import Link from "next/link";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram, FaTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="relative bg-true-black text-white py-12">
      <div className="container px-6 flex flex-col justify-center items-center md:items-start text-center md:text-left gap-12 before:content-[''] before:absolute before:top-0 md:before:left-8 before:w-25 before:h-1 before:bg-primary">
        <div className="flex flex-col lg:flex-row lg:justify-between items-center md:items-start gap-12 w-full">
          {/*Logo */}
          <Link href="/">
            <Image
              src="/images/audiophile 2.svg" // starts from /public
              alt="Hero"
              width={140}
              height={60}
            />
          </Link>

          <nav className="flex flex-col md:flex-row gap-6 md:gap-10 uppercase">
            <Link href="/" className="tracking-widest">
              Home
            </Link>
            <Link href="/headphones" className="tracking-widest hover:text-primary">
              Headphones
            </Link>
            <Link href="/speakers" className="tracking-widest hover:text-primary">
              Speakers
            </Link>
            <Link href="/earphones" className="tracking-widest hover:text-primary">
              Earphones
            </Link>
          </nav>
        </div>
        <p className="max-w-md md:max-w-full lg:max-w-xl text-white/50!">
          Audiophile is an all in one stop to fulfill your audio needs. We're a
          small team of music lovers and sound specialists who are devoted to
          helping you get the most out of personal audio. Come and visit our
          demo facility - we’re open 7 days a week.
        </p>
        <div className="w-full flex flex-col md:flex-row items-center md:justify-between gap-12 md:mt-8">
          <p className="text-white/50!">Copyright 2021. All Rights Reserved</p>
          <div className="flex gap-4 items-center justify-center text-2xl">
            <a href="#" className="text-white hover:text-primary">
              <FaFacebookSquare />
            </a>
            <a href="#" className="text-white hover:text-primary">
              <FaTwitter />
            </a>
            <a href="#" className="text-white hover:text-primary">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
