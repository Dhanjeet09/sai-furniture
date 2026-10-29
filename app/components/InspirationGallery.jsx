"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function InspirationGallery({ items }) {
  const dialogRef = useRef(null);
  const prefetched = useRef(new Set());
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    function onClose() {
      setOpen(false);
    }

    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.setAttribute("data-scroll-lock", "");
    return () => root.removeAttribute("data-scroll-lock");
  }, [open]);

  function openAt(next) {
    setIndex(next);
    dialogRef.current?.showModal();
    setOpen(true);
  }

  function close() {
    dialogRef.current?.close();
  }

  /* The viewer serves the original file so a hover can warm the cache and the
     image is on screen the moment the dialog opens. */
  function prefetch(item) {
    if (prefetched.current.has(item.title)) return;
    prefetched.current.add(item.title);
    const image = new window.Image();
    image.src = item.image.src;
  }

  function step(delta) {
    setIndex((current) => (current + delta + items.length) % items.length);
  }

  function onKeyDown(event) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    }
  }

  function onDialogClick(event) {
    // Clicks that land on the dialog itself are clicks on the backdrop.
    if (event.target === dialogRef.current) close();
  }

  const active = items[index];

  return (
    <>
      <div className="inspiration-grid">
        {items.map((item, itemIndex) => (
          <button
            type="button"
            className={
              itemIndex === 0 ? "inspiration-card feature" : "inspiration-card"
            }
            key={item.title}
            onClick={() => openAt(itemIndex)}
            onPointerEnter={() => prefetch(item)}
            onFocus={() => prefetch(item)}
            aria-haspopup="dialog"
            data-reveal=""
            style={{ "--reveal-delay": `${itemIndex * 70}ms` }}
          >
            <Image
              src={item.image}
              alt=""
              fill
              placeholder="blur"
              sizes="(max-width: 720px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <span className="inspiration-zoom" aria-hidden="true">
              +
            </span>
            <span className="inspiration-overlay">
              <span className="inspiration-label">{item.label}</span>
              <span className="inspiration-title">{item.title}</span>
            </span>
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label={`Design reference viewer: ${active.title}`}
        onKeyDown={onKeyDown}
        onClick={onDialogClick}
      >
        <div className="lightbox-stage">
          <Image
            src={active.image}
            alt={active.alt}
            fill
            unoptimized
            sizes="(max-width: 900px) 100vw, 88vw"
          />
        </div>

        <div className="lightbox-bar">
          <p className="lightbox-caption">
            <span>{active.label}</span>
            <strong>{active.title}</strong>
          </p>
          <p className="lightbox-count" aria-live="polite">
            {index + 1} / {items.length}
          </p>
        </div>

        <button
          type="button"
          className="lightbox-close"
          onClick={close}
          aria-label="Close viewer"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <button
          type="button"
          className="lightbox-nav lightbox-prev"
          onClick={() => step(-1)}
          aria-label="Previous image"
        >
          <span aria-hidden="true">←</span>
        </button>
        <button
          type="button"
          className="lightbox-nav lightbox-next"
          onClick={() => step(1)}
          aria-label="Next image"
        >
          <span aria-hidden="true">→</span>
        </button>
      </dialog>
    </>
  );
}
