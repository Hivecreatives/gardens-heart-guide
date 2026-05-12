import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageLayout, PageHero } from "@/components/PageLayout";
import { FarmCard } from "@/components/Cards";
import { farms } from "@/data/site";

export const Route = createFileRoute("/producenter/")({
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
  const [filter, setFilter] = useState("Alla");
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const filtered = farms.filter(f => {
    if (filter !== "Alla" && f.category !== filter) return false;
    if (!q) return true;
    return f.name.toLowerCase().includes(q) || f.location.toLowerCase().includes(q);
  });
  return (
    <PageLayout>
      <PageHero
        kicker="Producenter"
        title="Alla producenter med direktförsäljning"
        lead="Här hittar du svenska producenter som du själv kan besöka. Filtrera på region, kategori eller bara bläddra för inspiration."
      />
      <section className="section-pad">
        <div className="container-x">
          <div className="mb-6">
            <label htmlFor="producer-search" className="sr-only">Sök producent</label>
            <input
              id="producer-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value.slice(0, 100))}
              maxLength={100}
              placeholder="Sök på namn eller ort…"
              className="w-full md:max-w-md px-4 py-3 rounded-full text-sm bg-card border border-border text-body placeholder:text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {["Alla", "Öl", "Vin", "Sprit", "Cider", "Musteri"].map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-4 py-2 rounded-full text-sm border transition-colors ${filter === t ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-body hover:border-primary hover:text-primary"}`}
              >
                {t}
              </button>
            ))}
          </div>
          <p className="text-sm text-muted mb-8">{filtered.length} producenter</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.map(f => <FarmCard key={f.slug} farm={f} />)}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
