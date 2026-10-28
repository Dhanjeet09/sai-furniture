import { Cormorant_Garamond, Manrope } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { getBaseUrl } from "./lib/base-url";
import { site } from "./lib/site";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  display: "swap"
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

const baseUrl = getBaseUrl();
const metadataOrigin = baseUrl ?? "http://localhost:3000";
const title = "Sai Furniture | Custom Furniture & Interiors in Bhopal";
const description =
  "Custom furniture, modular kitchens, wardrobes and interior woodwork in Bhopal. Talk to Sai Furniture about your space, materials and budget.";

export const metadata = {
  metadataBase: new URL(metadataOrigin),
  ...(baseUrl ? { alternates: { canonical: "/" } } : {}),
  title: { default: title, template: `%s | ${site.name}` },
  description,
  applicationName: site.name,
  keywords: [
    "furniture maker in Bhopal",
    "custom furniture Bhopal",
    "modular kitchen Bhopal",
    "wardrobe Bhopal",
    "interior work Bhopal",
    "aluminium work Bhopal"
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  formatDetection: { telephone: true, address: true, email: true },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.name,
    title,
    description,
    ...(baseUrl ? { url: baseUrl } : {}),
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Sai Furniture — modular living, made beautiful. Custom furniture in Bhopal."
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"]
  }
  // Crawler directives live on the home page, not here: a layout-level
  // "index, follow" would be inherited by the 404 page and conflict with the
  // "noindex" Next.js adds to it.
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#3e2c21",
  colorScheme: "light"
};

export default function RootLayout({ children }) {
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    "@id": baseUrl ? `${baseUrl}/#business` : undefined,
    name: site.name,
    description:
      "Custom furniture, modular kitchens, wardrobes and complete interior woodwork in Bhopal, Madhya Pradesh.",
    url: baseUrl || undefined,
    image: baseUrl ? `${baseUrl}/og.png` : undefined,
    telephone: `+91-${site.phone.replace(/^\+91/, "")}`,
    hasMap: site.mapsUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.line1}, ${site.address.line2}`,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.pincode,
      addressCountry: site.address.country
    },
    areaServed: { "@type": "City", name: "Bhopal" },
    makesOffer: [
      "Modular kitchens",
      "Wardrobes and cabinets",
      "Furniture and TV units",
      "Interior woodwork and finishes",
      "Commercial furniture",
      "Aluminium work"
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name }
    }))
  };

  return (
    <html lang="en-IN">
      <body className={`${display.variable} ${body.variable}`}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <div className="site-shell" id="top">
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(businessSchema).replace(/</g, "\\u003c")
          }}
        />
      </body>
    </html>
  );
}
