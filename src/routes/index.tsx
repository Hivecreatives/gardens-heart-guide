import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { ImageCard } from "@/components/Cards";
import { regions, categories, articles } from "@/data/site";
import { Search, Map, Tag, Calendar, ArrowRight } from "lucide-react";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gårdsförsäljning av Alkohol — Sveriges destillerier, bryggerier & vingårdar" },
      { name: "description", content: "Hitta destillerier, bryggerier och vingårdar med gårdsförsäljning i hela Sverige. Upptäck lokala drycker direkt från producenten." },
      { property: "og:title", content: "Gårdsförsäljning av Alkohol" },
      { property: "og:description", content: "En guide till Sveriges lokala destillerier, bryggerier och vingårdar." },
    ],
  }),
  component: HomePage,
});

const features = [
  { icon: Search, title: "Enkel sökning", text: "Hitta producenter nära dig eller i en specifik region med vårt sökverktyg." },
  { icon: Map, title: "Interaktiv karta", text: "Utforska vingårdar, bryggerier och destillerier visuellt och planera ditt besök." },
  { icon: Tag, title: "Drycktyper", text: "Filtrera på öl, vin, sprit, cider och mousserande direkt från gården." },
  { icon: Calendar, title: "Säsong & öppettider", text: "Se aktuella öppettider, evenemang och vad som finns i butiken just nu." },
];

function HomePage() {
  return (
    <PageLayout>
      {/* HERO */}
      <section className="relative bg-section overflow-hidden">
        <div className="container-x grid lg:grid-cols-12 gap-10 lg:gap-16 py-16 lg:py-24 items-center">
          <div className="lg:col-span-6">
            <span className="kicker mb-5">Över 300 producenter</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl mt-4 leading-[1.08]">
              Hitta destillerier, bryggerier &amp; vingårdar med <em className="not-italic text-primary">gårdsförsäljning</em>
            </h1>
            <p className="mt-6 text-lg text-body leading-relaxed max-w-xl">
              Den kompletta guiden till svenska producenter som öppnar dörrarna för
              direktförsäljning. Stöd lokala hantverkare och upptäck den svenska
              dryckeskulturen — på riktigt.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/producenter" className="btn-primary">Utforska producenter</Link>
              <Link to="/karta" className="btn-secondary">Visa kartan</Link>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md border-t border-border pt-7">
              <Stat n="300+" l="Producenter" />
              <Stat n="21" l="Län" />
              <Stat n="5" l="Drycktyper" />
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-border shadow-[0_30px_60px_-30px_rgba(42,38,34,.35)]">
              <img src={hero} alt="Svensk vingård i sommarljus" width={1600} height={1024} className="w-full h-[420px] lg:h-[520px] object-cover" />
              <div className="absolute bottom-5 left-5 right-5 bg-background/95 backdrop-blur rounded-xl p-4 border border-border flex items-center justify-between">
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Veckans producent</div>
                  <div className="font-display text-lg text-heading">Kullaberg Vingård, Höganäs</div>
                </div>
                <Link to="/producenter/$slug" params={{ slug: "kullaberg-vingard" }} className="btn-secondary !py-2 !px-4 text-xs">Besök</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section-pad">
        <div className="container-x">
          <div className="max-w-2xl mb-14">
            <span className="kicker">Varför Gårdsförsäljning</span>
            <h2 className="text-3xl md:text-4xl mt-4">En enkel väg till svenska producenter</h2>
            <p className="mt-4 text-body">Vi samlar producenter, bryggerier och destillerier som säljer direkt – så att du kan handla närproducerat och möta människorna bakom dryckerna.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(f => (
              <div key={f.title} className="bg-card border border-border rounded-xl p-6">
                <span className="grid place-items-center h-11 w-11 rounded-lg bg-primary/10 text-primary mb-5">
                  <f.icon className="h-5 w-5" strokeWidth={1.7} />
                </span>
                <h3 className="font-display text-lg text-heading mb-2">{f.title}</h3>
                <p className="text-sm text-body leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REGIONS */}
      <section className="section-pad bg-section">
        <div className="container-x">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
            <div className="max-w-2xl">
              <span className="kicker">Utforska Sverige</span>
              <h2 className="text-3xl md:text-4xl mt-4">Populära regioner</h2>
              <p className="mt-4 text-body">Upptäck vilka producenter som finns i ditt län eller där du vill resa nästa helg.</p>
            </div>
            <Link to="/regioner" className="text-primary font-medium inline-flex items-center gap-2 hover:gap-3 transition-all">
              Se alla regioner <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {regions.map(r => (
              <ImageCard key={r.slug} to="/regioner/$slug" params={{ slug: r.slug }} image={r.image} title={r.name} meta={`${r.count} producenter`} />
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section-pad">
        <div className="container-x">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
            <div className="max-w-2xl">
              <span className="kicker">Drycker</span>
              <h2 className="text-3xl md:text-4xl mt-4">Utforska efter kategori</h2>
              <p className="mt-4 text-body">Från lagrad pilsner till torr cider – välj din typ och hitta producenter som tillverkar den.</p>
            </div>
            <Link to="/kategorier" className="text-primary font-medium inline-flex items-center gap-2 hover:gap-3 transition-all">
              Alla kategorier <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map(c => (
              <ImageCard key={c.slug} to="/kategorier/$slug" params={{ slug: c.slug }} image={c.image} title={c.name} meta={`${c.count} producenter`} blurb={c.blurb} />
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="section-pad bg-section">
        <div className="container-x">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
            <div className="max-w-2xl">
              <span className="kicker">Blogg &amp; Nyheter</span>
              <h2 className="text-3xl md:text-4xl mt-4">Inspiration från svenska producenter</h2>
            </div>
            <Link to="/blogg-nyheter" className="text-primary font-medium inline-flex items-center gap-2 hover:gap-3 transition-all">
              Se alla artiklar <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {articles.map(a => (
              <ImageCard key={a.slug} to="/blogg-nyheter/$slug" params={{ slug: a.slug }} image={a.image} title={a.title} meta={a.date} blurb={a.excerpt} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad">
        <div className="container-x">
          <div className="bg-primary text-primary-foreground rounded-2xl p-10 md:p-16 grid md:grid-cols-[1.4fr_1fr] gap-8 items-center">
            <div>
              <span className="text-sm uppercase tracking-wider text-accent font-medium">Vill du synas?</span>
              <h2 className="text-3xl md:text-4xl mt-4 text-primary-foreground">Är du producent med gårdsförsäljning?</h2>
              <p className="mt-4 text-primary-foreground/80 max-w-xl">
                Bli en del av plattformen och låt fler upptäcka din verksamhet. Vi hjälper dig att synas för rätt besökare.
              </p>
            </div>
            <div className="flex md:justify-end">
              <Link to="/kontakt" className="btn-primary">Kontakta oss</Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="font-display text-2xl text-heading">{n}</div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{l}</div>
    </div>
  );
}
