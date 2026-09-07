import { useState, type FormEvent } from "react";
import { supabase, type OrderInsert } from "../lib/supabase";
import { whatsappUrl } from "../data/site";

const initialState: OrderInsert = {
  customer_name: "",
  phone: "",
  delivery_method: "pickup",
  delivery_address: "",
  order_type: "menu_item",
  items_requested: "",
  occasion: "",
  needed_by: "",
  notes: "",
  payment_method: "cash",
};

export function OrderForm() {
  const [form, setForm] = useState<OrderInsert>(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function update<K extends keyof OrderInsert>(key: K, value: OrderInsert[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const payload: OrderInsert = {
      ...form,
      delivery_address: form.delivery_method === "delivery" ? form.delivery_address : null,
      occasion: form.occasion?.trim() ? form.occasion.trim() : null,
      needed_by: form.needed_by || null,
      notes: form.notes?.trim() ? form.notes.trim() : null,
    };

    const { error } = await supabase.from("orders").insert(payload);

    if (error) {
      setStatus("error");
      setErrorMessage("Something went wrong sending your order. Please try WhatsApp instead.");
      return;
    }

    setStatus("success");
    setForm(initialState);
  }

  if (status === "success") {
    return (
      <div className="order-form-success">
        <p className="eyebrow">Order received</p>
        <h3>Thank you — your request is in.</h3>
        <p>
          We'll confirm availability, final pricing, and delivery details with
          you directly. For the fastest reply, or to send a BenefitPay
          transfer screenshot, message us on WhatsApp.
        </p>
        <a
          className="button button-primary"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Confirm on WhatsApp <span aria-hidden="true">↗</span>
        </a>
        <button
          type="button"
          className="text-link order-form-reset"
          onClick={() => setStatus("idle")}
        >
          Submit another order
        </button>
      </div>
    );
  }

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <div className="order-form-grid">
        <label>
          <span>Your name *</span>
          <input
            type="text"
            required
            value={form.customer_name}
            onChange={(e) => update("customer_name", e.target.value)}
          />
        </label>

        <label>
          <span>Phone number *</span>
          <input
            type="tel"
            required
            placeholder="+973"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </label>

        <label>
          <span>What are you ordering? *</span>
          <select
            value={form.order_type}
            onChange={(e) => update("order_type", e.target.value as OrderInsert["order_type"])}
          >
            <option value="menu_item">Menu item</option>
            <option value="occasion_box">Occasion gift box / bouquet</option>
            <option value="custom">Something custom</option>
          </select>
        </label>

        <label>
          <span>Occasion (if any)</span>
          <input
            type="text"
            placeholder="Eid, Nikah, birthday..."
            value={form.occasion ?? ""}
            onChange={(e) => update("occasion", e.target.value)}
          />
        </label>

        <label className="order-form-span-2">
          <span>Items &amp; quantity *</span>
          <textarea
            required
            rows={3}
            placeholder="e.g. 12 chocolate chunk cookies, 1 gift box of bonbons"
            value={form.items_requested}
            onChange={(e) => update("items_requested", e.target.value)}
          />
        </label>

        <label>
          <span>Needed by</span>
          <input
            type="date"
            value={form.needed_by ?? ""}
            onChange={(e) => update("needed_by", e.target.value)}
          />
        </label>

        <label>
          <span>Pickup or delivery? *</span>
          <select
            value={form.delivery_method}
            onChange={(e) =>
              update("delivery_method", e.target.value as OrderInsert["delivery_method"])
            }
          >
            <option value="pickup">Pickup</option>
            <option value="delivery">Delivery (Bahrain only)</option>
          </select>
        </label>

        {form.delivery_method === "delivery" ? (
          <label className="order-form-span-2">
            <span>Delivery address / area *</span>
            <input
              type="text"
              required
              value={form.delivery_address ?? ""}
              onChange={(e) => update("delivery_address", e.target.value)}
            />
          </label>
        ) : null}

        <label>
          <span>Payment method *</span>
          <select
            value={form.payment_method}
            onChange={(e) =>
              update("payment_method", e.target.value as OrderInsert["payment_method"])
            }
          >
            <option value="cash">Cash</option>
            <option value="benefitpay">BenefitPay</option>
          </select>
        </label>

        <label className="order-form-span-2">
          <span>Anything else we should know?</span>
          <textarea
            rows={2}
            placeholder="Personalization, allergies, message on the box..."
            value={form.notes ?? ""}
            onChange={(e) => update("notes", e.target.value)}
          />
        </label>
      </div>

      <p className="order-form-note">
        This sends us your order request — pricing and final availability are
        confirmed personally before anything is prepared.{" "}
        {form.payment_method === "benefitpay"
          ? "For BenefitPay, we'll share the transfer details once your order is confirmed."
          : "Cash is collected on pickup or delivery."}
      </p>

      {status === "error" && errorMessage ? (
        <p className="order-form-error">{errorMessage}</p>
      ) : null}

      <button type="submit" className="button button-primary" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending..." : "Send order request"}
      </button>
    </form>
  );
}
