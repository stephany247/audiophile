import Image from "next/image";
import Button from "@/components/ui/Button";

interface HeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  imgSrc?: string;
}

export default function Hero({
  title = "XX99 Mark II",
  subtitle = "Headphones",
  description = "Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.",
  imgSrc = "/images/hero-image.png",
}: HeroProps) {
  return (
    <section className="relative bg-black text-white">
      <div className="absolute inset-0 md:relative md:inset-auto md:hidden">
        <Image
          src={imgSrc}
          alt={title}
          fill
          priority
          className="object-cover object-[50%_75%]"
          sizes="(max-width: 767px) 100vw, 50vw"
        />
        {/* subtle dark overlay so text is readable */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <section className="container grid lg:grid-cols-2 gap-10 items-center px-6 py-32">
        {/* Text column — centered on mobile, left-aligned from md up */}
        <div className="relative z-10 space-y-6 text-center md:text-left">
          <p className="text-sm tracking-[0.063rem] uppercase text-accent">
            New Product
          </p>

          <h2 className="uppercase font-manrope font-bold text-h1 leading-10 tracking-wider">
            {title}
            <span className="block">{subtitle}</span>
          </h2>

          <p className="max-w-xl mx-auto md:mx-0 text-[15px] font-medium leading-6">
            {description}
          </p>

          <div className="flex justify-center md:justify-start">
            <Button variant="primary">See Product</Button>
          </div>
        </div>

        {/* Desktop image column — hidden on mobile, visible md+ */}
        <div className="hidden md:flex relative w-full h-96 items-center justify-center">
          <div className="w-full max-w-140">
            <Image
              src={imgSrc}
              alt={`${title} hero`}
              width={720}
              height={720}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>
    </section>
  );
}
