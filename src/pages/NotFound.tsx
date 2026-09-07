import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <main id="main-content" className="not-found">
      <p className="eyebrow">404</p>
      <h1>We couldn't find that page.</h1>
      <p>The page you're looking for may have moved or no longer exists.</p>
      <Link className="button button-primary" to="/">
        Back to home
      </Link>
    </main>
  );
}
