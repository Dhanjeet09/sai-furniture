"use client";

import { useEffect, useState } from "react";
import { navigation, site } from "../lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event) {
      if (event.key === "Escape") setOpen(false);
    }

    const wide = window.matchMedia("(min-width: 721px)");
    function onWide(event) {
      if (event.matches) setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    wide.addEventListener("change", onWide);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Sai Furniture — back to top">
        SAI <span>FURNITURE</span>
      </a>

      <nav
        id="site-nav"
        className={open ? "main-nav is-open" : "main-nav"}
        aria-label="Main navigation"
      >
        {navigation.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
        <a className="nav-call" href={`tel:${site.phone}`}>
          Call {site.phoneDisplay}
        </a>
      </nav>

      <a className="header-call" href={`tel:${site.phone}`}>
        Call us <span aria-hidden="true">↗</span>
      </a>

      <button
        type="button"
        className="menu-toggle"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="site-nav"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? (
          <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>
    </header>
  );
}
