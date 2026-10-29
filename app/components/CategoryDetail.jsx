"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export default function CategoryDetail({ category }) {
  const dialogRef = useRef(null);
  const [open, setOpen] = useState(false);

  const descriptions = {
    "Modular kitchens": "Kitchen systems planned around your space, cooking habits and material preferences. Design reference shown — material and finish choices confirmed during consultation.",
    "TV wall units": "Wall-mounted media storage with open and closed display shelving, sized to your room and viewing distance.",
    "Wardrobes": "Full-height wardrobe systems with mirrored panels and warm wood frames, tailored to bedroom dimensions.",
    "Bedroom storage": "Built-in bedroom cabinet and drawer systems for clothing, accessories and linen.",
    "Living systems": "Living room furniture and storage — media consoles, shelving, seating — planned around your layout.",
    "Office systems": "Workstation storage, reception counters and office cabinets for business interiors."
  };

  function openDialog() {
    dialogRef.current?.showModal();
    setOpen(true);
    document.documentElement.setAttribute("data-scroll-lock", "");
  }

  function closeDialog() {
    dialogRef.current?.close();
    setOpen(false);
    document.documentElement.removeAttribute("data-scroll-lock");
  }

  return (
    <>
      <button
        type="button"
        className="category-trigger"
        onClick={openDialog}
        aria-haspopup="dialog"
        aria-label={`Open ${category.title} details`}
      >
        {category.title}
      </button>
      <dialog
        ref={dialogRef}
        className="category-dialog"
        aria-label={`${category.title} — design direction`}
        onClick={(e) => { if (e.target === dialogRef.current) closeDialog(); }}
        onClose={closeDialog}
      >
        <div className="category-dialog-inner">
          <div className="category-dialog-stage">
            <Image src={category.image} alt={category.title + " — design reference"} fill unoptimized sizes="(max-width: 900px) 100vw, 88vw" />
          </div>
          <div className="category-dialog-content">
            <h2>{category.title}</h2>
            <p>{descriptions[category.title] || "Custom furniture designed around your space and materials."}</p>
            <p className="category-dialog-note">Visual reference only — not a completed-project photo. Material, finish and availability confirmed during consultation.</p>
            <div className="category-dialog-actions">
              <a className="button button-gold" href={`https://wa.me/919826025149?text=Hello+Sai+Furniture,+I+would+like+to+discuss+${encodeURIComponent(category.title.toLowerCase())}.`} target="_blank" rel="noopener noreferrer">Ask about this <span aria-hidden="true">↗</span></a>
              <button type="button" className="button button-outline" onClick={closeDialog}>Close</button>
            </div>
          </div>
        </div>
        <button type="button" className="category-dialog-close" onClick={closeDialog} aria-label="Close">✕</button>
      </dialog>
    </>
  );
}
