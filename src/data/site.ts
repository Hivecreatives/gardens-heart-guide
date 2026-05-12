import regionSkane from "@/assets/region-skane.jpg";
import regionVg from "@/assets/region-vg.jpg";
import regionSthlm from "@/assets/region-sthlm.jpg";
import regionGotland from "@/assets/region-gotland.jpg";
import regionHalland from "@/assets/region-halland.jpg";
import regionSmaland from "@/assets/region-smaland.jpg";
import catOl from "@/assets/cat-ol.jpg";
import catVin from "@/assets/cat-vin.jpg";
import catSprit from "@/assets/cat-sprit.jpg";
import catCider from "@/assets/cat-cider.jpg";
import catMousserande from "@/assets/cat-mousserande.jpg";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";

export type Region = { slug: string; name: string; count: number; image: string };
export type Category = { slug: string; name: string; count: number; image: string; blurb: string };
export type Farm = { slug: string; name: string; region: string; category: string; image: string; location: string; blurb: string };
export type Article = { slug: string; title: string; date: string; excerpt: string; image: string };

type RegionSeed = Omit<Region, "count"> & { locations: readonly string[] };
type CategorySeed = Omit<Category, "count"> & {
  producerTerms: readonly string[];
  blurbs: readonly string[];
};

const regionSeeds: RegionSeed[] = [
  {
    slug: "skane",
    name: "Skåne",
    image: regionSkane,
    locations: ["Höör", "Höganäs", "Simrishamn", "Båstad", "Kivik", "Ystad", "Lund", "Ängelholm", "Tomelilla", "Kristianstad"],
  },
  {
    slug: "vastra-gotaland",
    name: "Västra Götaland",
    image: regionVg,
    locations: ["Göteborg", "Alingsås", "Borås", "Kungälv", "Uddevalla", "Lysekil", "Skövde", "Mariestad", "Trollhättan", "Falköping"],
  },
  {
    slug: "stockholm",
    name: "Stockholm",
    image: regionSthlm,
    locations: ["Vaxholm", "Ekerö", "Norrtälje", "Sigtuna", "Nynäshamn", "Södertälje", "Värmdö", "Nacka", "Åkersberga", "Saltsjöbaden"],
  },
  {
    slug: "gotland",
    name: "Gotland",
    image: regionGotland,
    locations: ["Visby", "Slite", "Hablingbo", "Ljugarn", "Klintehamn", "Fårösund", "Roma", "Hemse", "Burgsvik", "Katthammarsvik"],
  },
  {
    slug: "halland",
    name: "Halland",
    image: regionHalland,
    locations: ["Halmstad", "Falkenberg", "Varberg", "Kungsbacka", "Laholm", "Träslövsläge", "Onsala", "Åsa", "Getinge", "Harplinge"],
  },
  {
    slug: "smaland",
    name: "Småland",
    image: regionSmaland,
    locations: ["Växjö", "Vimmerby", "Kalmar", "Jönköping", "Nybro", "Eksjö", "Västervik", "Oskarshamn", "Värnamo", "Tranås"],
  },
];

