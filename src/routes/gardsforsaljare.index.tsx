import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { PageLayout, PageHero } from "@/components/PageLayout";
import { FarmCard } from "@/components/Cards";
import { farms } from "@/data/site";
import { getFarmCategories, getFarmSearchHaystack } from "@/lib/farmCategories";

export const Route = createFileRoute("/gardsforsaljare/")({
  head: () => ({
    meta: [
      { title: "Alla gårdsförsäljare — Gårdsförsäljning av Alkohol" },
      { name: "description", content: "Bläddra bland alla destillerier, bryggerier och vingårdar med gårdsförsäljning i Sverige." },
      { property: "og:title", content: "Alla gårdsförsäljare — svenska gårdsförsäljare" },
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
    if (filter !== "Alla" && !getFarmCategories(f).includes(filter)) return false;
    if (!q) return true;
    return getFarmSearchHaystack(f).includes(q);
  });
  return (
    <PageLayout>
      <PageHero
        kicker="Gårdsförsäljare"
        title="Alla gårdsförsäljare med direktförsäljning"
        lead="Här hittar du svenska gårdsförsäljare som du själv kan besöka. Filtrera på region, kategori eller bara bläddra för inspiration."
      />
      <section className="section-pad">
        <div className="container-x">
          <div className="mb-6 max-w-xl">
            <label htmlFor="producer-search" className="block text-sm font-medium text-body mb-2">
              Sök bland {farms.length} gårdsförsäljare
            </label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted pointer-events-none" />
              <input
                id="producer-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value.slice(0, 100))}
                maxLength={100}
                placeholder="Sök på namn, ort eller dryck (t.ex. gin, cider, IPA)…"
                className="w-full pl-12 pr-4 py-3 rounded-full text-sm bg-card border border-border text-body placeholder:text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <p className="text-xs text-muted mt-2">Filtrera på kategori nedan</p>
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
          <p className="text-sm text-muted mb-8">{filtered.length} gårdsförsäljare</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.map(f => <FarmCard key={f.slug} farm={f} />)}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
