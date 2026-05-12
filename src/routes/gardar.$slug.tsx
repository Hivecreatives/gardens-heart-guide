import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { farms } from "@/data/site";
import { MapPin, Globe, ArrowLeft, ExternalLink, Navigation } from "lucide-react";

export const Route = createFileRoute("/gardar/$slug")({
  head: ({ params }) => {
    const f = farms.find(x => x.slug === params.slug);
    return {
      meta: [
        { title: `${f?.name ?? "Producent"} — Gårdsförsäljning av Alkohol` },
        { name: "description", content: f?.blurb ?? "Svensk producent med gårdsförsäljning." },
        { property: "og:title", content: f?.name ?? "Producent" },
        { property: "og:description", content: f?.blurb ?? "" },
        { property: "og:image", content: f?.image ?? "" },
      ],
    };
  },
  loader: ({ params }) => {
    const farm = farms.find(f => f.slug === params.slug);
    if (!farm) throw notFound();
    return farm;
  },
  notFoundComponent: () => (
    <PageLayout>
      <div className="container-x py-32 text-center">
        <h1 className="text-4xl mb-4">Producenten finns inte</h1>
        <Link to="/gardar" className="btn-secondary mt-4">Tillbaka</Link>
      </div>
    </PageLayout>
  ),
  errorComponent: () => (
    <PageLayout>
      <div className="container-x py-32 text-center"><h1 className="text-3xl">Något gick fel</h1></div>
    </PageLayout>
  ),
  component: FarmPage,
});

function FarmPage() {
  const farm = Route.useLoaderData();
  const lead = farm.blurb.length > 220 ? farm.blurb.slice(0, 217).trimEnd() + "…" : farm.blurb;
  const paragraphs: string[] = farm.blurb.split(/\n+|(?<=\.)\s{2,}/).map((p: string) => p.trim()).filter(Boolean);
  return (
    <PageLayout>
      <article>
        <div className="container-x pt-10">
          <Link to="/gardar" className="inline-flex items-center gap-2 text-sm text-body hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> Alla producenter
          </Link>
        </div>
        <div className="container-x py-10 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <div className="rounded-2xl overflow-hidden border border-border">
              <img src={farm.image} alt={farm.name} className="w-full h-[460px] object-cover" />
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="text-xs uppercase tracking-wider text-primary font-medium mb-3">
              {farm.category} · {farm.region}
            </div>
            <h1 className="text-4xl lg:text-5xl">{farm.name}</h1>
            <p className="mt-5 text-lg text-body leading-relaxed">{lead}</p>
            <ul className="mt-8 space-y-3 text-sm">
              <li className="flex gap-3"><MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" /> {farm.address || `${farm.location}, ${farm.region}`}</li>
              {farm.website && (
                <li className="flex gap-3">
                  <Globe className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                  <a href={farm.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline break-all">
                    {farm.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                  </a>
                </li>
              )}
            </ul>
            <div className="mt-8 flex gap-3 flex-wrap">
              {farm.website && (
                <a href={farm.website} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">
                  Besök hemsida <ExternalLink className="h-4 w-4" />
                </a>
              )}
              <Link to="/karta" className="btn-secondary">Visa på karta</Link>
              <a
                href={`https://gardsforsaljningavalkohol.se/${farm.slug}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Mer info
              </a>
            </div>
          </div>
        </div>

        <section className="bg-section section-pad mt-10">
          <div className="container-x grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 prose-like">
              <h2 className="text-3xl mb-6">Om {farm.name}</h2>
              {paragraphs.map((p: string, i: number) => (
                <p key={i} className="text-body leading-relaxed mt-4 first:mt-0">{p}</p>
              ))}
            </div>
            <aside className="bg-card border border-border rounded-xl p-6 h-fit">
              <h3 className="font-display text-lg mb-4">Snabbfakta</h3>
              <dl className="space-y-3 text-sm">
                <Row k="Kategori" v={farm.category} />
                <Row k="Region" v={farm.region} />
                {farm.address && <Row k="Adress" v={farm.address} />}
                {farm.website && (
                  <Row
                    k="Hemsida"
                    v={farm.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                  />
                )}
              </dl>
            </aside>
          </div>
        </section>
      </article>
    </PageLayout>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-border pb-2">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="text-heading font-medium">{v}</dd>
    </div>
  );
}
