import { PageHero } from "../components/PageHero";
import { SectionHeading } from "../components/SectionHeading";
import { OrderCta } from "../components/WhatsAppButton";

const values = [
  {
    title: "Small-batch care",
    copy: "We work in considered quantities so every piece receives the attention, balance, and finishing touch it deserves.",
  },
  {
    title: "Premium ingredients",
    copy: "Quality ingredients are chosen for rich flavours, satisfying textures, and a beautifully indulgent finish.",
  },
  {
    title: "Freshly made to order",
    copy: "Each order is prepared especially for you, bringing more freshness and intention to every box and dessert.",
  },
];

export function About() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Our story · Home-based in Bahrain"
        title="From our home kitchen,"
        emphasized="with love."
        copy="Um Zainab Confectionery is a home-based artisan confectionery creating small batches of chocolates and desserts for moments worth savouring."
        variant="kitchen"
      />

      <section className="section-shell section-pad about-story">
        <div className="about-story-heading">
          <p className="eyebrow">The heart behind every order</p>
          <h2>Care you can see. Love you can taste.</h2>
          <span className="script-note">made just for you</span>
        </div>
        <div className="about-story-copy">
          <p>
            The heart of our work is simple: make every order with the same
            care we would give a gift for someone we love. Our chocolates and
            desserts are prepared in small batches, made fresh to order, and
            thoughtfully finished by hand.
          </p>
          <p>
            Working from home lets us stay close to every detail—from flavour
            and texture to the final presentation. There is no production line
            here, only an attentive process that gives each order the time it
            needs.
          </p>
          <p>
            We choose premium ingredients and bring warmth, patience, and a
            little joy to every batch. The result is something personal,
            beautiful, and made to be remembered.
          </p>
        </div>
      </section>

      <section className="values-section section-pad">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Our promise"
            title="Thoughtful from the first stir to the final ribbon"
            copy="Good things take care. These are the simple principles behind everything we make."
          />
          <div className="values-grid">
            {values.map((value, index) => (
              <article className="value-card" key={value.title}>
                <span className="value-card-number">0{index + 1}</span>
                <h3>{value.title}</h3>
                <p>{value.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell section-pad home-business-note no-photo">
        <div className="home-business-note-copy">
          <p className="eyebrow">A personal way to order</p>
          <h2>Home-based, made-to-order, and close to every detail.</h2>
          <p>
            We don't have a physical storefront — but you can order directly
            through the site, or reach us on WhatsApp or Instagram DM if you'd
            rather talk it through first.
          </p>
          <p>
            Whether it is a quiet treat or an important celebration, your order
            is created with warmth and intention, then delivered within Bahrain.
          </p>
        </div>
      </section>

      <section className="order-banner">
        <div className="section-shell order-banner-inner">
          <div>
            <p className="eyebrow">Handcrafted especially for you</p>
            <h2>Let's make something lovely.</h2>
            <p>
              Message us to ask about current availability, flavours, and custom
              options for your order.
            </p>
          </div>
          <OrderCta location="about-bottom" light />
        </div>
      </section>
    </main>
  );
}