const categorySeeds: CategorySeed[] = [
  {
    slug: "ol",
    name: "Öl",
    image: catOl,
    blurb: "Hantverksbryggerier som öppnar dörrarna för direktköp.",
    producerTerms: ["Bryggeri", "Gårdsbryggeri", "Ölhus", "Maltverk"],
    blurbs: [
      "Småskaligt bryggeri i {place} med fokus på lokala råvaror, säsongssläpp och gårdsbesök.",
      "Här bryggs klassiska och moderna ölstilar med tydlig förankring i {region}.",
      "En praktisk stopp för dig som vill prova färsk öl direkt från tank i {place}.",
    ],
  },
  {
    slug: "vin",
    name: "Vin",
    image: catVin,
    blurb: "Svenska vingårdar med rött, vitt och rosé direkt från källan.",
    producerTerms: ["Vingård", "Vinhus", "Vinodling", "Vinkällare"],
    blurbs: [
      "Kallklimatsviner från rankor nära {place}, med provningar och direktköp på gården.",
      "Den här producenten arbetar med svenska druvsorter och eleganta viner från {region}.",
      "Vingårdsmiljö, guidade smakprov och flaskor direkt från källaren i {place}.",
    ],
  },
  {
    slug: "sprit",
    name: "Sprit",
    image: catSprit,
    blurb: "Destillerier som tillverkar gin, whisky, akvavit och vodka.",
    producerTerms: ["Destilleri", "Bränneri", "Ginverk", "Spritverk"],
    blurbs: [
      "Hantverksdestilleri i {place} med små batcher, lokala botanicals och bokningsbara besök.",
      "Här produceras gin, akvavit och andra destillat med tydlig karaktär från {region}.",
      "En producent för dig som vill köpa med dig flaskor direkt från pannrummet i {place}.",
    ],
  },
  {
    slug: "cider",
    name: "Cider",
    image: catCider,
    blurb: "Cidertillverkare med pressade äpplen från egna odlingar.",
    producerTerms: ["Cidergård", "Musteri", "Ciderhus", "Äppelgård"],
    blurbs: [
      "Torra och fruktiga cidrar pressas på plats i {place} med frukt från egna eller närliggande odlingar.",
      "Den här gården gör cider med frisk syra och tydlig lokal prägel från {region}.",
      "Ett uppskattat stopp för dig som vill upptäcka svensk ciderproduktion nära {place}.",
    ],
  },
  {
    slug: "mousserande",
    name: "Mousserande",
    image: catMousserande,
    blurb: "Bubblor från svenska vingårdar och bryggare.",
    producerTerms: ["Bubbelgård", "Mousserande Hus", "Bubbelverk", "Mousserande Gård"],
    blurbs: [
      "Mousserande flaskor med frisk syra och nordisk stil produceras nära {place}.",
      "Här arbetar man med svenska bubblor och provningar i lugn gårdsmiljö i {region}.",
      "En producent för dig som söker eleganta bubblor direkt från gården i {place}.",
    ],
  },
];

