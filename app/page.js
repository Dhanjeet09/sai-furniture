import Image from "next/image";

import kitchenHero from "@/assets/kitchen-hero.webp";
import kitchenConcept from "@/assets/kitchen-concept.webp";
import wardrobeWalnut from "@/assets/wardrobe-walnut.webp";
import wardrobeSuite from "@/assets/wardrobe-suite.webp";
import tvUnit from "@/assets/tv-unit.webp";
import livingTv from "@/assets/living-tv.webp";
import office from "@/assets/office.webp";

import InquiryForm from "./components/InquiryForm";
import InspirationGallery from "./components/InspirationGallery";
import { site, whatsappLink } from "./lib/site";

export const metadata = {
  // Declared on the page rather than the layout so the 404 route keeps only
  // the "noindex" directive Next.js adds to it.
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" }
  }
};

const services = [
  {
    id: "service-kitchens",
    number: "01",
    category: "Kitchens",
    title: "Modular kitchens",
    text: "Kitchen cabinets and storage planned around your space, cooking habits and material preferences."
  },
  {
    id: "service-wardrobes",
    number: "02",
    category: "Storage",
    title: "Wardrobes & cabinets",
    text: "Built-in wardrobes, bookshelves and storage furniture tailored to room dimensions."
  },
  {
    id: "service-furniture",
    number: "03",
    category: "Living",
    title: "Furniture & TV units",
    text: "Beds, sofas, dining tables, TV units and pooja units for your home."
  },
  {
    id: "service-woodwork",
    number: "04",
    category: "Interiors",
    title: "Woodwork & finishes",
    text: "Wooden doors, windows, wall panels, ceilings and partitions."
  },
  {
    id: "service-commercial",
    number: "05",
    category: "Workspaces",
    title: "Commercial furniture",
    text: "Office furniture, reception counters and cabinets for business interiors."
  },
  {
    id: "service-aluminium",
    number: "06",
    category: "Aluminium",
    title: "Aluminium work",
    text: "Discuss your aluminium requirements, dimensions and installation needs with our team."
  }
];

const steps = [
  {
    number: "01",
    title: "Tell us what you need",
    text: "Share the furniture type, your location, reference images and your budget range."
  },
  {
    number: "02",
    title: "Discuss the details",
    text: "Talk through dimensions, materials, finish and project scope before a quotation."
  },
  {
    number: "03",
    title: "Agree on the plan",
    text: "Confirm the scope, price and delivery expectations directly with Sai Furniture."
  }
];

const planTopics = [
  "Room measurements",
  "Storage planning",
  "Materials & finishes",
  "Hardware",
  "Lighting",
  "Budget range",
  "Timeline",
  "Installation"
];

const faqs = [
  {
    question: "Where is Sai Furniture located?",
    answer: `We are at ${site.addressOneLine}. Please call to arrange a visit.`
  },
  {
    question: "Can I request custom furniture?",
    answer:
      "Yes. Share what you need, your room dimensions and any reference images. We can discuss a solution suited to your space."
  },
  {
    question: "How do I get a quotation?",
    answer:
      "Call or send a WhatsApp inquiry with the furniture type, location, approximate dimensions, reference images and budget range. We will discuss the project details with you before preparing a quotation."
  },
  {
    question: "What should I share before we talk?",
    answer:
      "The furniture type, your location in Bhopal, approximate room dimensions or photos, reference images you like and your budget range. That helps us discuss realistic options and prepare a quotation."
  },
  {
    question: "Do you handle site visits and installation?",
    answer:
      "Yes. We are a local Bhopal team, and site visits, measurements and installation are discussed as part of the project scope before you confirm anything."
  },
  {
    question: "Do you take on commercial interiors?",
    answer:
      "Yes. Office furniture, reception counters, storage and cabinets for business interiors are part of our services."
  }
];

const categories = [
  { title: "Modular kitchens", image: kitchenConcept },
  { title: "TV wall units", image: tvUnit },
  { title: "Wardrobes", image: wardrobeWalnut },
  { title: "Bedroom storage", image: wardrobeSuite },
  { title: "Living systems", image: livingTv },
  { title: "Office systems", image: office }
];

