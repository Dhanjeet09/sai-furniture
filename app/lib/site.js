export const site = {
  name: "Sai Furniture",
  owner: "Hari Kishore Sharma",
  phone: "+919826025149",
  phoneDisplay: "+91 98260 25149",
  whatsapp: "919826025149",
  address: {
    line1: "C-69, Regal Homes",
    line2: "Near Shubhankar Gas Agency, Avadhpuri",
    city: "Bhopal",
    state: "Madhya Pradesh",
    pincode: "462022",
    area: "Avadhpuri",
    country: "IN"
  },
  addressOneLine:
    "C-69, Regal Homes, Near Shubhankar Gas Agency, Avadhpuri, Bhopal – 462022",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(
      "Sai Furniture, C-69, Regal Homes, Near Shubhankar Gas Agency, Avadhpuri, Bhopal 462022"
    ),
  serviceAreas: ["Bhopal"]
};

export function whatsappLink(message) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const navigation = [
  { href: "#services", label: "Services" },
  { href: "#inspiration", label: "Inspiration" },
  { href: "#approach", label: "Approach" },
  { href: "#contact", label: "Contact" }
];

export const projectTypes = [
  "Modular kitchen",
  "Wardrobe or cabinets",
  "Custom furniture",
  "Interior woodwork",
  "Commercial furniture",
  "Aluminium work",
  "Other"
];
