"use client";

import { useEffect, useRef, useState } from "react";
import { navigation, site } from "../lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const headerRef = useRef(null);
  const navRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    let frame = 0;

    function onScroll() {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setScrolled(window.scrollY > 12);
      });
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const sections = navigation
      .map((item) => document.querySelector(item.href))
      .filter(Boolean);

    if (!sections.length) return;

    const visible = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry.isIntersecting);
        }
        const current = sections.find((section) => visible.get(section.id));
        setActive(current ? `#${current.id}` : "");
      },
      // A thin band across the middle of the viewport decides the active link.
      { rootMargin: "-42% 0px -50% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }

    function onPointerDown(event) {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    const wide = window.matchMedia("(min-width: 721px)");
    function onWide(event) {
      if (event.matches) setOpen(false);
    }

    const root = document.documentElement;
    root.setAttribute("data-scroll-lock", "");

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    wide.addEventListener("change", onWide);

    // Move focus into the panel so keyboard users land on the first link.
    navRef.current?.querySelector("a")?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      wide.removeEventListener("change", onWide);
      root.removeAttribute("data-scroll-lock");
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      className={scrolled ? "site-header is-scrolled" : "site-header"}
    >
      <a className="wordmark" href="#top" aria-label="Sai Furniture — back to top">
        SAI <span>FURNITURE</span>
      </a>

      <nav
        id="site-nav"
        ref={navRef}
        className={open ? "main-nav is-open" : "main-nav"}
        aria-label="Main navigation"
      >
        {navigation.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            aria-current={active === item.href ? "location" : undefined}
          >
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
        ref={toggleRef}
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
