import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { FarmCard } from "@/components/Cards";
import { regions, farms } from "@/data/site"; import type { Farm } from "@/data/site";

export const Route = createFileRoute("/regioner/$slug")({
  head: ({ params }) => {
    const r = regions.find(x => x.slug === params.slug);
    return {
      meta: [
        { title: `Producenter i ${r?.name ?? "regionen"} — Gårdsförsäljning` },
        { name: "description", content: `Bryggerier, vingårdar och destillerier i ${r?.name ?? "Sverige"} med gårdsförsäljning.` },
        { property: "og:title", content: `${r?.name ?? "Region"} — Gårdsförsäljning` },
        { property: "og:description", content: `Producenter med gårdsförsäljning i ${r?.name ?? ""}.` },
        { property: "og:image", content: r?.image ?? "" },
      ],
    };
  },
  loader: ({ params }) => {
    const region = regions.find(r => r.slug === params.slug);
    if (!region) throw notFound();
    return { region, list: farms.filter(f => f.region === region.name) };
  },
  notFoundComponent: () => (
    <PageLayout><div className="container-x py-32 text-center"><h1>Regionen finns inte</h1></div></PageLayout>
  ),
  errorComponent: () => (
    <PageLayout><div className="container-x py-32 text-center"><h1>Något gick fel</h1></div></PageLayout>
  ),
  component: RegionPage,
});

function RegionPage() {
  const { region, list } = Route.useLoaderData();
  return (
    <PageLayout>
      <section className="relative">
        <div className="h-[340px] overflow-hidden border-b border-border">
          <img src={region.image} alt={region.name} className="w-full h-full object-cover" />
        </div>
        <div className="container-x -mt-16 relative z-10">
          <div className="bg-background border border-border rounded-2xl p-8 md:p-10 max-w-3xl shadow-[0_20px_50px_-30px_rgba(42,38,34,.4)]">
            <span className="kicker">Region</span>
            <h1 className="text-4xl md:text-5xl mt-3">{region.name}</h1>
            <p className="mt-4 text-body">
              {region.count} producenter i {region.name} öppnar dörrarna för gårdsförsäljning. Här är ett urval.
            </p>
          </div>
        </div>
      </section>
      <section className="section-pad">
        <div className="container-x">
          {list.length === 0 ? (
            <p className="text-body">Vi lägger snart till producenter från {region.name}. <Link to="/producenter" className="text-primary underline">Visa alla producenter</Link></p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
              {list.map((f: Farm) => <FarmCard key={f.slug} farm={f} />)}
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
