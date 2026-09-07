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
};
