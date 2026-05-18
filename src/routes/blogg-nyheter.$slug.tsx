import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { articles } from "@/data/site";
import { ArrowLeft, Calendar } from "lucide-react";

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
      </article>
    </PageLayout>
  );
}
