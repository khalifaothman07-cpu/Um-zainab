import { PageHero } from "../components/PageHero";
import { Photo } from "../components/Photo";
import { OrderCta } from "../components/WhatsAppButton";
import { menuCategories } from "../data/site";

export function Menu() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Our creations · Made fresh to order"
        title="Handcrafted favourites,"
        emphasized="one batch at a time."
        copy="Discover our collection of artisan chocolates and comforting desserts. Selections and custom options may vary, so message us to plan your order."
        variant="brownies"
        ctaLabel="Ask what's available"
      />

      <section className="section-shell">
        <div className="menu-note">
          <span aria-hidden="true">✦</span>
          <p>
            Every creation is made especially for your order. Ask us on
            WhatsApp about current availability, custom requests, and allergen
            information.
          </p>
        </div>
      </section>

      <section className="section-shell section-pad">
        <div className="menu-list">
          {menuCategories.map((category) => (
            <article
              className={`menu-category ${!category.image ? "no-photo" : ""}`}
              key={category.title}
            >
              {category.image ? (
                <div className="menu-category-image">
                  <Photo variant={category.variant} image={category.image} />
                </div>
              ) : null}
              <div className="menu-category-copy">
                <span className="menu-category-number">{category.number}</span>
                <h2>{category.title}</h2>
                <p className="menu-category-subtitle">{category.subtitle}</p>
                <p>{category.description}</p>
                <ul className="detail-list">
                  {category.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
                <OrderCta
                  location={`menu-${category.number}`}
                  label="Ask about this on WhatsApp"
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="order-banner">
        <div className="section-shell order-banner-inner">
          <div>
            <p className="eyebrow">Something tempting you?</p>
            <h2>Tell us what you're craving.</h2>
            <p>
              Share the creation you have in mind, your preferred date, and the
              quantity you need. We'll confirm what is available.
            </p>
          </div>
          <OrderCta location="menu-bottom" light />
        </div>
      </section>
    </main>
  );
}
