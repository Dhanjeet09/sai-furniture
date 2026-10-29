import Link from "next/link";

import { navigation, site } from "./lib/site";

export const metadata = {
  title: "Page not found"
};

export default function NotFound() {
  return (
    <section className="not-found section-pad">
      <p className="eyebrow eyebrow-gold">404</p>
      <h1>This page isn&rsquo;t here.</h1>
      <p>
        The page you were looking for may have moved. Start from the studio
        homepage, or call us directly to talk about your project.
      </p>
      <div className="not-found-actions">
        <Link className="button button-gold" href="/">
          Back to the homepage <span aria-hidden="true">→</span>
        </Link>
        <a className="button button-outline" href={`tel:${site.phone}`}>
          Call {site.phoneDisplay}
        </a>
      </div>
      <nav className="not-found-links" aria-label="Site sections">
        {navigation.map((item) => (
          <Link key={item.href} href={`/${item.href}`}>
            {item.label}
          </Link>
        ))}
      </nav>
    </section>
  );
}
