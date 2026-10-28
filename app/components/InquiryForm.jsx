"use client";

import { useState } from "react";
import { projectTypes, whatsappLink } from "@/app/lib/site";

export default function InquiryForm() {
  const [name, setName] = useState("");
  const [projectType, setProjectType] = useState(projectTypes[0]);
  const [budget, setBudget] = useState("");
  const [details, setDetails] = useState("");
  const [sentUrl, setSentUrl] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();

    const message = [
      "Hello Sai Furniture, I would like to discuss a project.",
      `Name: ${name.trim()}`,
      `Project: ${projectType}`,
      budget.trim() ? `Budget: ${budget.trim()}` : "",
      details.trim() ? `About my space: ${details.trim()}` : ""
    ]
      .filter(Boolean)
      .join("\n");

    const url = whatsappLink(message);
    setSentUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function update(setter) {
    return (event) => {
      setter(event.target.value);
      if (sentUrl) setSentUrl(null);
    };
  }

  return (
    <form className="inquiry-form" onSubmit={handleSubmit}>
      <label htmlFor="customer-name">Your name</label>
      <input
        id="customer-name"
        name="name"
        type="text"
        autoComplete="name"
        value={name}
        onChange={update(setName)}
        required
      />

      <label htmlFor="project-type">What are you planning?</label>
      <select
        id="project-type"
        name="project"
        value={projectType}
        onChange={update(setProjectType)}
      >
        {projectTypes.map((type) => (
          <option key={type}>{type}</option>
        ))}
      </select>

      <label htmlFor="project-budget">
        Budget range <span className="label-note">(optional)</span>
      </label>
      <input
        id="project-budget"
        name="budget"
        type="text"
        inputMode="text"
        placeholder="For example, ₹1–2 lakh"
        value={budget}
        onChange={update(setBudget)}
      />

      <label htmlFor="project-details">Tell us about your space</label>
      <textarea
        id="project-details"
        name="details"
        autoComplete="off"
        placeholder="Location, approximate dimensions, ideas…"
        rows={4}
        value={details}
        onChange={update(setDetails)}
      />

      <button type="submit" className="button button-gold">
        Continue to WhatsApp <span aria-hidden="true">↗</span>
      </button>

      {sentUrl ? (
        <p className="form-sent" role="status">
          WhatsApp should have opened in a new tab. Press send there to reach
          us. If nothing opened,{" "}
          <a href={sentUrl} target="_blank" rel="noopener noreferrer">
            open your message
          </a>
          .
        </p>
      ) : null}

      <p className="form-note">
        Opens WhatsApp with your message, which you review and send yourself.
        This website does not store your details.
      </p>
    </form>
  );
}
