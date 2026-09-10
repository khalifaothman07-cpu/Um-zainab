import { supabase, type Product } from "./supabase";

const PRODUCT_SELECT = `
  id, category, name, slug, description, base_price_bd, unit_label, is_customizable, active, sort_order,
  product_option_groups (
    id, product_id, name, selection_type, min_selections, max_selections, sort_order,
    product_options ( id, group_id, label, price_delta_bd, active, sort_order )
  )
`;

export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("active", true)
    .order("sort_order", { ascending: true });

  if (error || !data) return [];

  return (data as unknown as Product[]).map(sortProductNesting);
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("slug", slug)
    .eq("active", true)
    .maybeSingle();

  if (error || !data) return null;

  return sortProductNesting(data as unknown as Product);
}

function sortProductNesting(product: Product): Product {
  const groups = [...(product.product_option_groups ?? [])]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((group) => ({
      ...group,
      product_options: [...(group.product_options ?? [])]
        .filter((o) => o.active)
        .sort((a, b) => a.sort_order - b.sort_order),
    }));

  return { ...product, product_option_groups: groups };
}