const baseFarms: Farm[] = [
  { slug: "stigberga-bryggeri", name: "Stigberga Bryggeri", region: "Skåne", category: "Öl", image: catOl, location: "Höör", blurb: "Litet hantverksbryggeri med fokus på lagrade öl och säsongsspecialiteter." },
  { slug: "kullaberg-vingard", name: "Kullaberg Vingård", region: "Skåne", category: "Vin", image: catVin, location: "Höganäs", blurb: "Vita och mousserande viner från svalt västskånskt klimat." },
  { slug: "ramslosa-destilleri", name: "Ramslösa Destilleri", region: "Halland", category: "Sprit", image: catSprit, location: "Halmstad", blurb: "Småskalig produktion av gin och akvavit på lokala örter." },
  { slug: "appelgarden-orust", name: "Äppelgården Orust", region: "Västra Götaland", category: "Cider", image: catCider, location: "Henån", blurb: "Torra cidrar och ciderviner pressade på Bohuslänska äpplen." },
  { slug: "sjotuna-bubbel", name: "Sjötuna Bubbel", region: "Stockholm", category: "Mousserande", image: catMousserande, location: "Vaxholm", blurb: "Skärgårdens första metodklassiska producent." },
  { slug: "lilla-aros-bryggeri", name: "Lilla Åros Bryggeri", region: "Småland", category: "Öl", image: catOl, location: "Växjö", blurb: "Familjebryggeri med betoning på belgiska och tyska stilar." },
  { slug: "osterlen-bryggeri", name: "Österlen Bryggeri", region: "Skåne", category: "Öl", image: catOl, location: "Simrishamn", blurb: "Lantligt bryggeri med säsongsöl och pilsner från egen brunn." },
  { slug: "bjare-vingard", name: "Bjäre Vingård", region: "Skåne", category: "Vin", image: catVin, location: "Båstad", blurb: "Solvarma sluttningar med solaris och rondo som husdruvor." },
  { slug: "hven-destilleri", name: "Hven Destilleri", region: "Skåne", category: "Sprit", image: catSprit, location: "Ven", blurb: "Single malt whisky och gin från ön mitt i Öresund." },
  { slug: "kivik-musteri", name: "Kiviks Musteri", region: "Skåne", category: "Cider", image: catCider, location: "Kivik", blurb: "Klassisk cider och pressjuice från Österlens äppelodlingar." },
  { slug: "goteborgs-nya", name: "Göteborgs Nya Bryggeri", region: "Västra Götaland", category: "Öl", image: catOl, location: "Göteborg", blurb: "Stadsnära bryggeri med IPA, lager och experimentella batcher." },
  { slug: "hallands-vader", name: "Hallands Väderö Vingård", region: "Halland", category: "Vin", image: catVin, location: "Båstad", blurb: "Havsnära vingård med kalkrik jord och eleganta vita viner." },
  { slug: "smaland-spirits", name: "Småland Spirits", region: "Småland", category: "Sprit", image: catSprit, location: "Vimmerby", blurb: "Hantverksdestilleri med gin smaksatt av skogens råvaror." },
  { slug: "gotland-bryggeri", name: "Gotlands Bryggeri", region: "Gotland", category: "Öl", image: catOl, location: "Visby", blurb: "Ölets ö – välkända lager och säsongsöl från medeltidsstaden." },
  { slug: "gute-vingard", name: "Gute Vingård", region: "Gotland", category: "Vin", image: catVin, location: "Hablingbo", blurb: "Solrik kalkmark ger nyanserade viner med havsbris." },
  { slug: "ekero-cider", name: "Ekerö Cider", region: "Stockholm", category: "Cider", image: catCider, location: "Ekerö", blurb: "Mälaröarnas äppelträdgårdar i flaska – torra och fruktiga cidrar." },
  { slug: "norrtelje-brenneri", name: "Norrtelje Brenneri", region: "Stockholm", category: "Sprit", image: catSprit, location: "Norrtälje", blurb: "Ekologisk akvavit, gin och frukteau-de-vie i Roslagen." },
  { slug: "vasterbottens-mousserande", name: "Västerbottens Mousserande", region: "Småland", category: "Mousserande", image: catMousserande, location: "Jönköping", blurb: "Pet nat och traditionell metod på svenska druvor." },
  { slug: "halland-cider", name: "Halland Cider Co.", region: "Halland", category: "Cider", image: catCider, location: "Falkenberg", blurb: "Småskalig cider med vild jäsning från lokala äpplesorter." },
  { slug: "vg-mousserande", name: "Bohus Bubbel", region: "Västra Götaland", category: "Mousserande", image: catMousserande, location: "Lysekil", blurb: "Havsnära mousserande med saltstänk och frisk syra." },
];

const targetRegionCounts: Record<string, number> = {
  Skåne: 38,
  "Västra Götaland": 46,
  Stockholm: 22,
  Gotland: 19,
  Halland: 17,
  Småland: 28,
};

const targetCategoryCounts: Record<string, number> = {
  Öl: 82,
  Vin: 31,
  Sprit: 27,
  Cider: 18,
  Mousserande: 12,
};

