import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { navigation, whatsappUrl } from "../data/site";
import { useCart } from "../lib/cart";

function CartLink() {
  const { itemCount } = useCart();
  return (
    <NavLink to="/cart" className="cart-link" aria-label={`Cart, ${itemCount} items`}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M3 4h2l2.4 12.2a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L21 8H6"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="10" cy="20.5" r="1.4" fill="currentColor" />
        <circle cx="17" cy="20.5" r="1.4" fill="currentColor" />
      </svg>
      {itemCount > 0 ? <span className="cart-badge">{itemCount}</span> : null}
    </NavLink>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.classList.remove("menu-open");
    };
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="header-inner section-shell">
        <NavLink className="brand" to="/" aria-label="Um Zainab Confectionery home">
          <span className="brand-mark" aria-hidden="true">
            UZ
          </span>
          <span className="brand-name">
            <strong>Um Zainab</strong>
            <span>Confectionery</span>
          </span>
        </NavLink>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <NavLink
              to={item.href}
              key={item.href}
              end={item.href === "/"}
              className={({ isActive }) => (isActive ? "is-active" : undefined)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <a
          className="button button-primary header-order"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Order via WhatsApp <span aria-hidden="true">↗</span>
        </a>

        <CartLink />

        <button
          className="menu-toggle"
          ref={menuButtonRef}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span />
          <span />
        </button>
      </div>

      <div
        className={`mobile-menu ${menuOpen ? "is-open" : ""}`}
        id="mobile-navigation"
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile navigation">
          {navigation.map((item, index) => (
            <NavLink
              to={item.href}
              key={item.href}
              end={item.href === "/"}
              className={({ isActive }) => (isActive ? "is-active" : undefined)}
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => setMenuOpen(false)}
            >
              <span>0{index + 1}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <a
          className="button button-primary"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={menuOpen ? 0 : -1}
        >
          Order via WhatsApp <span aria-hidden="true">↗</span>
        </a>
        <p>Handmade with love · Bahrain</p>
      </div>
    </header>
  );
}
