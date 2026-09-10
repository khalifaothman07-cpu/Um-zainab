import { Link, useNavigate } from "react-router-dom";
import { useCart, cartLineUnitPrice, cartLineTotal } from "../lib/cart";
import { formatBD, MINIMUM_ORDER_BD, FREE_DELIVERY_THRESHOLD_BD, DELIVERY_FEE_BD } from "../lib/supabase";

export function CartPage() {
  const { lines, removeLine, updateQuantity, subtotal, meetsMinimum, amountToMinimum } = useCart();
  const navigate = useNavigate();

  const estimatedDeliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD_BD ? 0 : DELIVERY_FEE_BD;

  if (lines.length === 0) {
    return (
      <main id="main-content" className="section-shell section-pad cart-page cart-empty">
        <p className="eyebrow">Your cart</p>
        <h1>Your cart is empty.</h1>
        <p>Browse the menu and add something delicious.</p>
        <Link className="button button-primary" to="/menu">
          Explore the menu
        </Link>
      </main>
    );
  }

  return (
    <main id="main-content" className="section-shell section-pad cart-page">
      <p className="eyebrow">Your cart</p>
      <h1>Review your order</h1>

      <div className="cart-lines">
        {lines.map((line) => (
          <article className="cart-line" key={line.lineId}>
            <div className="cart-line-info">
              <h3>{line.productName}</h3>
              {line.selectedOptions.length > 0 ? (
                <p className="cart-line-options">
                  {line.selectedOptions.map((o) => o.label).join(" · ")}
                </p>
              ) : null}
              <p className="cart-line-unit">
                {formatBD(cartLineUnitPrice(line))} per {line.unitLabel}
              </p>
            </div>
            <div className="cart-line-controls">
              <div className="quantity-stepper">
                <button
                  type="button"
                  onClick={() => updateQuantity(line.lineId, line.quantity - 1)}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span>{line.quantity}</span>
                <button
                  type="button"
                  onClick={() => updateQuantity(line.lineId, line.quantity + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <strong>{formatBD(cartLineTotal(line))}</strong>
              <button type="button" className="cart-line-remove" onClick={() => removeLine(line.lineId)}>
                Remove
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-summary-row">
          <span>Subtotal</span>
          <strong>{formatBD(subtotal)}</strong>
        </div>
        <div className="cart-summary-row">
          <span>Estimated delivery</span>
          <strong>{estimatedDeliveryFee === 0 ? "Free" : formatBD(estimatedDeliveryFee)}</strong>
        </div>
        <p className="cart-summary-note">
          {subtotal >= FREE_DELIVERY_THRESHOLD_BD
            ? "You've qualified for free delivery."
            : `Add ${formatBD(FREE_DELIVERY_THRESHOLD_BD - subtotal)} more for free delivery.`}{" "}
          Pickup is always free. Final delivery fee is confirmed at checkout based on pickup/delivery choice.
        </p>

        {!meetsMinimum ? (
          <p className="cart-minimum-warning">
            Minimum order is {formatBD(MINIMUM_ORDER_BD)} — add {formatBD(amountToMinimum)} more to check out.
          </p>
        ) : null}

        <button
          type="button"
          className="button button-primary cart-checkout-button"
          disabled={!meetsMinimum}
          onClick={() => navigate("/contact")}
        >
          Continue to checkout
        </button>
        <Link className="text-link" to="/menu">
          ← Keep browsing the menu
        </Link>
      </div>
    </main>
  );
}
