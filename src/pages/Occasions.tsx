import { PageHero } from "../components/PageHero";
import { SectionHeading } from "../components/SectionHeading";
import { OrderCta } from "../components/WhatsAppButton";
import { occasions, photoAssets } from "../data/site";

const requestDetails = [
  ["Your occasion and preferred date", "Tell us what you are celebrating and when you need your order."],
  ["Gift style and quantity", "Share whether you have a box, bouquet, or product selection in mind."],
  ["Theme and personal message", "Include any colour direction and the exact short message you would like."],
  ["Bahrain delivery area", "Let us know the area so delivery details can be confirmed with your order."],
] as const;

export function Occasions() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Gifts & celebrations · Made for the moment"
        title="Sweet details for"
        emphasized="meaningful moments."
        copy="Mark the occasions you will remember with handcrafted chocolate gifts created especially for the people you love."
        variant="giftbox"
        image={photoAssets.nikahGift}
        ctaLabel="Plan a gift on WhatsApp"
      />

      <section className="gift-formats section-pad">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Choose your gift style"
            title="Beautiful to give. Even better to open."
            copy="Each arrangement is made to order and thoughtfully presented for a warm, memorable reveal."
          />
          <div className="gift-formats-grid">
            <article className="gift-format-card no-photo">
              <div className="gift-format-copy">
                <p className="card-kicker">Curated with care</p>
                <h3>Custom Gift Boxes</h3>
                <p>
                  Carefully arranged assortments of handcrafted chocolates,
                  presented with an elegant, gift-ready finish.
                </p>
              </div>
            </article>
            <article className="gift-format-card no-photo">
              <div className="gift-format-copy">
                <p className="card-kicker">A joyful surprise</p>
                <h3>Chocolate Bouquets</h3>
                <p>
                  A playful, generous arrangement of chocolate treats, styled
                  to make the moment feel especially memorable.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section-shell section-pad">
        <SectionHeading
          eyebrow="Made to celebrate"
          title="A sweeter way to mark the day"
          copy="Thoughtful gifting for family traditions, beautiful beginnings, proud achievements, and joyful birthdays."
        />
        <div className="occasion-cards">
          {occasions.map((occasion) => (
            <article className="occasion-card" key={occasion.title}>
              <div className="occasion-card-top">
                <span>{occasion.number}</span>
                <span aria-hidden="true">✦</span>
              </div>
              <h3>{occasion.title}</h3>
              <p>{occasion.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="personalization-band section-pad">
        <div className="section-shell personalization-grid no-photo">
          <div className="personalization-copy">
            <p className="eyebrow">Say it in chocolate</p>
            <h2>A message made just for them.</h2>
            <p>
              Add a personal note to selected chocolate bars—from a name or date
              to congratulations and heartfelt wishes. Share your idea, and
              we'll confirm the available options.
            </p>
            <div className="message-examples" aria-label="Message examples">
              <span>Congratulations</span>
              <span>Eid Mubarak</span>
              <span>With love</span>
              <span>Your special date</span>
            </div>
            <OrderCta location="occasions-personalization" label="Share your message" />
          </div>
        </div>
      </section>

      <section className="section-shell section-pad request-guide">
        <div>
          <p className="eyebrow">Planning your request</p>
          <h2>A few details help us make it personal.</h2>
          <p>
            Message us early to discuss your date. Designs, flavours,
            presentation styles, and personalized details are subject to
            availability.
          </p>
        </div>
        <ol className="request-list">
          {requestDetails.map(([title, copy]) => (
            <li key={title}>
              <div>
                <strong>{title}</strong>
                <p>{copy}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="order-banner">
        <div className="section-shell order-banner-inner">
          <div>
            <p className="eyebrow">Planning a special moment?</p>
            <h2>Let's shape the sweet details.</h2>
            <p>
              Send us your occasion, preferred date, quantity, and
              personalization idea. We'll help you take it from there.
            </p>
          </div>
          <OrderCta location="occasions-bottom" label="Plan your gift on WhatsApp" light />
        </div>
      </section>
    </main>
  );
}
