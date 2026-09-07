import { Link } from "react-router-dom";
import { OrderCta } from "../components/WhatsAppButton";
import { Photo } from "../components/Photo";
import { SectionHeading } from "../components/SectionHeading";
import { photoAssets, productHighlights } from "../data/site";

export function Home() {
  return (
    <main id="main-content">
      <section className="hero section-shell">
        <div className="hero-copy">
          <p className="eyebrow">Handmade in Bahrain · Since the first batch</p>
          <h1>
            Little moments,
            <span>made delicious.</span>
          </h1>
          <p className="hero-lede">
            Small-batch chocolates and desserts, thoughtfully handcrafted at
            home with premium ingredients—and always made with love.
          </p>
          <div className="button-row">
            <OrderCta location="home-hero" />
            <Link className="text-link" to="/menu">
              Explore our creations <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <ul className="hero-notes" aria-label="What makes us special">
            <li>Made to order</li>
            <li>Small batch</li>
            <li>Bahrain delivery</li>
          </ul>
        </div>
        <div className="hero-visual">
          <Photo variant="brownies" image={photoAssets.brownieGiftBoxes} priority />
          <div className="love-note" aria-hidden="true">
            <span>Handcrafted</span>
            with love
          </div>
        </div>
      </section>

      <section className="intro-ribbon" aria-label="Our approach">
        <p>
          <span aria-hidden="true">✦</span> From our home kitchen to your happy
          moments <span aria-hidden="true">✦</span>
        </p>
      </section>

      <section className="section-shell section-pad">
        <SectionHeading
          eyebrow="The favourites"
          title="A little something for every craving"
          copy="From delicate bonbons to deeply chocolatey bakes, every order is prepared especially for you."
          action={{ href: "/menu", label: "View the full menu" }}
        />
        <div className="product-preview-grid">
          {productHighlights.map((product, index) => (
            <article className="product-preview-card" key={product.title}>
              <Photo variant={product.variant} index={index + 1} image={product.image} />
              <div className="product-preview-copy">
                <p className="card-kicker">{product.kicker}</p>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="story-band">
        <div className="section-shell story-grid no-photo">
          <div className="story-copy">
            <p className="eyebrow">Made slowly. Shared joyfully.</p>
            <h2>A home kitchen with a big love for the little details.</h2>
            <p>
              Every piece is made in small batches, only after you order. That
              means more care in every swirl, sprinkle, layer, and finishing
              touch—and something that feels genuinely personal when it arrives.
            </p>
            <Link className="text-link" to="/about">
              Read our story <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section-shell section-pad occasions-preview">
        <div className="occasion-copy">
          <p className="eyebrow">Gifting, your way</p>
          <h2>For celebrations that deserve a sweeter touch.</h2>
          <p>
            Curated gift boxes, chocolate bouquets, and personalized bar
            messages for Eid, Nikah and engagement celebrations, graduations,
            birthdays, and all the lovely moments in between.
          </p>
          <div className="button-row">
            <Link className="button button-secondary" to="/occasions">
              Discover occasion gifts
            </Link>
          </div>
        </div>
        <div className="occasion-stack single-photo" aria-label="Gift photography">
          <Photo variant="giftbox" image={photoAssets.nikahGift} />
        </div>
      </section>

      <section className="order-banner">
        <div className="section-shell order-banner-inner">
          <div>
            <p className="eyebrow">Freshly made for you</p>
            <h2>Ready to make someone's day?</h2>
            <p>
              Tell us what you're celebrating—or simply what you're craving—and
              we'll help you choose.
            </p>
          </div>
          <OrderCta location="home-bottom" light />
        </div>
      </section>
    </main>
  );
}
