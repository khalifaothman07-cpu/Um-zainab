import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart, cartLineUnitPrice, cartLineTotal } from "../lib/cart";
import { supabase, formatBD, FREE_DELIVERY_THRESHOLD_BD, DELIVERY_FEE_BD, MINIMUM_ORDER_BD } from "../lib/supabase";
import { whatsappUrl } from "../data/site";
import { generateId } from "../lib/id";

type CustomerDetails = {
  customer_name: string;
  phone: string;
  delivery_method: "pickup" | "delivery";
  delivery_address: string;
  occasion: string;
  needed_by: string;
  notes: string;
  payment_method: "cash" | "benefitpay";
};

const initialDetails: CustomerDetails = {
  customer_name: "",
  phone: "",
  delivery_method: "pickup",
  delivery_address: "",
  occasion: "",
  needed_by: "",
  notes: "",
  payment_method: "cash",
};

export function CartCheckoutForm() {
  const { lines, subtotal, clearCart, meetsMinimum } = useCart();
  const navigate = useNavigate();
  const [details, setDetails] = useState<CustomerDetails>(initialDetails);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [whatsappLink, setWhatsappLink] = useState<string | null>(null);

  function update<K extends keyof CustomerDetails>(key: K, value: CustomerDetails[K]) {
    setDetails((current) => ({ ...current, [key]: value }));
  }

  const deliveryFee = details.delivery_method === "pickup"
    ? 0
    : subtotal >= FREE_DELIVERY_THRESHOLD_BD
      ? 0
      : DELIVERY_FEE_BD;
  const total = subtotal + deliveryFee;

  function buildWhatsAppMessage(): string {
    const itemLines = lines.map((line) => {
      const optionsText = line.selectedOptions.length
        ? ` (${line.selectedOptions.map((o) => o.label).join(", ")})`
        : "";
      return `• ${line.quantity}x ${line.productName}${optionsText} — ${formatBD(cartLineTotal(line))}`;
    });

    const parts = [
      "New order from the website:",
      "",
      ...itemLines,
      "",
      `Subtotal: ${formatBD(subtotal)}`,
      `Delivery: ${details.delivery_method === "pickup" ? "Pickup (free)" : deliveryFee === 0 ? "Free delivery" : formatBD(deliveryFee)}`,
      `Total: ${formatBD(total)}`,
      "",
      `Name: ${details.customer_name}`,
      `Phone: ${details.phone}`,
      `${details.delivery_method === "delivery" ? `Delivery address: ${details.delivery_address}` : "Pickup"}`,
      details.occasion ? `Occasion: ${details.occasion}` : null,
      details.needed_by ? `Needed by: ${details.needed_by}` : null,
      `Payment: ${details.payment_method === "cash" ? "Cash" : "BenefitPay"}`,
      details.notes ? `Notes: ${details.notes}` : null,
    ].filter((line): line is string => line !== null);

    return parts.join("\n");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!meetsMinimum) return;

    setStatus("submitting");
    setErrorMessage(null);

    try {
      const orderId = generateId();

      const { error: orderError } = await supabase.from("orders").insert({
        id: orderId,
        customer_name: details.customer_name,
        phone: details.phone,
        delivery_method: details.delivery_method,
        delivery_address: details.delivery_method === "delivery" ? details.delivery_address : null,
        order_type: "menu_item",
        items_requested: lines.map((l) => `${l.quantity}x ${l.productName}`).join(", "),
        occasion: details.occasion || null,
        needed_by: details.needed_by || null,
        notes: details.notes || null,
        payment_method: details.payment_method,
        subtotal_bd: subtotal,
      });

      if (orderError) {
        setStatus("error");
        setErrorMessage(`Order didn't save: ${orderError.message}`);
        return;
      }

      const orderItemsPayload = lines.map((line) => ({
        order_id: orderId,
        product_id: line.productId,
        product_name: line.productName,
        quantity: line.quantity,
        unit_price_bd: cartLineUnitPrice(line),
        line_total_bd: cartLineTotal(line),
        selected_options: line.selectedOptions,
      }));

      const { error: itemsError } = await supabase.from("order_items").insert(orderItemsPayload);

      if (itemsError) {
        setStatus("error");
        setErrorMessage(`Order saved but items didn't: ${itemsError.message}`);
        return;
      }

      setWhatsappLink(`${whatsappUrl}?text=${encodeURIComponent(buildWhatsAppMessage())}`);
      setStatus("success");
      clearCart();
    } catch (err) {
      setStatus("error");
      setErrorMessage(`Unexpected error: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  if (status === "success") {
    return (
      <div className="order-form-success">
        <p className="eyebrow">Order received</p>
        <h3>Thank you — your order is in.</h3>
        <p>
          We've recorded your order. For the fastest confirmation — and to send
          a BenefitPay screenshot if that's your payment method — tap below to
          send it on WhatsApp too.
        </p>
        {whatsappLink ? (
          <a className="button button-primary" href={whatsappLink} target="_blank" rel="noopener noreferrer">
            Send order on WhatsApp <span aria-hidden="true">↗</span>
          </a>
        ) : null}
        <button type="button" className="text-link order-form-reset" onClick={() => navigate("/menu")}>
          Order something else
        </button>
      </div>
    );
  }

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <div className="cart-checkout-recap">
        <h3>Your order</h3>
        {lines.map((line) => (
          <div className="cart-checkout-recap-line" key={line.lineId}>
            <span>
              {line.quantity}x {line.productName}
              {line.selectedOptions.length ? ` (${line.selectedOptions.map((o) => o.label).join(", ")})` : ""}
            </span>
            <span>{formatBD(cartLineTotal(line))}</span>
          </div>
        ))}
        <div className="cart-checkout-recap-line cart-checkout-recap-total">
          <span>Subtotal</span>
          <span>{formatBD(subtotal)}</span>
        </div>
        <div className="cart-checkout-recap-line">
          <span>Delivery ({details.delivery_method})</span>
          <span>{deliveryFee === 0 ? "Free" : formatBD(deliveryFee)}</span>
        </div>
        <div className="cart-checkout-recap-line cart-checkout-recap-total">
          <span>Total</span>
          <span>{formatBD(total)}</span>
        </div>
      </div>

      <div className="order-form-grid">
        <label>
          <span>Your name *</span>
          <input
            type="text"
            required
            value={details.customer_name}
            onChange={(e) => update("customer_name", e.target.value)}
          />
        </label>

        <label>
          <span>Phone number *</span>
          <input
            type="tel"
            required
            placeholder="+973"
            value={details.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </label>

        <label>
          <span>Pickup or delivery? *</span>
          <select
            value={details.delivery_method}
            onChange={(e) => update("delivery_method", e.target.value as CustomerDetails["delivery_method"])}
          >
            <option value="pickup">Pickup (free)</option>
            <option value="delivery">
              Delivery ({subtotal >= FREE_DELIVERY_THRESHOLD_BD ? "free" : formatBD(DELIVERY_FEE_BD)})
            </option>
          </select>
        </label>

        <label>
          <span>Payment method *</span>
          <select
            value={details.payment_method}
            onChange={(e) => update("payment_method", e.target.value as CustomerDetails["payment_method"])}
          >
            <option value="cash">Cash</option>
            <option value="benefitpay">BenefitPay</option>
          </select>
        </label>

        {details.delivery_method === "delivery" ? (
          <label className="order-form-span-2">
            <span>Delivery address / area *</span>
            <input
              type="text"
              required
              value={details.delivery_address}
              onChange={(e) => update("delivery_address", e.target.value)}
            />
          </label>
        ) : null}

        <label>
          <span>Occasion (if any)</span>
          <input
            type="text"
            placeholder="Eid, Nikah, birthday..."
            value={details.occasion}
            onChange={(e) => update("occasion", e.target.value)}
          />
        </label>

        <label>
          <span>Needed by</span>
          <input type="date" value={details.needed_by} onChange={(e) => update("needed_by", e.target.value)} />
        </label>

        <label className="order-form-span-2">
          <span>Anything else we should know?</span>
          <textarea
            rows={2}
            value={details.notes}
            onChange={(e) => update("notes", e.target.value)}
          />
        </label>
      </div>

      {!meetsMinimum ? (
        <p className="order-form-error">
          Minimum order is {formatBD(MINIMUM_ORDER_BD)} — go back to your cart to add more.
        </p>
      ) : null}

      {status === "error" && errorMessage ? <p className="order-form-error">{errorMessage}</p> : null}

      <p className="order-form-consent">
        By placing this order you agree to our{" "}
        <Link to="/policies">privacy, terms &amp; refund policy</Link>. We
        only use your details to prepare and deliver your order.
      </p>

      <button type="submit" className="button button-primary" disabled={status === "submitting" || !meetsMinimum}>
        {status === "submitting" ? "Sending..." : `Place order — ${formatBD(total)}`}
      </button>
    </form>
  );
}
