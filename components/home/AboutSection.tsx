import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="container px-6 py-12 pb-24 grid lg:grid-cols-2 gap-8 items-center text-center">
      <Image
        src="/images/man-with-headphones.png"
        alt="ZX9 Speaker"
        width={640}
        height={420}
        className="relative z-10 w-full h-75 rounded object-cover object-center"
      />
      <div className="space-y-4">
        <h3 className="text-h3 font-bold uppercase">
          Bringing you the{" "}
          <mark className="bg-transparent text-primary">best</mark> audio gear
        </h3>
        <p className="font-medium">
          Located at the heart of New York City, Audiophile is the premier store
          for high end headphones, earphones, speakers, and audio accessories.
          We have a large showroom and luxury demonstration rooms available for
          you to browse and experience a wide range of our products. Stop by our
          store to meet some of the fantastic people who make Audiophile the
          best place to buy your portable audio equipment.
        </p>
      </div>
    </section>
  );
}
