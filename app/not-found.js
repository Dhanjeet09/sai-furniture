import Link from "next/link";

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
      <Link className="button button-gold" href="/">
        Back to the homepage <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}
