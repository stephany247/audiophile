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
      <div className="absolute inset-0 lg:relative lg:inset-auto lg:hidden">
        <Image
          src={imgSrc}
          alt={title}
          fill
          priority
          className="object-cover object-[50%_75%]"
          sizes="(max-width: 767px) 100vw, 50vw"
        />
        {/* subtle dark overlay so text is readable */}
        <div className="absolute inset-0 bg-true-black/60" />
      </div>

      <section className="page-container grid lg:grid-cols-2 gap-10 md:gap-0 items-center px-6 py-32 md:py-0">
        {/* Text column — centered on mobile, left-aligned from md up */}
        <div className="relative z-10 space-y-6 md:space-y-10 text-center lg:text-left">
          <p className="tracking-[0.63rem] uppercase text-accent!">
            New Product
          </p>

          <h2 className="uppercase font-manrope font-bold text-h1! tracking-wider">
            {title}
            <span className="block">{subtitle}</span>
          </h2>

          <p className="max-w-sm mx-auto lg:mx-0 text-[15px] font-medium leading-6 text-white/75!">
            {description}
          </p>

          <div className="flex justify-center lg:justify-start">
            <Button variant="primary">See Product</Button>
          </div>
        </div>

        {/* Desktop image column — hidden on mobile, visible md+ */}
        <div className="hidden lg:flex relative w-full h-full items-center justify-center">
          <div className="w-full max-w-140">
            <Image
              src={imgSrc}
              alt={`${title} hero`}
              width={720}
              height={720}
              className="object-contain md:object-cover"
              priority
            />
          </div>
        </div>
      </section>
    </section>
  );
}
