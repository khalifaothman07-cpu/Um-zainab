import { Link } from "react-router-dom";
import { instagramUrl, navigation, whatsappUrl } from "../data/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="section-shell footer-grid">
        <div className="footer-brand">
          <Link className="brand brand-light" to="/">
            <span className="brand-mark" aria-hidden="true">
              UZ
            </span>
            <span className="brand-name">
              <strong>Um Zainab</strong>
              <span>Confectionery</span>
            </span>
          </Link>
          <p>
            Handcrafted chocolates and desserts, made fresh to order from our
            home kitchen in Bahrain.
          </p>
        </div>
        <div className="footer-column">
          <h2>Explore</h2>
          <nav aria-label="Footer navigation">
            {navigation.map((item) => (
              <Link to={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="footer-column">
          <h2>Say hello</h2>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            WhatsApp · +973 3946 8111
          </a>
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
            Instagram · @umzainab_confectionery
          </a>
          <p>Delivery within Bahrain only</p>
        </div>
      </div>
      <div className="section-shell footer-bottom">
        <p>© {new Date().getFullYear()} Um Zainab Confectionery</p>
        <Link to="/policies" className="footer-policies-link">
          Privacy, Terms &amp; Refunds
        </Link>
        <p>Small batch · Made to order · Made with love</p>
      </div>
    </footer>
  );
}
