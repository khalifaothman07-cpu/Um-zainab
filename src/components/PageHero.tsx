import { OrderCta } from "./WhatsAppButton";
import { Photo } from "./Photo";
import type { PhotoAsset, PlaceholderVariant } from "../data/site";

export function PageHero({
  eyebrow,
  title,
  emphasized,
  copy,
  variant,
  ctaLabel,
  image,
}: {
  eyebrow: string;
  title: string;
  emphasized?: string;
  copy: string;
  variant: PlaceholderVariant;
  ctaLabel?: string;
  image?: PhotoAsset;
}) {
  return (
    <section className={`page-hero section-shell ${!image ? "no-photo" : ""}`}>
      <div className="page-hero-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1>
          {title}
          {emphasized ? <span>{emphasized}</span> : null}
        </h1>
        <p>{copy}</p>
        <OrderCta
          location={`page-hero-${variant}`}
          label={ctaLabel ?? "Order via WhatsApp"}
        />
      </div>
      <Photo variant={variant} image={image} priority />
    </section>
  );
}
