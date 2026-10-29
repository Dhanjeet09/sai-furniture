"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { whatsappLink } from "../lib/site";

export default function ServiceDetail({ service }) {
  const dialogRef = useRef(null);
  const [open, setOpen] = useState(false);

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

  function onDialogClick(e) {
    if (e.target === dialogRef.current) closeDialog();
  }

  return (
    <>
      <button
        type="button"
        className="service-card-trigger"
        onClick={openDialog}
        aria-haspopup="dialog"
        aria-label={`Open ${service.title} details`}
      >
        <span className="service-card-trigger-label" aria-hidden="true">
          View details
        </span>
      </button>

      <dialog
        ref={dialogRef}
        className="service-dialog"
        aria-label={`${service.title} — design direction`}
        onClick={onDialogClick}
        onClose={closeDialog}
      >
        <div className="service-dialog-inner">
          <div className="service-dialog-stage">
            <Image
              src={service.image}
              alt={service.imageAlt || service.title}
              fill
              unoptimized
              sizes="(max-width: 900px) 100vw, 88vw"
            />
          </div>
          <div className="service-dialog-content">
            <p className="service-dialog-category">
              {service.number} / {service.category}
            </p>
            <h2>{service.title}</h2>
            <p>{service.text}</p>
            <p className="service-dialog-note">
              This is a design reference, not a photograph of a completed
              project. Material, finish and availability are confirmed during
              consultation.
            </p>
            <div className="service-dialog-actions">
              <a
                className="button button-gold"
                href={whatsappLink(
                  `Hello Sai Furniture, I would like to discuss ${service.title.toLowerCase()}.`
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ask about this <span aria-hidden="true">↗</span>
              </a>
              <button
                type="button"
                className="button button-outline"
                onClick={closeDialog}
              >
                Close
              </button>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="service-dialog-close"
          onClick={closeDialog}
          aria-label="Close"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </dialog>
    </>
  );
}
