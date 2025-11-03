import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="page-container px-6 py-12 pb-24 flex flex-col lg:flex-row-reverse gap-8 md:gap-12 lg:gap-16 items-center text-center lg:text-left">
      <Image
        src="/images/image-best-gear.jpg"
        alt="ZX9 Speaker"
        width={640}
        height={420}
        className="relative z-10 w-full h-75 md:h-auto lg:max-h-140 aspect-square md:aspect-video lg:aspect-square rounded object-cover object-center md:object-[100%_60%]"
      />
      <div className="space-y-4 lg:space-y-8 md:w-8/10 lg:w-full mx-auto">
        <h3 className="text-h3! md:text-h1! font-bold uppercase">
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
