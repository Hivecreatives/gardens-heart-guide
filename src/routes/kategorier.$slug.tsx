import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { FarmCard } from "@/components/Cards";
import { categories, farms } from "@/data/site";

export const Route = createFileRoute("/kategorier/$slug")({
  head: ({ params }) => {
    const c = categories.find(x => x.slug === params.slug);
    return {
      meta: [
        { title: `${c?.name ?? "Kategori"} — Svenska producenter` },
        { name: "description", content: c?.blurb ?? "Svenska producenter." },
        { property: "og:title", content: `${c?.name ?? "Kategori"} — Gårdsförsäljning` },
        { property: "og:description", content: c?.blurb ?? "" },
        { property: "og:image", content: c?.image ?? "" },
      ],
    };
  },
  loader: ({ params }) => {
    const cat = categories.find(c => c.slug === params.slug);
    if (!cat) throw notFound();
    return { cat, list: farms.filter(f => f.category === cat.name) };
  },
  notFoundComponent: () => (
    <PageLayout><div className="container-x py-32 text-center"><h1>Kategorin finns inte</h1></div></PageLayout>
  ),
  errorComponent: () => (
    <PageLayout><div className="container-x py-32 text-center"><h1>Något gick fel</h1></div></PageLayout>
  ),
  component: CategoryPage,
});

function CategoryPage() {
  const { cat, list } = Route.useLoaderData();
  return (
    <PageLayout>
      <section className="bg-section border-b border-border">
        <div className="container-x py-16 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="kicker">Kategori</span>
            <h1 className="text-4xl md:text-5xl mt-3">{cat.name}</h1>
            <p className="mt-4 text-body text-lg">{cat.blurb}</p>
            <p className="mt-3 text-sm text-muted-foreground">{cat.count} producenter</p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-border">
            <img src={cat.image} alt={cat.name} className="w-full h-[340px] object-cover" />
          </div>
        </div>
      </section>
      <section className="section-pad">
        <div className="container-x">
          {list.length === 0 ? (
            <p className="text-body">Vi listar snart producenter inom {cat.name.toLowerCase()}. <Link to="/gardar" className="text-primary underline">Visa alla gårdar</Link></p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
              {list.map((f: typeof farms[number]) => <FarmCard key={f.slug} farm={f} />)}
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
