import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { articles } from "@/data/site";
import { ArrowLeft, Calendar, MapPin, Tag, Store } from "lucide-react";
import { getRelatedLinks } from "@/lib/relatedLinks";

export const Route = createFileRoute("/blogg-nyheter/$slug")({
  head: ({ params }) => {
    const a = articles.find(x => x.slug === params.slug);
    return {
      meta: [
        { title: `${a?.title ?? "Artikel"} — Gårdsförsäljning` },
        { name: "description", content: a?.excerpt ?? "Artikel om svenska gårdsförsäljare." },
        { property: "og:title", content: a?.title ?? "" },
        { property: "og:description", content: a?.excerpt ?? "" },
        { property: "og:image", content: a?.image ?? "" },
      ],
    };
  },
  loader: ({ params }) => {
    const a = articles.find(x => x.slug === params.slug);
    if (!a) throw notFound();
    return a;
  },
  notFoundComponent: () => (
    <PageLayout><div className="container-x py-32 text-center"><h1>Artikeln finns inte</h1></div></PageLayout>
  ),
  errorComponent: () => (
    <PageLayout><div className="container-x py-32 text-center"><h1>Något gick fel</h1></div></PageLayout>
  ),
  component: ArticlePage,
});

function ArticlePage() {
  const a = Route.useLoaderData();
  return (
    <PageLayout>
      <article className="container-x py-12 max-w-3xl">
        <Link to="/blogg-nyheter" className="inline-flex items-center gap-2 text-sm text-body hover:text-primary mb-8">
          <ArrowLeft className="h-4 w-4" /> Alla artiklar
        </Link>
        <span className="kicker mb-5">Blogg</span>
        <h1 className="text-4xl md:text-5xl mt-4">{a.title}</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
          <Calendar className="h-4 w-4" /> {a.date}
        </div>
        {a.image && (
          <div className="rounded-2xl overflow-hidden border border-border my-10">
            <img src={a.image} alt={a.title} className="w-full h-[420px] object-cover" />
          </div>
        )}
        <div className="space-y-5 text-body leading-relaxed text-[1.05rem]">
          {a.excerpt && <p className="text-lg text-heading font-medium">{a.excerpt}</p>}
          {(a.content || "").split(/\n\n+/).filter(Boolean).map((block: string, i: number) => {
            if (block.startsWith("## ")) return <h2 key={i} className="text-2xl mt-10">{block.slice(3)}</h2>;
            return <p key={i}>{block}</p>;
          })}
          {a.url && (
            <p className="pt-4">
              <a href={a.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Läs originalet på gardsforsaljningavalkohol.se →
              </a>
            </p>
          )}
        </div>
        <RelatedSection article={a} />
      </article>
    </PageLayout>
  );
}

function RelatedSection({ article }: { article: Parameters<typeof getRelatedLinks>[0] }) {
  const related = getRelatedLinks(article);
  return (
    <section className="mt-16 border-t border-border pt-10 space-y-8">
      <h2 className="text-2xl">Läs vidare</h2>

      <div>
        <h3 className="flex items-center gap-2 text-sm font-medium text-heading mb-3">
          <MapPin className="h-4 w-4 text-primary" /> Regioner i artikeln
        </h3>
        <div className="flex flex-wrap gap-2">
          {related.regions.map((r) => (
            <Link
              key={r.slug}
              to="/regioner/$slug"
              params={{ slug: r.slug }}
              className="rounded-full border border-primary/40 px-4 py-1.5 text-sm text-primary hover:bg-primary/5"
            >
              {r.name}
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h3 className="flex items-center gap-2 text-sm font-medium text-heading mb-3">
          <Tag className="h-4 w-4 text-primary" /> Kategorier
        </h3>
        <div className="flex flex-wrap gap-2">
          {related.categories.map((c) => (
            <Link
              key={c.slug}
              to="/kategorier/$slug"
              params={{ slug: c.slug }}
              className="rounded-full border border-primary/40 px-4 py-1.5 text-sm text-primary hover:bg-primary/5"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h3 className="flex items-center gap-2 text-sm font-medium text-heading mb-3">
          <Store className="h-4 w-4 text-primary" /> Gårdsförsäljare att besöka
        </h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {related.farms.map((f) => (
            <Link
              key={f.slug}
              to="/gardsforsaljare/$slug"
              params={{ slug: f.slug }}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 hover:shadow-sm transition"
            >
              {f.image && (
                <img src={f.image} alt={f.name} loading="lazy" className="h-12 w-12 rounded-lg object-cover" />
              )}
              <span className="min-w-0">
                <span className="block text-sm font-medium text-heading truncate">{f.name}</span>
                <span className="block text-xs text-muted-foreground truncate">{f.location || f.region}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
