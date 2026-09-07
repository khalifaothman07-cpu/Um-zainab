import { Link } from "react-router-dom";

export function SectionHeading({
  eyebrow,
  title,
  copy,
  action,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  action?: { href: string; label: string };
  centered?: boolean;
}) {
  return (
    <div className={`section-heading ${centered ? "is-centered" : ""}`}>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      <div className="section-heading-side">
        {copy ? <p>{copy}</p> : null}
        {action ? (
          <Link className="text-link" to={action.href}>
            {action.label} <span aria-hidden="true">↗</span>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
