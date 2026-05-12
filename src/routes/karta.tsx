import { createFileRoute } from "@tanstack/react-router";
import { PageLayout, PageHero } from "@/components/PageLayout";
import { regions } from "@/data/site";
import { MapPin } from "lucide-react";

export const Route = createFileRoute("/karta")({
  head: () => ({
    meta: [
      { title: "Karta — Gårdsförsäljning av Alkohol" },
      { name: "description", content: "Utforska svenska bryggerier, vingårdar och destillerier på en karta." },
      { property: "og:title", content: "Karta — svenska producenter" },
      { property: "og:description", content: "Utforska producenter på en interaktiv karta." },
    ],
  }),
  component: KartaPage,
});

function KartaPage() {
  return (
    <PageLayout>
      <PageHero
        kicker="Karta"
        title="Hitta producenter på kartan"
        lead="Visualisera Sveriges producenter och planera ditt nästa besök. Filtrera på kategori och region."
      />
      <section className="section-pad">
        <div className="container-x grid lg:grid-cols-[300px_1fr] gap-8">
          <aside className="bg-card border border-border rounded-xl p-6 h-fit">
            <h3 className="font-display text-lg mb-4">Filter</h3>
            <FilterGroup label="Kategori" items={["Öl", "Vin", "Sprit", "Cider", "Mousserande"]} />
            <FilterGroup label="Region" items={regions.map(r => r.name)} />
          </aside>
          <div className="relative rounded-2xl overflow-hidden border border-border bg-section min-h-[600px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(51,102,69,0.1),transparent_60%),radial-gradient(circle_at_70%_60%,rgba(196,110,49,0.08),transparent_60%)]" />
            <div className="absolute inset-0 grid place-items-center text-center px-8">
              <div>
                <span className="grid place-items-center h-14 w-14 rounded-full bg-primary text-primary-foreground mx-auto mb-4">
                  <MapPin className="h-6 w-6" />
                </span>
                <h3 className="text-2xl font-display mb-2">Interaktiv karta</h3>
                <p className="text-body max-w-md mx-auto">
                  Den interaktiva kartan med alla 170+ producenter laddas här. Tillåt platsdelning för att se producenter nära dig.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

function FilterGroup({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="mb-6 last:mb-0">
      <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">{label}</div>
      <div className="space-y-2">
        {items.map(i => (
          <label key={i} className="flex items-center gap-2 text-sm text-body cursor-pointer">
            <input type="checkbox" className="h-4 w-4 rounded border-border text-primary focus:ring-primary" />
            {i}
          </label>
        ))}
      </div>
    </div>
  );
}
