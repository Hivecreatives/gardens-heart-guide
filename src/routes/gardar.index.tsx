import { createFileRoute } from "@tanstack/react-router";
import { PageLayout, PageHero } from "@/components/PageLayout";
import { FarmCard } from "@/components/Cards";
import { farms } from "@/data/site";

export const Route = createFileRoute("/gardar")({
  head: () => ({
    meta: [
      { title: "Alla producenter — Gårdsförsäljning av Alkohol" },
      { name: "description", content: "Bläddra bland alla destillerier, bryggerier och vingårdar med gårdsförsäljning i Sverige." },
      { property: "og:title", content: "Alla producenter — svenska producenter" },
      { property: "og:description", content: "Bläddra bland alla destillerier, bryggerier och vingårdar med gårdsförsäljning." },
    ],
  }),
  component: GardarPage,
});

function GardarPage() {
  return (
    <PageLayout>
      <PageHero
        kicker="Producenter"
        title="Alla producenter med direktförsäljning"
        lead="Här hittar du svenska producenter som du själv kan besöka. Filtrera på region, kategori eller bara bläddra för inspiration."
      />
      <section className="section-pad">
        <div className="container-x">
          <div className="flex flex-wrap gap-2 mb-10">
            {["Alla", "Öl", "Vin", "Sprit", "Cider", "Mousserande"].map((t, i) => (
              <button
                key={t}
                className={`px-4 py-2 rounded-full text-sm border transition-colors ${i === 0 ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-body hover:border-primary hover:text-primary"}`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {farms.map(f => <FarmCard key={f.slug} farm={f} />)}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
