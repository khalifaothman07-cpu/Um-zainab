import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pqeapncozamqvxyqtdca.supabase.co";
const supabasePublishableKey = "sb_publishable_bjhw0C_1AQymjmfI4jJpXQ_v4DsF11b";

export const supabase = createClient(supabaseUrl, supabasePublishableKey);

export type OrderInsert = {
  customer_name: string;
  phone: string;
  delivery_method: "pickup" | "delivery";
  delivery_address?: string | null;
  order_type: "menu_item" | "occasion_box" | "custom";
  items_requested: string;
  occasion?: string | null;
  needed_by?: string | null;
  notes?: string | null;
  payment_method: "cash" | "benefitpay";
};

export type Order = OrderInsert & {
  id: string;
  created_at: string;
  updated_at: string;
  quoted_amount_bd: number | null;
  payment_status: "pending" | "confirmed";
  order_status: "new" | "confirmed" | "preparing" | "ready" | "delivered" | "cancelled";
  admin_notes: string | null;
  subtotal_bd: number | null;
  delivery_fee_bd: number;
  total_bd: number | null;
  meets_minimum: boolean;
};

export type ProductOption = {
  id: string;
  group_id: string;
  label: string;
  price_delta_bd: number;
  active: boolean;
  sort_order: number;
};

export type ProductOptionGroup = {
  id: string;
  product_id: string;
  name: string;
  selection_type: "single" | "multiple";
  min_selections: number;
  max_selections: number;
  sort_order: number;
  product_options: ProductOption[];
};

export type Product = {
  id: string;
  category: string;
  name: string;
  slug: string;
  description: string | null;
  base_price_bd: number;
  unit_label: string;
  is_customizable: boolean;
  active: boolean;
  sort_order: number;
  product_option_groups: ProductOptionGroup[];
};

export type OrderItemInsert = {
  order_id: string;
  product_id: string | null;
  product_name: string;
  quantity: number;
  unit_price_bd: number;
  line_total_bd: number;
  selected_options: { group: string; label: string; price_delta_bd: number }[];
  notes?: string | null;
};

export const MINIMUM_ORDER_BD = 6;
export const FREE_DELIVERY_THRESHOLD_BD = 15;
export const DELIVERY_FEE_BD = 2;

export function formatBD(amount: number): string {
  return `${amount.toFixed(3)} BD`;
}
