export function Policies() {
  return (
    <main id="main-content" className="section-shell section-pad policies-page">
      <p className="eyebrow">Policies</p>
      <h1>Privacy, terms &amp; refunds</h1>
      <p className="policies-intro">
        Um Zainab Confectionery is a home-based business operating in
        Bahrain, registered under CR 750909340. This page explains how we
        handle your information, our order terms, and our approach to
        cancellations and refunds.
      </p>

      <section className="policy-section">
        <h2>Business details</h2>
        <ul>
          <li>Um Zainab Confectionery — home-based confectionery business</li>
          <li>Commercial Registration (CR): 750909340</li>
          <li>Operating in the Kingdom of Bahrain</li>
        </ul>
      </section>

      <section className="policy-section">
        <h2>Privacy &amp; how we use your data</h2>
        <p>
          When you place an order, we collect your name, phone number,
          delivery address (if applicable), payment method preference, and
          any notes or occasion details you provide. This is collected
          because it's necessary to prepare, confirm, and deliver your
          order — we don't collect anything beyond what's needed for that.
        </p>
        <p>
          Order data is stored with Supabase on servers in the EU. Access
          to the order dashboard is restricted to Um Zainab Confectionery
          and protected by a login. Connections to this site are encrypted
          (HTTPS). We do not sell, rent, or share your information with
          third parties, other than what's strictly needed to fulfil your
          order — for example, confirming a BenefitPay transfer.
        </p>
        <p>
          Your cart contents are remembered on your own device using your
          browser's local storage, not tracking cookies — this data never
          leaves your device unless you complete a checkout. We don't
          currently use third-party analytics or advertising trackers on
          this site.
        </p>
        <p>
          In line with Bahrain's Personal Data Protection Law, you have the
          right to ask us what information we hold about you, to have
          inaccurate information corrected, and to request that your data
          be deleted once it's no longer needed for order records. To do
          any of this, message us on WhatsApp or Instagram — contact
          details are on our Contact page.
        </p>
      </section>

      <section className="policy-section">
        <h2>Order terms</h2>
        <ul>
          <li>Delivery is available within Bahrain only.</li>
          <li>Minimum order value is 6 BD.</li>
          <li>
            Delivery is 2 BD for orders under 15 BD, and free for orders 15
            BD and above. Pickup is always free.
          </li>
          <li>
            All items are made fresh to order in a home kitchen and may
            contain nuts, dairy, gluten, and eggs. Please let us know about
            any allergies before ordering — we cannot guarantee an
            allergen-free environment.
          </li>
          <li>Payment is by cash or BenefitPay, confirmed via WhatsApp.</li>
          <li>
            Prices are listed in Bahraini Dinar and may change without
            notice. The price confirmed with you at order time is what
            applies to that order.
          </li>
        </ul>
      </section>

      <section className="policy-section">
        <h2>Cancellations &amp; refunds</h2>
        <p>
          Because every item is made fresh to order, we ask for advance
          notice to cancel:
        </p>
        <ul>
          <li>
            Cancel or change your order <strong>at least 3 days before</strong>{" "}
            your confirmed delivery or pickup date for a full refund.
          </li>
          <li>
            Cancellations made within 3 days of the confirmed date may not
            be eligible for a refund, as ingredients and preparation are
            often already underway by that point.
          </li>
          <li>
            If we're unable to fulfil your order for any reason on our end,
            you'll receive a full refund regardless of timing.
          </li>
        </ul>
      </section>

      <section className="policy-section">
        <h2>Legal</h2>
        <p>
          These terms are governed by the laws of the Kingdom of Bahrain.
          Photos, branding, and written content on this site belong to Um
          Zainab Confectionery and shouldn't be reused without permission.
          While we take care in preparing every order, we're not liable for
          reactions arising from undisclosed allergies or intolerances not
          communicated to us before ordering.
        </p>
      </section>

      <p className="policies-contact">
        Questions about any of this? Message us on WhatsApp or Instagram —
        contact details are on our <a href="/contact">Contact page</a>.
      </p>
    </main>
  );
}
