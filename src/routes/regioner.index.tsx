import { createFileRoute } from "@tanstack/react-router";
import { PageLayout, PageHero } from "@/components/PageLayout";
import { ImageCard } from "@/components/Cards";
import { regions } from "@/data/site";

export const Route = createFileRoute("/regioner/")({
  head: () => ({
    meta: [
      { title: "Regioner — Gårdsförsäljning av Alkohol" },
      { name: "description", content: "Utforska gårdsförsäljare med gårdsförsäljning i alla svenska regioner." },
      { property: "og:title", content: "Regioner — svenska gårdsförsäljare" },
      { property: "og:description", content: "Utforska gårdsförsäljare med gårdsförsäljning i alla svenska regioner." },
    ],
  }),
  component: RegionerPage,
});

function RegionerPage() {
  return (
    <PageLayout>
      <PageHero
        kicker="19 svenska län"
        title="Utforska Sverige region för region"
        lead="Från Skånes vingårdar till Norrlands hantverksbryggerier – välj region för att se vilka gårdsförsäljare du kan besöka där."
      />
      <section className="section-pad">
        <div className="container-x grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {regions.map(r => (
            <ImageCard key={r.slug} to="/regioner/$slug" params={{ slug: r.slug }} image={r.image} title={r.name} meta={`${r.count} gårdsförsäljare`} />
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
