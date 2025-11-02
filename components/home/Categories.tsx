import CategoryCard from "../layout/CategoryCard";

const categories = [
  {
    title: "Headphones",
    href: "/headphones",
    imgSrc: "/images/headphone.png",
  },
  {
    title: "Speakers",
    href: "/speakers",
    imgSrc: "/images/speaker.png",
  },
  {
    title: "Earphones",
    href: "/earphones",
    imgSrc: "/images/earphone.png",
  },
];

export default function Categories() {
  return (
    <section className="container px-6 py-12 grid sm:grid-cols-3 gap-12 pb-8 pt-24 sm:pb-16">
      {categories.map((cat) => (
        <CategoryCard
          key={cat.title}
          title={cat.title}
          href={cat.href}
          imgSrc={cat.imgSrc}
        />
      ))}
    </section>
  );
}
