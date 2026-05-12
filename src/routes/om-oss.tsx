import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout, PageHero } from "@/components/PageLayout";
import { Heart, Sprout, Users } from "lucide-react";

export const Route = createFileRoute("/om-oss")({
  head: () => ({
    meta: [
      { title: "Om oss — Gårdsförsäljning av Alkohol" },
      { name: "description", content: "Vi guidar dig till svenska bryggerier, vingårdar och destillerier med gårdsförsäljning." },
      { property: "og:title", content: "Om oss — Gårdsförsäljning" },
      { property: "og:description", content: "En guide till Sveriges lokala dryckesproducenter." },
    ],
  }),
  component: OmOssPage,
});

function OmOssPage() {
  return (
    <PageLayout>
      <PageHero
        kicker="Om oss"
        title="Vi lyfter Sveriges lokala drycker"
        lead="Vår mission är att göra det enklare för svenskar att hitta, besöka och stötta producenter som öppnar dörrarna för gårdsförsäljning."
      />
      <section className="section-pad">
        <div className="container-x grid md:grid-cols-3 gap-8">
          {[
            { icon: Sprout, t: "Närproducerat", d: "Vi listar enbart svenska producenter som tillverkar drycker med tydligt lokal anknytning." },
            { icon: Heart, t: "Hantverk i fokus", d: "Vi lyfter fram småskalighet, hantverk och människorna bakom varje flaska." },
            { icon: Users, t: "För besökare", d: "All information är skriven för dig som vill åka och hälsa på – inte bara handla på nätet." },
          ].map(v => (
            <div key={v.t} className="bg-card border border-border rounded-xl p-7">
              <span className="grid place-items-center h-11 w-11 rounded-lg bg-primary/10 text-primary mb-5">
                <v.icon className="h-5 w-5" />
              </span>
              <h3 className="font-display text-xl text-heading mb-2">{v.t}</h3>
              <p className="text-body text-sm leading-relaxed">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-section section-pad">
        <div className="container-x grid lg:grid-cols-[1.2fr_1fr] gap-12 items-start">
          <div className="prose-like max-w-2xl">
            <span className="kicker">Vår historia</span>
            <h2 className="text-3xl md:text-4xl mt-4 mb-6">En guide byggd av entusiaster</h2>
            <p className="text-body leading-relaxed">
              Sedan 2025 har gårdsförsäljning av alkohol blivit verklighet i fler delar av Sverige. Vi insåg snabbt
              att det saknades en plats där besökare enkelt kunde hitta vilka producenter som faktiskt öppnar
              dörrarna – och vad du faktiskt kan handla på plats.
            </p>
            <p className="text-body leading-relaxed mt-4">
              Idag samarbetar vi med 300+ bryggerier, vingårdar och destillerier över hela landet. Vårt mål är att
              både hjälpa dig som besökare och stötta de producenter som vågar satsa på närodlat och hantverk.
            </p>
          </div>
          <div className="bg-primary text-primary-foreground rounded-2xl p-8">
            <h3 className="font-display text-2xl text-primary-foreground mb-3">Är du producent?</h3>
            <p className="text-primary-foreground/85 text-sm leading-relaxed">
              Vi presenterar gärna din verksamhet på plattformen. Hör av dig så berättar vi mer om hur det fungerar.
            </p>
            <Link to="/kontakt" className="btn-primary mt-6">Kontakta oss</Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
