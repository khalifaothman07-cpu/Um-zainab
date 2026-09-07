import { whatsappUrl } from "../data/site";

export function OrderCta({
  light = false,
  location,
  label = "Order via WhatsApp",
}: {
  light?: boolean;
  location: string;
  label?: string;
}) {
  return (
    <a
      className={`button ${light ? "button-light" : "button-primary"}`}
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-cta-location={location}
    >
      {label} <span aria-hidden="true">↗</span>
    </a>
  );
}

export function MobileOrderBar() {
  return (
    <div className="mobile-order-bar">
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        <span className="mobile-order-icon" aria-hidden="true">
          ↗
        </span>
        <span>
          <small>Made fresh in Bahrain</small>
          <strong>Order via WhatsApp</strong>
        </span>
      </a>
    </div>
  );
}
