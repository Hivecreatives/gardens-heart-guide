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

export const regions: Region[] = [
  { slug: "skane", name: "Skåne", count: 38, image: regionSkane },
  { slug: "vastra-gotaland", name: "Västra Götaland", count: 46, image: regionVg },
  { slug: "stockholm", name: "Stockholm", count: 22, image: regionSthlm },
  { slug: "gotland", name: "Gotland", count: 19, image: regionGotland },
  { slug: "halland", name: "Halland", count: 17, image: regionHalland },
  { slug: "smaland", name: "Småland", count: 28, image: regionSmaland },
];

export const categories: Category[] = [
  { slug: "ol", name: "Öl", count: 84, image: catOl, blurb: "Hantverksbryggerier som öppnar dörrarna för direktköp." },
  { slug: "vin", name: "Vin", count: 31, image: catVin, blurb: "Svenska vingårdar med rött, vitt och rosé direkt från källan." },
  { slug: "sprit", name: "Sprit", count: 27, image: catSprit, blurb: "Destillerier som tillverkar gin, whisky, akvavit och vodka." },
  { slug: "cider", name: "Cider", count: 18, image: catCider, blurb: "Cidertillverkare med pressade äpplen från egna odlingar." },
  { slug: "mousserande", name: "Mousserande", count: 12, image: catMousserande, blurb: "Bubblor från svenska vingårdar och bryggare." },
];

export const farms: Farm[] = [
  { slug: "stigberga-bryggeri", name: "Stigberga Bryggeri", region: "Skåne", category: "Öl", image: catOl, location: "Höör", blurb: "Litet hantverksbryggeri med fokus på lagrade öl och säsongsspecialiteter." },
  { slug: "kullaberg-vingard", name: "Kullaberg Vingård", region: "Skåne", category: "Vin", image: catVin, location: "Höganäs", blurb: "Vita och mousserande viner från svalt västskånskt klimat." },
  { slug: "ramslosa-destilleri", name: "Ramslösa Destilleri", region: "Halland", category: "Sprit", image: catSprit, location: "Halmstad", blurb: "Småskalig produktion av gin och akvavit på lokala örter." },
  { slug: "appelgarden-orust", name: "Äppelgården Orust", region: "Västra Götaland", category: "Cider", image: catCider, location: "Henån", blurb: "Torra cidrar och ciderviner pressade på Bohuslänska äpplen." },
  { slug: "sjotuna-bubbel", name: "Sjötuna Bubbel", region: "Stockholm", category: "Mousserande", image: catMousserande, location: "Vaxholm", blurb: "Skärgårdens första metodklassiska producent." },
  { slug: "lilla-aros-bryggeri", name: "Lilla Åros Bryggeri", region: "Småland", category: "Öl", image: catOl, location: "Växjö", blurb: "Familjebryggeri med betoning på belgiska och tyska stilar." },
];

export const articles: Article[] = [
  { slug: "tematiska-ol-rundor-i-goteborg", title: "Tematiska öl-rundor i Göteborg", date: "30 dec 2025", excerpt: "En guide till stadsdelarnas bryggerier och hur du planerar din egen runda.", image: blog1 },
  { slug: "gardsforsaljning-i-goteborg", title: "Gårdsförsäljning i Göteborg – här köper du öl", date: "9 juni 2025", excerpt: "Listan över bryggerier i Göteborgsområdet som säljer direkt till besökare.", image: blog2 },
  { slug: "vinprovning-pa-skanes-vingardar", title: "Vinprovning på Skånes vingårdar i sommar", date: "12 maj 2025", excerpt: "Sex vingårdar att besöka – från Österlen till Bjärehalvön.", image: blog3 },
];
