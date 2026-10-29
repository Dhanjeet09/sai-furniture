import { site } from "./lib/site";

export default function manifest() {
  return {
    name: `${site.name} — Custom Furniture in Bhopal`,
    short_name: site.name,
    description:
      "Custom furniture, modular kitchens, wardrobes and interior woodwork in Bhopal.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#faf7f2",
    theme_color: "#3e2c21",
    lang: "en-IN",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      }
    ]
  };
}