const inspirations = [
  {
    title: "Modular kitchens",
    label: "Kitchen systems",
    image: kitchenConcept,
    alt: "Warm timber and ivory modular kitchen with an island and pendant lighting"
  },
  {
    title: "TV wall units",
    label: "Living systems",
    image: tvUnit,
    alt: "Wall-mounted TV unit with fluted wood panelling and open display shelves"
  },
  {
    title: "Wardrobe systems",
    label: "Bedroom storage",
    image: wardrobeSuite,
    alt: "Full-height wardrobe suite with mirrored panels and a warm wood frame"
  },
  {
    title: "Modular living rooms",
    label: "Living systems",
    image: livingTv,
    alt: "Living room with a low media console, open shelving and warm lighting"
  },
  {
    title: "Modular workspaces",
    label: "Office storage",
    image: office,
    alt: "Office interior with built-in storage, worktops and warm wood finishes"
  }
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer }
  }))
};

export default function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">
            Avadhpuri, Bhopal <span aria-hidden="true">·</span> Furniture studio
          </p>
          <h1 id="hero-title">
            Modular living,
            <br />
            made <em>beautiful.</em>
          </h1>
          <p className="hero-description">
            Premium modular kitchens, wardrobes, TV units and storage systems
            designed around the way you live.
          </p>
          <div className="hero-actions">
            <a
              className="button button-gold"
              href={whatsappLink(
                "Hello Sai Furniture, I would like to discuss my project."
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              Discuss your project <span aria-hidden="true">↗</span>
            </a>
            <a className="button button-outline" href="#services">
              Explore services
            </a>
          </div>
          <p className="hindi-tagline" lang="hi">
            आपके घर और काम की जगह के लिए कस्टम फर्नीचर।
          </p>
        </div>
        <div className="hero-visual">
          <Image
            src={kitchenHero}
            alt="Warm timber and ivory modular kitchen with an island and pendant lighting"
            fill
            priority
            fetchPriority="high"
            placeholder="blur"
            sizes="(max-width: 720px) 100vw, (max-width: 1024px) 50vw, 46vw"
          />
          <span className="image-label">Design direction · concept visual</span>
        </div>
      </section>

      <nav className="service-ribbon" aria-label="Service shortcuts">
        <a href="#service-furniture">Custom furniture</a>
        <a href="#service-kitchens">Modular kitchens</a>
        <a href="#service-woodwork">Interior woodwork</a>
        <a href="#service-aluminium">Aluminium work</a>
      </nav>

      <section className="category-section section-pad" aria-labelledby="category-title">
        <div className="category-heading" data-reveal="">
          <div>
            <p className="eyebrow eyebrow-gold">Explore by space</p>
            <h2 id="category-title">
              Find modular furniture
              <br />
              for every room.
            </h2>
          </div>
          <a href="#contact">
            Plan your space <span aria-hidden="true">→</span>
          </a>
        </div>
        <div className="category-grid">
          {categories.map((category, index) => (
            <a
              className="category-card"
              href="#inspiration"
              key={category.title}
              data-reveal=""
              style={{ "--reveal-delay": `${index * 60}ms` }}
            >
              <span className="category-image">
                <Image
                  src={category.image}
                  alt=""
                  fill
                  placeholder="blur"
                  sizes="(max-width: 400px) 45vw, (max-width: 720px) 28vw, (max-width: 1024px) 28vw, 15vw"
                />
              </span>
              <span>{category.title}</span>
            </a>
          ))}
        </div>
      </section>

      <section
        className="services-section section-pad"
        id="services"
        aria-labelledby="services-title"
      >
        <div className="services-heading" data-reveal="">
          <div>
            <p className="eyebrow eyebrow-gold">Thoughtfully made</p>
            <h2 id="services-title">
              A place for everything.
              <br />
              A design for you.
            </h2>
          </div>
          <p>
            From a single piece of furniture to interior woodwork, tell us what
            your space needs.
          </p>
        </div>
        <div className="service-list">
          {services.map((service, index) => (
            <article
              className="service-item"
              id={service.id}
              key={service.number}
              data-reveal=""
              style={{ "--reveal-delay": `${(index % 3) * 70}ms` }}
            >
              <p className="service-kicker">
                {service.number} / {service.category}
              </p>
              <h3>{service.title}</h3>
              <p className="service-description">{service.text}</p>
              <a
                className="service-action"
                href={whatsappLink(
                  `Hello Sai Furniture, I would like to discuss ${service.title.toLowerCase()}.`
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ask about this <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="concept-section" id="concept" aria-labelledby="concept-title">
        <div className="concept-photo" data-reveal="">
          <Image
            src={wardrobeWalnut}
            alt="Walnut and ivory built-in wardrobe with open display shelving"
            fill
            placeholder="blur"
            sizes="(max-width: 860px) 100vw, 54vw"
          />
          <span className="image-label">Concept visual</span>
        </div>
        <div className="concept-copy" data-reveal="" style={{ "--reveal-delay": "80ms" }}>
          <p className="eyebrow eyebrow-gold">Material, proportion, detail</p>
          <h2 id="concept-title">
            Your ideas.
            <br />
            Room to take shape.
          </h2>
          <p>
            Bring a room photo, rough measurements or a reference you love. We
            can discuss the design, storage and material choices for your
            project.
          </p>
          <p className="concept-note">
            <span aria-hidden="true">i</span>
            <span>
              This is a design reference, not a photograph of a completed
              project. We share real site photos and samples during
              consultation.
            </span>
          </p>
          <a
            className="button button-light-outline"
            href={whatsappLink(
              "Hello Sai Furniture, I'd like to share an idea for my space."
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            Share your idea <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section
        className="inspiration-section section-pad"
        id="inspiration"
        aria-labelledby="inspiration-title"
      >
        <div className="inspiration-heading" data-reveal="">
          <div>
            <p className="eyebrow eyebrow-gold">A modular point of view</p>
            <h2 id="inspiration-title">
              Systems made
              <br />
              for your home.
            </h2>
          </div>
          <p>
            Explore modular systems for kitchens, bedrooms, living rooms and
            workspaces. We tailor every layout to your room.
          </p>
        </div>
        <InspirationGallery items={inspirations} />
        <p className="inspiration-disclaimer">
          Images on this page are visual references for design direction, not
          photographs of completed projects. Material, finish and availability
          are confirmed during consultation.
        </p>
      </section>

      <section className="confidence-strip" aria-label="How we work">
        <div data-reveal="">
          <span aria-hidden="true">01</span>
          <p>
            Designed around your
            <br />
            room dimensions
          </p>
        </div>
        <div data-reveal="" style={{ "--reveal-delay": "80ms" }}>
          <span aria-hidden="true">02</span>
          <p>
            Material and finish
            <br />
            choices discussed clearly
          </p>
        </div>
        <div data-reveal="" style={{ "--reveal-delay": "160ms" }}>
          <span aria-hidden="true">03</span>
          <p>
            Local Bhopal team for
            <br />
            site visits and installation
          </p>
        </div>
      </section>

      <section
        className="approach-section section-pad"
        id="approach"
        aria-labelledby="approach-title"
      >
        <p className="eyebrow eyebrow-gold" data-reveal="">
          Start with a conversation
        </p>
        <h2 id="approach-title" data-reveal="">
          Let&rsquo;s plan your space.
        </h2>
        <div className="steps-grid">
          {steps.map((step, index) => (
            <article
              className="step"
              key={step.number}
              data-reveal=""
              style={{ "--reveal-delay": `${index * 80}ms` }}
            >
              <p className="step-number">{step.number}</p>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
        <p className="plan-topics-label" data-reveal="">
          What we cover in the first call
        </p>
        <ul className="plan-topics" data-reveal="">
          {planTopics.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
      </section>

      <section className="faq-section section-pad" aria-labelledby="faq-title">
        <p className="eyebrow eyebrow-gold" data-reveal="">
          A few useful answers
        </p>
        <h2 id="faq-title" data-reveal="">
          Before we begin.
        </h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <details
              key={faq.question}
              data-reveal=""
              style={{ "--reveal-delay": `${index * 50}ms` }}
            >
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section
        className="contact-section section-pad"
        id="contact"
        aria-labelledby="contact-title"
      >
        <div className="contact-intro" data-reveal="">
          <p className="eyebrow eyebrow-gold">Let&rsquo;s make it yours</p>
          <h2 id="contact-title">
            Have a space
            <br />
            in mind?
          </h2>
          <p className="contact-owner">
            Speak with {site.owner}
          </p>
          <a className="contact-phone" href={`tel:${site.phone}`}>
            {site.phoneDisplay}
          </a>
          <p className="contact-address">
            {site.address.line1}, {site.address.line2},
            <br />
            {site.address.city} – {site.address.pincode}
          </p>
          <p className="visit-note">Please call to arrange a visit.</p>
          <div className="contact-links">
            <a
              href={whatsappLink(
                "Hello Sai Furniture, I would like to ask about my project."
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              Message on WhatsApp <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <div
          className="contact-form-wrap"
          data-reveal=""
          style={{ "--reveal-delay": "100ms" }}
        >
          <InquiryForm />
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c")
        }}
      />
    </>
  );
}
