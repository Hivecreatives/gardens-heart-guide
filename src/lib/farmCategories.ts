// Derives all relevant categories for a farm based on its blurb + primary category.
// Lets producers that make multiple kinds of drinks appear under several filters
// and be findable via product-type searches (e.g. "gin", "cider").

export type FarmLike = {
  name: string;
  category: string;
  blurb: string;
};

const RULES: { cat: string; patterns: RegExp[] }[] = [
  {
    cat: "Öl",
    patterns: [
      /\bbryggeri/i,
      /\böl(?![a-zåäö])/i,
      /\böls(?:ort|til|orter)/i,
      /\bIPA\b/,
      /\blager\b/i,
      /\bstout\b/i,
      /\bporter\b/i,
      /\bpilsner\b/i,
      /\b(pale\s+)?ale\b/i,
      /\bbrygger\b/i,
      /\bbrygd/i,
      /\bhumle/i,
    ],
  },
  {
    cat: "Vin",
    patterns: [
      /\bvingård/i,
      /\bvineri/i,
      /\bvinodl/i,
      /\bvinmak/i,
      /\bvin(?![a-zåäö])/i,
      /\bdruv/i,
      /\bmousserande/i,
      /\brosé/i,
    ],
  },
  {
    cat: "Sprit",
    patterns: [
      /\bdestilleri/i,
      /\bdestiller/i,
      /\bdestillat/i,
      /\bbränneri/i,
      /\bsprit/i,
      /\bgin\b/i,
      /\bwhisky\b/i,
      /\bvodka\b/i,
      /\bbrännvin/i,
      /\bsnaps\b/i,
      /\bakvavit/i,
      /\blikör/i,
      /\bromm?\b/i,
    ],
  },
  {
    cat: "Cider",
    patterns: [/\bcider/i, /\bcideri/i],
  },
  {
    cat: "Musteri",
    patterns: [/\bmusteri/i, /\bäppelmust/i, /\bmust(?![a-zåäö])/i],
  },
];

export function getFarmCategories(farm: FarmLike): string[] {
  const text = `${farm.name} ${farm.blurb}`;
  const found = new Set<string>([farm.category]);
  for (const { cat, patterns } of RULES) {
    if (patterns.some((p) => p.test(text))) found.add(cat);
  }
  return Array.from(found);
}

// Lowercased searchable string covering name, location and all derived categories.
export function getFarmSearchHaystack(
  farm: FarmLike & { location: string },
): string {
  return [
    farm.name,
    farm.location,
    ...getFarmCategories(farm),
  ]
    .join(" ")
    .toLowerCase();
}
