// Härleder relevanta regioner, kategorier och gårdsförsäljare för en artikel
// baserat på artikelns titel, ingress och innehåll.
import { farms, regions, categories, type Article, type Farm, type Region, type Category } from "@/data/site";

const CATEGORY_HINTS: Record<string, RegExp[]> = {
  ol: [/\böl\b/i, /bryggeri/i, /ipa\b/i, /lager\b/i, /humle/i, /stout/i, /pilsner/i],
  vin: [/\bvin\b/i, /vingård/i, /druv/i, /mousserande/i, /solaris/i, /vinprovning/i],
  sprit: [/sprit/i, /destilleri/i, /whisky/i, /\bgin\b/i, /akvavit/i, /snaps/i, /vodka/i, /rom\b/i],
  cider: [/cider/i, /äppel/i, /pressning/i],
  ovrigt: [/must/i, /kombucha/i, /alkoholfri/i, /saft/i],
};

const REGION_HINTS: Record<string, RegExp[]> = {
  skane: [/skåne/i, /österlen/i, /malmö/i, /lund/i, /ystad/i],
  "vastra-gotaland": [/västra götaland/i, /göteborg/i, /bohuslän/i, /dalsland/i],
  stockholm: [/stockholm/i, /skärgård/i, /mälardal/i],
  gotland: [/gotland/i, /visby/i],
  smaland: [/småland/i, /öland/i, /växjö/i],
  halland: [/halland/i, /västkust/i, /varberg/i, /halmstad/i],
  blekinge: [/blekinge/i, /karlskrona/i],
  dalarna: [/dalarna/i],
  varmland: [/värmland/i],
  uppsala: [/uppsala/i, /mälardal/i],
  norrbotten: [/norrbotten/i, /norrland/i, /luleå/i, /kiruna/i],
  vasterbotten: [/västerbotten/i, /umeå/i, /norrland/i],
  vasternorrland: [/västernorrland/i, /höga kusten/i, /sundsvall/i],
  jamtland: [/jämtland/i, /åre/i, /östersund/i],
  gavleborg: [/gävleborg/i, /gävle/i, /hälsingland/i],
  ostergotland: [/östergötland/i, /linköping/i, /vadstena/i],
  sodermanland: [/södermanland/i, /nyköping/i],
  vastmanland: [/västmanland/i, /västerås/i],
  orebro: [/örebro/i],
};

function matches(text: string, patterns: RegExp[]) {
  return patterns.some((p) => p.test(text));
}

export type RelatedLinks = {
  regions: Region[];
  categories: Category[];
  farms: Farm[];
};

export function getRelatedLinks(article: Article): RelatedLinks {
  const text = `${article.title} ${article.excerpt ?? ""} ${article.content ?? ""}`;

  let matchedRegions = regions.filter(
    (r) => matches(text, REGION_HINTS[r.slug] ?? []) || new RegExp(r.name, "i").test(text),
  );
  let matchedCategories = categories.filter(
    (c) => matches(text, CATEGORY_HINTS[c.slug] ?? []) || new RegExp(c.name, "i").test(text),
  );

  // Fallback: alltid visa de största regionerna/kategorierna så varje artikel
  // har relevanta vidarelänkar.
  if (matchedRegions.length === 0) {
    matchedRegions = [...regions].sort((a, b) => b.count - a.count).slice(0, 4);
  }
  if (matchedCategories.length === 0) {
    matchedCategories = [...categories].sort((a, b) => b.count - a.count).slice(0, 3);
  }

  matchedRegions = matchedRegions.slice(0, 5);
  matchedCategories = matchedCategories.slice(0, 4);

  const regionNames = new Set(matchedRegions.map((r) => r.name));
  const categoryNames = new Set(matchedCategories.map((c) => c.name));

  // Gårdsförsäljare som nämns vid namn i artikeln väger tyngst.
  const named = farms.filter((f) => f.name.length > 4 && text.includes(f.name));

  const scored = farms
    .filter((f) => !named.includes(f))
    .map((f) => {
      let score = 0;
      if (regionNames.has(f.region)) score += 2;
      if (categoryNames.has(f.category)) score += 3;
      if (f.website) score += 1;
      if (f.address) score += 1;
      if (f.blurb && f.blurb.length > 200) score += 1;
      return { f, score };
    })
    .filter((x) => x.score >= 4)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.f);

  // Sprid urvalet så att listan inte fylls av samma region/kategori.
  const pick = (list: Farm[], maxPerRegion: number, maxPerCategory: number, out: Farm[]) => {
    const byRegion = new Map<string, number>();
    const byCategory = new Map<string, number>();
    for (const f of out) {
      byRegion.set(f.region, (byRegion.get(f.region) ?? 0) + 1);
      byCategory.set(f.category, (byCategory.get(f.category) ?? 0) + 1);
    }
    for (const f of list) {
      if (out.length >= 6) break;
      if (out.includes(f)) continue;
      if ((byRegion.get(f.region) ?? 0) >= maxPerRegion) continue;
      if ((byCategory.get(f.category) ?? 0) >= maxPerCategory) continue;
      byRegion.set(f.region, (byRegion.get(f.region) ?? 0) + 1);
      byCategory.set(f.category, (byCategory.get(f.category) ?? 0) + 1);
      out.push(f);
    }
  };

  const related: Farm[] = [...named].slice(0, 3);
  pick(scored, 2, 3, related);
  if (related.length < 6) pick(scored, 6, 6, related);
  if (related.length < 6) pick(farms.filter((f) => regionNames.has(f.region)), 6, 6, related);
  if (related.length < 6) pick(farms, 6, 6, related);


  return { regions: matchedRegions, categories: matchedCategories, farms: related };
}
