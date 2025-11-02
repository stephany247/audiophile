// utils/recommendProducts.ts
export type Product = {
  id: string | number;
  name: string;
  category: string;
  images?: string[];
  description?: string;
  price?: number;
  slug?: string;
};

export function recommendProducts(
  currentId: string | number,
  currentCategory: string,
  products: Product[],
  limit = 3
): Product[] {
  const idStr = String(currentId);

  // first: same-category (exclude current)
  const same = products.filter(
    (p) => String(p.id) !== idStr && p.category === currentCategory
  );

  // second: other categories (exclude current)
  const others = products.filter(
    (p) => String(p.id) !== idStr && p.category !== currentCategory
  );

  // take up to `limit` from same, then fill with others
  const takeSame = same.slice(0, limit);
  const remaining = Math.max(0, limit - takeSame.length);
  const takeOthers = others.slice(0, remaining);

  return [...takeSame, ...takeOthers].slice(0, limit);
}
