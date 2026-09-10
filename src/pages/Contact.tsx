import { useState } from "react";
import { OrderCta } from "../components/WhatsAppButton";
import { OrderForm } from "../components/OrderForm";
import { CartCheckoutForm } from "../components/CartCheckoutForm";
import { useCart } from "../lib/cart";
import { instagramUrl, whatsappUrl } from "../data/site";

export function Contact() {
  const { lines } = useCart();
  const [showCustomForm, setShowCustomForm] = useState(false);
  const hasCartItems = lines.length > 0;

  return (
    <main id="main-content">
      <section className="contact-hero section-shell">
        <p className="eyebrow">Contact & orders · Bahrain</p>
        <h1>Let's create something sweet.</h1>
        <p>
          {hasCartItems
            ? "Confirm your order below."
            : "Build your order from the menu, or message us directly on WhatsApp or Instagram if you'd rather talk it through first."}{" "}
          Payment is by cash or BenefitPay, confirmed once your order details are finalized.
        </p>
        <OrderCta location="contact-hero" />
      </section>

      <section className="section-shell contact-methods">
        <a
          className="contact-card primary"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="contact-icon" aria-hidden="true">↗</span>
          <div>
            <h2>Order via WhatsApp</h2>
            <p>+973 3946 8111 · The quickest way to arrange your order</p>
          </div>
          <span className="contact-card-link">
            Start your message <span aria-hidden="true">↗</span>
          </span>
        </a>
        <a
          className="contact-card"
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="contact-icon" aria-hidden="true">◎</span>
          <div>
            <h2>Instagram DM</h2>
            <p>@umzainab_confectionery · Follow along and send us a message</p>
          </div>
          <span className="contact-card-link">
            Visit Instagram <span aria-hidden="true">↗</span>
          </span>
        </a>
      </section>

      <section className="section-shell section-pad order-form-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{hasCartItems ? "Confirm your order" : "Place your order"}</p>
            <h2>
              {hasCartItems
                ? "Almost there — just a few details."
                : "Tell us what you'd like — we'll confirm the rest."}
            </h2>
          </div>
          <div className="section-heading-side">
            <p>
              {hasCartItems
                ? "This comes straight to us and to your cart's contact on WhatsApp."
                : "Fill this in and it comes straight to us. We'll follow up to confirm availability, pricing, and payment."}
            </p>
          </div>
        </div>

        {hasCartItems && !showCustomForm ? (
          <>
            <CartCheckoutForm />
            <p className="custom-order-toggle">
              Ordering something custom instead?{" "}
              <button type="button" className="text-link" onClick={() => setShowCustomForm(true)}>
                Use the free-text order form
              </button>
            </p>
          </>
        ) : (
          <>
            <OrderForm />
            {hasCartItems ? (
              <p className="custom-order-toggle">
                <button type="button" className="text-link" onClick={() => setShowCustomForm(false)}>
                  ← Back to your cart order
                </button>
              </p>
            ) : null}
          </>
        )}
      </section>

      <section className="section-shell section-pad">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Good to know</p>
            <h2>Made personally, ordered simply.</h2>
          </div>
          <div className="section-heading-side">
            <p>
              Our home-business model keeps the experience personal from your
              first message to your freshly made order.
            </p>
          </div>
        </div>
        <div className="essentials-grid">
          <article className="essential-card">
            <span>01</span>
            <h3>Made fresh to order</h3>
            <p>
              Every item is prepared especially for your order. Advance notice
              is recommended so we can confirm your preferred date.
            </p>
          </article>
          <article className="essential-card">
            <span>02</span>
            <h3>Bahrain delivery only</h3>
            <p>
              Delivery is available within Bahrain only, 2 BD under 15 BD
              order value, free above that. Pickup is always free.
            </p>
          </article>
          <article className="essential-card">
            <span>03</span>
            <h3>Cash or BenefitPay</h3>
            <p>
              We keep payment simple — settle in cash on pickup/delivery, or
              by BenefitPay transfer once your order is confirmed.
            </p>
          </article>
        </div>
      </section>

      <section className="order-banner">
        <div className="section-shell order-banner-inner">
          <div>
            <p className="eyebrow">Ready when you are</p>
            <h2>Tell us what would make your moment sweeter.</h2>
            <p>
              Send your order above, or message us and we'll reply with
              availability.
            </p>
          </div>
          <OrderCta location="contact-bottom" light />
        </div>
      </section>
    </main>
  );
}
