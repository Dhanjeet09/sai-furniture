"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="not-found section-pad">
      <p className="eyebrow eyebrow-gold">Something went wrong</p>
      <h1>We couldn&rsquo;t load this page.</h1>
      <p>
        Please try again. If it keeps happening, call Sai Furniture on{" "}
        <a href="tel:+919826025149">+91 98260 25149</a>.
      </p>
      <button type="button" className="button button-gold" onClick={reset}>
        Try again
      </button>
    </section>
  );
}
