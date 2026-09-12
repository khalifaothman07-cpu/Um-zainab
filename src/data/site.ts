export const whatsappUrl = "https://wa.me/97339468111";
export const instagramUrl =
  "https://www.instagram.com/umzainab_confectionery/";

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/menu", label: "Menu" },
  { href: "/occasions", label: "Occasions" },
  { href: "/contact", label: "Contact" },
] as const;

export type PlaceholderVariant =
  | "bonbons"
  | "brownies"
  | "cookies"
  | "tiramisu"
  | "cake"
  | "making"
  | "giftbox"
  | "bouquet"
  | "ribbon"
  | "kitchen";

export type PhotoAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
  objectPosition?: string;
};

export const photoAssets = {
  bonbons: {
    src: "/images/handcrafted-bonbons-gift.jpg",
    alt: "Assorted dark chocolate bonbons arranged around a cheerful gift card.",
    width: 1364,
    height: 1153,
    objectPosition: "50% 50%",
  },
  brownieGiftBoxes: {
    src: "/images/cornflake-brownie-gift-boxes.jpg",
    alt: "Pink and blue gift boxes filled with cornflake-topped chocolate brownies.",
    width: 1206,
    height: 1396,
    objectPosition: "50% 54%",
  },
  cookies: {
    src: "/images/chocolate-chunk-cookies.jpg",
    alt: "Six golden chocolate chunk cookies topped with milk chocolate pieces.",
    width: 1400,
    height: 1027,
    objectPosition: "50% 50%",
  },
  tiramisu: {
    src: "/images/classic-tiramisu.jpg",
    alt: "Two freshly layered classic tiramisu desserts finished with cocoa.",
    width: 1254,
    height: 1254,
    objectPosition: "56% 50%",
  },
  nikahGift: {
    src: "/images/nikah-chocolate-gift.jpg",
    alt: "A Nikah celebration gift box filled with individually wrapped golden chocolates.",
    width: 1206,
    height: 1494,
    objectPosition: "50% 48%",
  },
} as const satisfies Record<string, PhotoAsset>;

export const productHighlights: Array<{
  kicker: string;
  title: string;
  description: string;
  photoLabel: string;
  variant: PlaceholderVariant;
  image?: PhotoAsset;
}> = [
  {
    kicker: "Signature collection",
    title: "Handcrafted Bonbons",
    description:
      "Elegant little chocolates with polished shells and indulgent centres.",
    photoLabel: "Assorted handcrafted bonbons",
    variant: "bonbons",
    image: photoAssets.bonbons,
  },
  {
    kicker: "Soft-centred",
    title: "Chocolate Chunk Cookies",
    description:
      "Golden-edged, soft-centred cookies generously folded with chocolate chunks.",
    photoLabel: "Chocolate chunk cookies",
    variant: "cookies",
    image: photoAssets.cookies,
  },
  {
    kicker: "Creamy, cocoa-dusted",
    title: "Classic Tiramisu",
    description:
      "A timeless, elegant dessert with delicate layers and a generous dusting of cocoa.",
    photoLabel: "Classic tiramisu with cocoa finish",
    variant: "tiramisu",
    image: photoAssets.tiramisu,
  },
];

export const menuCategories: Array<{
  number: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  photoLabel: string;
  variant: PlaceholderVariant;
  image?: PhotoAsset;
}> = [
  {
    number: "01",
    title: "Handcrafted Chocolates & Bonbons",
    subtitle: "Small pieces, beautifully finished",
    description:
      "A polished assortment of handcrafted chocolates and bonbons, created in small batches for gifting, sharing, and slow moments of indulgence.",
    details: ["Assorted bonbon selections", "Gift-ready presentation", "Made fresh to order"],
    photoLabel: "Handcrafted chocolate and bonbon assortment",
    variant: "bonbons",
    image: photoAssets.bonbons,
  },
  {
    number: "02",
    title: "Gourmet Brownies",
    subtitle: "Fudgy, rich, and generously topped",
    description:
      "Our deeply chocolatey brownies have a soft, fudgy centre and a beautifully dressed finish. Choose the topping that suits your craving.",
    details: ["Pistachio topping", "Milk chocolate topping", "Lotus/Biscoff topping"],
    photoLabel: "Gourmet brownies with three topping styles",
    variant: "brownies",
    image: photoAssets.brownieGiftBoxes,
  },
  {
    number: "03",
    title: "Chocolate Chunk Cookies",
    subtitle: "Golden edges, soft centres",
    description:
      "Comforting, generous cookies folded with plenty of chocolate chunks—made for sharing, although we understand if you don't.",
    details: ["Chocolate chunk filled", "Baked in small batches", "Prepared to order"],
    photoLabel: "Stack of chocolate chunk cookies",
    variant: "cookies",
    image: photoAssets.cookies,
  },
  {
    number: "04",
    title: "Classic Tiramisu",
    subtitle: "Creamy, cocoa-dusted layers",
    description:
      "A timeless, elegant dessert with delicate layers, a cloud-soft cream, and a generous dusting of cocoa.",
    details: ["Classic layered finish", "Cocoa dusting", "Made fresh for your order"],
    photoLabel: "Classic tiramisu with cocoa finish",
    variant: "tiramisu",
    image: photoAssets.tiramisu,
  },
  {
    number: "05",
    title: "Midnight Indulgence",
    subtitle: "Chocolate cake with a playful crunch",
    description:
      "A decadent chocolate cake with a dramatic dark finish and a signature cornflake topping for an irresistible contrast of soft cake and crisp crunch.",
    details: ["Deep chocolate cake", "Cornflake topping", "Celebration-ready finish"],
    photoLabel: "Midnight Indulgence chocolate cake",
    variant: "cake",
  },
];

// Maps product slugs (from the Supabase catalog) to real photos. Any slug
// not listed here has no photo yet — pages must render without a photo
// slot rather than a placeholder.
export const productPhotosBySlug: Record<string, PhotoAsset> = {
  "handcrafted-bonbons": photoAssets.bonbons,
  "gourmet-brownies": photoAssets.brownieGiftBoxes,
  "chocolate-chunk-cookies": photoAssets.cookies,
  "classic-tiramisu": photoAssets.tiramisu,
};

// Common box-size shortcuts shown as quick-pick buttons on the product page,
// in addition to the free +/- stepper for custom quantities.
export const quantityPresetsBySlug: Record<string, number[]> = {
  "gourmet-brownies": [6, 9, 12],
};

export const occasions: Array<{
  number: string;
  title: string;
  description: string;
}> = [
  {
    number: "01",
    title: "Eid",
    description:
      "Warm, polished gifts made for generous tables, family visits, and thoughtful giving.",
  },
  {
    number: "02",
    title: "Nikah & Engagement",
    description:
      "Romantic chocolate details for a beautiful beginning, tailored to the mood of your celebration.",
  },
  {
    number: "03",
    title: "Graduations",
    description:
      'A sweet way to say "you did it," with celebratory presentation and a message of your choice.',
  },
  {
    number: "04",
    title: "Birthdays",
    description:
      "Joyful boxes, bouquets, and chocolate bar messages made especially for their day.",
  },
];
