import Image from "next/image";
import { FaAngleRight } from "react-icons/fa6";
import Button from "../ui/Button";

interface CategoryCardProps {
  title: string;
  href: string;
  imgSrc: string;
}

export default function CategoryCard({ title, href, imgSrc }: CategoryCardProps) {
  return (
    <article className="relative flex flex-col items-center bg-surface text-true-black rounded-lg p-6 text-center hover:shadow-md transition-all">
      {/* Image + shadow wrapper */}
      <div className="relative flex items-center justify-center md:space-y-4 w-full">
        {/* Image */}
        <Image
          src={imgSrc}
          alt={title}
          width={120}
          height={120}
          className="relative z-10 -mt-20 object-contain w-20 h-30 md:w-32 md:h-40"
        />

        {/* Elliptical shadow below image */}
        <div className="absolute bottom-0 w-20 h-12 bg-black/40 blur-md rounded-full" />
      </div>

      {/* Text */}
      <h3 className="uppercase font-bold tracking-[0.067rem] text-base! mb-2">
        {title}
      </h3>

      {/* CTA Button */}
      <Button variant="ghost" href={href} className="flex items-center justify-center gap-2 py-2!">
        Shop <FaAngleRight className="text-primary text-lg" />
      </Button>
    </article>
  );
}
