import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { CartProvider } from "./lib/cart";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";
import { MobileOrderBar } from "./components/WhatsAppButton";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Menu } from "./pages/Menu";
import { ProductDetail } from "./pages/ProductDetail";
import { CartPage } from "./pages/CartPage";
import { Occasions } from "./pages/Occasions";
import { Contact } from "./pages/Contact";
import { Admin } from "./pages/Admin";
import { Policies } from "./pages/Policies";
import { NotFound } from "./pages/NotFound";

const pageTitles: Record<string, string> = {
  "/": "Um Zainab Confectionery | Handcrafted in Bahrain",
  "/about": "Our Story | Um Zainab Confectionery",
  "/menu": "Our Creations | Um Zainab Confectionery",
  "/cart": "Your Cart | Um Zainab Confectionery",
  "/occasions": "Gifts & Occasions | Um Zainab Confectionery",
  "/contact": "Order in Bahrain | Um Zainab Confectionery",
  "/policies": "Privacy, Terms & Refunds | Um Zainab Confectionery",
  "/admin": "Order Dashboard | Um Zainab Confectionery",
};

function ScrollAndTitleManager() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = pageTitles[location.pathname] ?? "Um Zainab Confectionery";
  }, [location.pathname]);
  return null;
}

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname === "/admin";

  return (
    <CartProvider>
      <ScrollAndTitleManager />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      {!isAdmin && <SiteHeader />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/:slug" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/occasions" element={<Occasions />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policies" element={<Policies />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAdmin && <SiteFooter />}
      {!isAdmin && <MobileOrderBar />}
    </CartProvider>
  );
}
