import Image from "next/image";
import Button from "@/components/ui/Button";

export default function FeaturedGrid() {
  return (
    <section className="page-container px-6 py-12 grid grid-cols-1 items-stretch text-center gap-8 h-full">
      <article className="col-span-1 bg-primary text-white rounded p-8 py-16 lg:py-0 h-150 lg:h-110 w-full flex flex-col lg:flex-row justify-between lg:justify-center items-center gap-6 lg:gap-20 bg-[url(/images/circle-illustration.png)] bg-contain bg-top md:bg-position-[center_bottom_3.8rem] lg:bg-position-[left_6rem_top_9rem] bg-no-repeat">
        {/* brown speaker */}
        <Image
          src="/images/speaker.png"
          alt="ZX9 Speaker"
          width={120}
          height={120}
          className="relative z-10 object-contain w-40 h-50 lg:w-70 md:h-80 lg:self-end"
        />
        <div className="space-y-6 lg:text-left">
          <h2 className="text-balance uppercase">ZX9 <br className="hidden lg:block"/> Speaker</h2>
          <p className="max-w-sm font-medium text-white/75!">
            Upgrade to premium speakers that are phenomenally built to deliver
            truly remarkable sound.
          </p>
          <Button variant="primary" href="/speakers/zx9-speaker" className="bg-black hover:bg-black/80 w-fit">
            See Product
          </Button>
        </div>
      </article>

      <article className="col-span-1 bg-surface rounded p-6 flex flex-col justify-center gap-y-8 h-80 w-full bg-[url(/images/zx7-speaker.png)] md:bg-[url(/images/zx7-speaker-desktop.png)] bg-cover bg-left md:bg-center lg:bg-position-[100%_95%] bg-no-repeat">
        <h3 className="font-bold uppercase text-left">ZX7 Speaker</h3>
        <Button href="/speakers/zx7-speaker" variant="secondary" className="w-fit">
          See Product
        </Button>
      </article>

      <article className="grid grid-rows-2 h-full w-full gap-8 md:gap-4 md:grid-rows-1 md:grid-cols-2">
        <div className="relative w-full pb-[56%] rounded overflow-hidden md:aspect-square lg:aspect-video">
          <Image
            src="/images/yx1-earphone.png"
            alt="YX1 Earphones"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* CONTENT */}
        <div className="bg-surface rounded-b w-full h-full flex flex-col justify-center space-y-4 p-6 rounded py-8 md:aspect- lg:aspect-video">
          <h3 className="font-bold uppercase text-left">YX1 Earphones</h3>
          <Button href="/speakers/zx7-speaker" variant="secondary" className="w-fit">
            See Product
          </Button>
        </div>
      </article>
    </section>
  );
}