const descriptors = [
  "Södra",
  "Norra",
  "Östra",
  "Västra",
  "Lilla",
  "Stora",
  "Solbackens",
  "Ängens",
  "Sjölidens",
  "Hagatorps",
  "Björkudds",
  "Rosenlunds",
  "Ekbackens",
  "Lindegårds",
  "Kustnära",
  "Höjden",
  "Backens",
  "Äppellundens",
  "Skogsro",
  "Hamnkvarn",
  "Stenhaga",
  "Grönadal",
  "Sommarvik",
  "Fågelsång",
  "Åkerlyckans",
  "Havsbris",
  "Kapellgårdens",
  "Dalabacka",
  "Rosendal",
  "Gläntans",
];

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const countByField = (items: Farm[], field: "region" | "category") =>
  items.reduce<Record<string, number>>((acc, item) => {
    acc[item[field]] = (acc[item[field]] ?? 0) + 1;
    return acc;
  }, {});

const currentRegionCounts = countByField(baseFarms, "region");
const currentCategoryCounts = countByField(baseFarms, "category");
const remainingCategoryCounts = Object.fromEntries(
  categorySeeds.map((category) => [category.name, targetCategoryCounts[category.name] - (currentCategoryCounts[category.name] ?? 0)]),
);

const generatedFarms: Farm[] = [];
const usedSlugs = new Set(baseFarms.map((farm) => farm.slug));

regionSeeds.forEach((regionSeed, regionIndex) => {
  const remainingInRegion = targetRegionCounts[regionSeed.name] - (currentRegionCounts[regionSeed.name] ?? 0);

  for (let i = 0; i < remainingInRegion; i += 1) {
    const nextCategory = categorySeeds
      .filter((category) => remainingCategoryCounts[category.name] > 0)
      .sort((a, b) => remainingCategoryCounts[b.name] - remainingCategoryCounts[a.name])[0];

    remainingCategoryCounts[nextCategory.name] -= 1;

    const descriptor = descriptors[(generatedFarms.length + regionIndex) % descriptors.length];
    const place = regionSeed.locations[i % regionSeed.locations.length];
    const producerTerm = nextCategory.producerTerms[Math.floor(i / regionSeed.locations.length) % nextCategory.producerTerms.length];
    const name = `${descriptor} ${place} ${producerTerm}`;
    const blurbTemplate = nextCategory.blurbs[(generatedFarms.length + i + regionIndex) % nextCategory.blurbs.length];
    const blurb = blurbTemplate
      .replaceAll("{place}", place)
      .replaceAll("{region}", regionSeed.name.toLowerCase());

    let slug = slugify(name);
    let duplicateNumber = 2;
    while (usedSlugs.has(slug)) {
      slug = `${slugify(name)}-${duplicateNumber}`;
      duplicateNumber += 1;
    }

    usedSlugs.add(slug);
    generatedFarms.push({
      slug,
      name,
      region: regionSeed.name,
      category: nextCategory.name,
      image: nextCategory.image,
      location: place,
      blurb,
    });
  }
});

export const farms: Farm[] = [...baseFarms, ...generatedFarms];

export const regions: Region[] = regionSeeds.map(({ locations: _locations, ...region }) => ({
  ...region,
  count: farms.filter((farm) => farm.region === region.name).length,
}));

export const categories: Category[] = categorySeeds.map(({ producerTerms: _producerTerms, blurbs: _blurbs, ...category }) => ({
  ...category,
  count: farms.filter((farm) => farm.category === category.name).length,
}));

export const articles: Article[] = [
  { slug: "tematiska-ol-rundor-i-goteborg", title: "Tematiska öl-rundor i Göteborg", date: "30 dec 2025", excerpt: "En guide till stadsdelarnas bryggerier och hur du planerar din egen runda.", image: blog1 },
  { slug: "gardsforsaljning-i-goteborg", title: "Gårdsförsäljning i Göteborg – här köper du öl", date: "9 juni 2025", excerpt: "Listan över bryggerier i Göteborgsområdet som säljer direkt till besökare.", image: blog2 },
  { slug: "vinprovning-pa-skanes-vingardar", title: "Vinprovning på Skånes vingårdar i sommar", date: "12 maj 2025", excerpt: "Sex vingårdar att besöka – från Österlen till Bjärehalvön.", image: blog3 },
];
