import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, lazy, Suspense } from "react";
import { PageLayout, PageHero } from "@/components/PageLayout";
import { regions, farms } from "@/data/site";
import { getFarmCategories } from "@/lib/farmCategories";

const FarmsMap = lazy(() => import("@/components/FarmsMap"));

export const Route = createFileRoute("/karta")({
  head: () => ({
    meta: [
      { title: "Karta — Gårdsförsäljning av Alkohol" },
      { name: "description", content: "Utforska svenska bryggerier, vingårdar och destillerier på en karta." },
    ],
  }),
  component: KartaPage,
  ssr: false,
});

const CATEGORIES = ["Öl", "Vin", "Sprit", "Cider", "Musteri"];

function KartaPage() {
  const [cats, setCats] = useState<string[]>([]);
  const [regs, setRegs] = useState<string[]>([]);

  const filtered = useMemo(() => farms.filter(f =>
    (cats.length === 0 || getFarmCategories(f).some(c => cats.includes(c))) &&
    (regs.length === 0 || regs.includes(f.region))
  ), [cats, regs]);

  const toggle = (arr: string[], setArr: (v: string[]) => void, v: string) =>
    setArr(arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v]);

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
            <FilterGroup label="Kategori" items={CATEGORIES} selected={cats} onToggle={v => toggle(cats, setCats, v)} />
            <FilterGroup label="Region" items={regions.map(r => r.name)} selected={regs} onToggle={v => toggle(regs, setRegs, v)} />
            <div className="mt-4 text-sm text-muted-foreground">{filtered.length} producenter visas</div>
          </aside>
          <div className="relative rounded-2xl overflow-hidden border border-border bg-section min-h-[600px] h-[70vh]">
            <Suspense fallback={<div className="absolute inset-0 grid place-items-center text-muted-foreground">Laddar karta…</div>}>
              <FarmsMap farms={filtered} />
            </Suspense>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

function FilterGroup({ label, items, selected, onToggle }: { label: string; items: string[]; selected: string[]; onToggle: (v: string) => void }) {
  return (
    <div className="mb-6 last:mb-0">
      <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">{label}</div>
      <div className="space-y-2 max-h-64 overflow-auto pr-1">
        {items.map(i => (
          <label key={i} className="flex items-center gap-2 text-sm text-body cursor-pointer">
            <input
              type="checkbox"
              checked={selected.includes(i)}
              onChange={() => onToggle(i)}
              className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
            />
            {i}
          </label>
        ))}
      </div>
    </div>
  );
}
