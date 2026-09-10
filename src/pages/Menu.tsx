import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PageHero } from "../components/PageHero";
import { OrderCta } from "../components/WhatsAppButton";
import { Photo } from "../components/Photo";
import { fetchProducts } from "../lib/products";
import { formatBD, type Product } from "../lib/supabase";
import { productPhotosBySlug } from "../data/site";

export function Menu() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  return (
    <main id="main-content">
      <PageHero
        eyebrow="Our creations · Made fresh to order"
        title="Handcrafted favourites,"
        emphasized="one batch at a time."
        copy="Tap any item to customize it — choose your flavor, set your quantity, and build up your order. Selections and availability may vary, so message us if you're planning something special."
        variant="brownies"
        ctaLabel="Ask what's available"
      />

      <section className="section-shell">
        <div className="menu-note">
          <span aria-hidden="true">✦</span>
          <p>
            Every creation is made especially for your order. Tap a dish to see
            flavor options and pricing, or message us on WhatsApp for custom
            requests and allergen information.
          </p>
        </div>
      </section>

      <section className="section-shell section-pad">
        {loading ? (
          <p>Loading menu…</p>
        ) : (
          <div className="product-grid">
            {products.map((product) => {
              const image = productPhotosBySlug[product.slug];
              return (
                <Link className="product-card" to={`/menu/${product.slug}`} key={product.id}>
                  {image ? (
                    <Photo variant="bonbons" image={image} />
                  ) : (
                    <div className="product-card-noimage" aria-hidden="true" />
                  )}
                  <div className="product-card-copy">
                    <span className="product-card-category">{product.category}</span>
                    <h2>{product.name}</h2>
                    {product.description ? <p>{product.description}</p> : null}
                    <span className="product-card-price">
                      From {formatBD(product.base_price_bd)} / {product.unit_label}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      <section className="order-banner">
        <div className="section-shell order-banner-inner">
          <div>
            <p className="eyebrow">Something tempting you?</p>
            <h2>Tell us what you're craving.</h2>
            <p>
              Build your order above, or message us directly for occasion gifts
              and custom requests.
            </p>
          </div>
          <OrderCta location="menu-bottom" light />
        </div>
      </section>
    </main>
  );
}
