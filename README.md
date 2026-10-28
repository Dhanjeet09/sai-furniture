# Sai Furniture — Bhopal

Single-page marketing site for Sai Furniture, a custom furniture and interior
woodwork studio in Avadhpuri, Bhopal. Built with the Next.js App Router.

The page is a server component. Only the header menu and the inquiry form are
client components, so the rest ships as static HTML.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build
npm start          # http://localhost:3000
```

Node 18.17+ is required (developed on Node 22).

## Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin, e.g. `https://saifurniture.in`. Used for `<link rel="canonical">`, Open Graph URLs, `robots.txt` and `sitemap.xml`. |

On Vercel the deployment URL is picked up automatically
(`VERCEL_PROJECT_PRODUCTION_URL`, then `VERCEL_URL`).

If no origin is configured, the site still builds and runs, but no canonical,
sitemap or absolute OG URL is published — better than pointing search engines at
a domain that does not exist. Set `NEXT_PUBLIC_SITE_URL` before launch.

## Content

| File | Holds |
| --- | --- |
| `app/lib/site.js` | Business name, owner, phone, WhatsApp number, address, maps link, navigation, project types. |
| `app/page.js` | Every section: hero, categories, services, concept, inspiration, approach, FAQs, contact. FAQ copy is also emitted as `FAQPage` schema. |
| `app/layout.js` | Metadata, viewport, `FurnitureStore` schema. |
| `app/components/*` | Header, footer, inquiry form. |

Edit the copy directly in these files. Nothing is fetched from a CMS.

The inquiry form does not post to a server. It composes a WhatsApp message the
visitor reviews and sends themselves, so no personal data is stored or emailed.

## Images

Source concepts live in `tmp/image-source` (not deployed). Generated, deployable
assets live in `assets/` as WebP and are imported statically so Next can size and
lazy-load them.

```bash
npm run assets
```

`scripts/build-assets.mjs` crops the baked-in "completed project" badges that
shipped with two of the source concepts, resizes to 1200–1400 px, and rebuilds
`public/og.png` plus the app icons. Run it after replacing a source image.

Images on the page are design references, not photographs of completed projects.
The UI says so in the hero label, the concept note, the inspiration disclaimer
and the footer. Keep that labelling if you swap in real project photography —
and remember to remove the "concept visual" labels when the images are real work.

## Accessibility and quality

- Skip link, single `<h1>`, heading order, landmarks (`header`/`main`/`footer`).
- Colour pairs are at or above WCAG AA; body text is 16 px.
- Visible focus rings, `prefers-reduced-motion` support, 46 px menu target.
- Lighthouse (production build): 100 accessibility, 100 best practices, 100 SEO.

## Deployment

Any Node host works. On Vercel, import the repository, set
`NEXT_PUBLIC_SITE_URL`, and deploy — no other configuration is needed.
