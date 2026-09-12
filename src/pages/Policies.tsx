export function Policies() {
  return (
    <main id="main-content" className="section-shell section-pad policies-page">
      <p className="eyebrow">Policies</p>
      <h1>Privacy, terms &amp; refunds</h1>
      <p className="policies-intro">
        Um Zainab Confectionery is a home-based business operating in Bahrain.
        This page explains how we handle your information, our order terms,
        and our approach to cancellations and refunds.
      </p>

      <section className="policy-section">
        <h2>Privacy</h2>
        <p>
          When you place an order, we collect your name, phone number,
          delivery address (if applicable), payment method preference, and
          any notes or occasion details you provide. We use this information
          only to prepare, confirm, and deliver your order, and to contact
          you about it.
        </p>
        <p>
          We do not sell or share your information with third parties, other
          than what's needed to process your order — for example, confirming
          payment if you pay via BenefitPay. Order information is stored
          securely and kept only as long as needed for order history and
          basic business records.
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
            any allergies before ordering.
          </li>
          <li>Payment is by cash or BenefitPay, confirmed via WhatsApp.</li>
          <li>Prices are listed in Bahraini Dinar and may change without notice.</li>
        </ul>
      </section>

      <section className="policy-section">
        <h2>Cancellations &amp; refunds</h2>
        <p className="policy-placeholder">
          [Placeholder — needs your input: how far in advance can a customer
          cancel or change an order for a full refund? What happens to
          orders cancelled after that point, given items are often already
          in progress? Once you confirm this with your mom, replace this
          paragraph with the real policy.]
        </p>
      </section>

      <p className="policies-contact">
        Questions about any of this? Message us on WhatsApp or Instagram —
        contact details are on our <a href="/contact">Contact page</a>.
      </p>
    </main>
  );
}
