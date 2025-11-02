import Image from "next/image";
import Button from "@/components/ui/Button";

export default function FeaturedGrid() {
  return (
    <section className="container px-6 py-12 grid lg:grid-cols-3 items-stretch text-center gap-8 h-full">
      <article className="col-span-1 bg-primary text-white rounded p-8 py-16 h-150 w-full flex flex-col justify-between items-center gap-6 bg-[url(/images/circle-illustration.png)] bg-contain bg-top bg-no-repeat">
        {/* <div className="text-overline uppercase">ZX9 Speaker</div> */}
        <Image
          src="/images/speaker.png"
          alt="ZX9 Speaker"
          width={120}
          height={120}
          className="relative z-10 object-contain w-40 h-50"
        />
        <h2 className="text-balance">ZX9 Speaker</h2>
        <p className="max-w-sm font-medium">
          Upgrade to premium speakers that are phenomenally built to deliver
          truly remarkable sound.
        </p>
        <Button variant="primary" className="bg-black w-fit">
          See Product
        </Button>
      </article>

      <article className="col-span-1 bg-surface rounded p-6 flex flex-col justify-center gap-y-8 h-80 w-full bg-[url(/images/zx7-speaker.png)] bg-cover bg-left bg-no-repeat">
        <h3 className="font-bold uppercase text-left">ZX7 Speaker</h3>
        <Button variant="secondary" className="w-fit">
          See Product
        </Button>
      </article>

      {/* <article className="col-span-1 grid grid-rows-2 items-stretch justify-center w-full">
        <Image
          src="/images/yx1-earphone.png"
          alt="ZX9 Speaker"
          width={120}
          height={120}
          className="relative z-10 w-full h-50 rounded object-cover object-center"
        />
        <div className=" bg-surface rounded w-full h-full flex flex-col justify-center space-y-4 p-6">
          <h3 className="font-bold uppercase text-left">YX1 Earphones</h3>
          <Button variant="secondary" className="w-fit">See Product</Button>
        </div>
      </article> */}
      <article className="grid grid-rows-2 h-full w-full gap-8">
        <div className="relative w-full pb-[56%] rounded-t overflow-hidden">
          <Image
            src="/images/yx1-earphone.png"
            alt="YX1 Earphones"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* CONTENT */}
        <div className="bg-surface rounded-b w-full h-full flex flex-col justify-center space-y-4 p-6">
          <h3 className="font-bold uppercase text-left">YX1 Earphones</h3>
          <Button variant="secondary" className="w-fit">
            See Product
          </Button>
        </div>
      </article>
    </section>
  );
}
