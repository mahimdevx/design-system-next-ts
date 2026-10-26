// Dummy data: a fictional esports apparel store, for the demo only

export const store = {
  name: "Raphix",
  fullName: "Raphix Store",
  tagline: "eSports apparel brand",
  announcement:
    "Worldwide shipping to 60+ countries · Free design proof on every custom order",
  hotline: "(+100) 123 456 7890"
};

// In-page sections: the other store screens (shop, customizer, checkout…) are not built
export const sections = [
  { id: "order", label: "Order" },
  { id: "latest", label: "Latest drop" },
  { id: "teams", label: "Teams" },
  { id: "process", label: "How it works" }
] as const;

export const heroStats = [
  { value: "1 pc", label: "Minimum order" },
  { value: "48 h", label: "Design proof" },
  { value: "10–14 d", label: "Production" }
];

/*
 * Kit artwork: the jersey colors are product "photos", not UI colors, so they stay fixed
 * in both themes instead of using tokens.
 */
const colors = {
  lime: "#c6ff3d",
  red: "#ff3b47",
  blue: "#2f6bff",
  violet: "#8b5cf6",
  teal: "#19d3c5",
  gold: "#e8b33d",
  white: "#f2f3f5",
  ink: "#15171b",
  slate: "#3a3f48"
};

type Color = keyof typeof colors;

const patterns = {
  slash: (b: string, a: string) =>
    `linear-gradient(115deg,${b} 0 38%,${a} 38% 46%,${b} 46% 54%,${a} 54% 57%,${b} 57%)`,
  shard: (b: string, a: string) =>
    `linear-gradient(160deg,transparent 0 55%,${a}cc 55% 62%,transparent 62%),conic-gradient(from 210deg at 40% 60%,${a} 0 10%,${b} 10% 45%,${a}55 45% 52%,${b} 52%)`,
  fade: (b: string, a: string) => `linear-gradient(180deg,${b} 0 42%,${a} 100%)`,
  grid: (b: string, a: string) =>
    `repeating-linear-gradient(90deg,${a}55 0 2px,transparent 2px 14px),repeating-linear-gradient(0deg,${a}55 0 2px,transparent 2px 14px),${b}`,
  split: (b: string, a: string) => `linear-gradient(90deg,${b} 0 50%,${a} 50%)`
};

function kit(base: Color, accent: Color, pattern: keyof typeof patterns) {
  return { background: patterns[pattern](colors[base], colors[accent]) };
}

export const heroKits = [
  {
    number: "23",
    numberColor: colors.gold,
    style: kit("red", "gold", "shard"),
    position: "top-[20%] left-[4%] w-[38%] -rotate-9"
  },
  {
    number: "11",
    numberColor: colors.white,
    style: kit("blue", "teal", "fade"),
    position: "top-[16%] left-[56%] w-[38%] rotate-8"
  },
  {
    number: "07",
    numberColor: colors.lime,
    style: kit("ink", "lime", "slash"),
    position: "top-[30%] left-[27%] w-[46%]"
  }
];

export const orderWays = [
  {
    title: "Shop the drop",
    text: "Ready-to-wear jerseys, hoodies and jackets. Add your name and number in a click.",
    cta: "Shop now",
    href: "#latest"
  },
  {
    title: "Customize a template",
    text: "Pick from 100+ designs in our albums. Change colors, logos, names and numbers live.",
    cta: "See how it works",
    href: "#process"
  },
  {
    title: "Send your own design",
    text: "Upload your artwork or brief. A designer sends a proof and quote in 48 hours.",
    cta: "Order for a team",
    href: "#teams"
  }
];

export const products = [
  {
    name: "Vanta Pro Jersey",
    category: "Jerseys",
    price: 49,
    tag: "New",
    style: kit("ink", "lime", "slash")
  },
  {
    name: "Inferno Pro Jersey",
    category: "Jerseys",
    price: 49,
    style: kit("red", "ink", "shard")
  },
  {
    name: "Tidal Long Sleeve",
    category: "Long sleeve",
    price: 55,
    tag: "Bestseller",
    style: kit("blue", "teal", "fade")
  },
  {
    name: "Grid Hoodie",
    category: "Hoodies",
    price: 69,
    style: kit("slate", "lime", "grid")
  }
];

export const priceTiers = [
  { range: "1–9", price: 49 },
  { range: "10–24", price: 42 },
  { range: "25–49", price: 37 },
  { range: "50–199", price: 32 }
];

export const process = [
  { title: "Design", text: "Customize online or brief our team." },
  { title: "Approve", text: "Review your proof. Unlimited revisions." },
  { title: "Produce", text: "Printed and stitched in-house in 10–14 days." },
  { title: "Ship", text: "Tracked delivery to 60+ countries, duties prepaid." }
];

export const footerColumns = [
  { title: "Legal", links: ["Terms & conditions", "Privacy policy", "Licenses"] },
  {
    title: "Customer care",
    links: ["Track order", "Size chart", "Shipping & returns", "FAQ"]
  },
  {
    title: "Shop",
    links: ["All products", "Design albums", "Team orders", "Team stores"]
  }
];

export const paymentMethods = ["Amex", "Mastercard", "Visa", "PayPal", "G Pay"];

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

export function formatPrice(value: number) {
  return usd.format(value);
}
