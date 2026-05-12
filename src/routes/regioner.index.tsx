import { createFileRoute } from "@tanstack/react-router";
import { PageLayout, PageHero } from "@/components/PageLayout";
import { ImageCard } from "@/components/Cards";
import { regions } from "@/data/site";

export const Route = createFileRoute("/regioner/")({
  head: () => ({
    meta: [
      { title: "Regioner — Gårdsförsäljning av Alkohol" },
      { name: "description", content: "Utforska producenter med gårdsförsäljning i alla svenska regioner." },
      { property: "og:title", content: "Regioner — svenska producenter" },
      { property: "og:description", content: "Utforska producenter med gårdsförsäljning i alla svenska regioner." },
    ],
  }),
  component: RegionerPage,
});

function RegionerPage() {
  return (
    <PageLayout>
      <PageHero
        kicker="21 svenska län"
        title="Utforska Sverige region för region"
        lead="Från Skånes vingårdar till Norrlands hantverksbryggerier – välj region för att se vilka producenter du kan besöka där."
      />
      <section className="section-pad">
        <div className="container-x grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {regions.map(r => (
            <ImageCard key={r.slug} to="/regioner/$slug" params={{ slug: r.slug }} image={r.image} title={r.name} meta={`${r.count} producenter`} />
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
