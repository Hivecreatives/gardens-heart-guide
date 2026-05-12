import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { farms } from "@/data/site";
import { MapPin, Phone, Globe, Clock, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/gardar/$slug")({
  head: ({ params }) => {
    const f = farms.find(x => x.slug === params.slug);
    return {
      meta: [
        { title: `${f?.name ?? "Gård"} — Gårdsförsäljning av Alkohol` },
        { name: "description", content: f?.blurb ?? "Svensk producent med gårdsförsäljning." },
        { property: "og:title", content: f?.name ?? "Gård" },
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
        <h1 className="text-4xl mb-4">Gården finns inte</h1>
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
  return (
    <PageLayout>
      <article>
        <div className="container-x pt-10">
          <Link to="/gardar" className="inline-flex items-center gap-2 text-sm text-body hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> Alla gårdar
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
            <p className="mt-5 text-lg text-body leading-relaxed">{farm.blurb}</p>
            <ul className="mt-8 space-y-3 text-sm">
              <li className="flex gap-3"><MapPin className="h-4 w-4 mt-0.5 text-primary" /> {farm.location}, {farm.region}</li>
              <li className="flex gap-3"><Clock className="h-4 w-4 mt-0.5 text-primary" /> Lör–sön 11–16, övriga tider efter överenskommelse</li>
              <li className="flex gap-3"><Phone className="h-4 w-4 mt-0.5 text-primary" /> 070-123 45 67</li>
              <li className="flex gap-3"><Globe className="h-4 w-4 mt-0.5 text-primary" /> www.exempel.se</li>
            </ul>
            <div className="mt-8 flex gap-3">
              <a href="#" className="btn-primary">Boka besök</a>
              <Link to="/karta" className="btn-secondary">Visa på karta</Link>
            </div>
          </div>
        </div>

        <section className="bg-section section-pad mt-10">
          <div className="container-x grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 prose-like">
              <h2 className="text-3xl mb-6">Om {farm.name}</h2>
              <p className="text-body leading-relaxed">
                {farm.name} är en av {farm.region}s mest spännande producenter inom kategorin {farm.category.toLowerCase()}.
                Här får du möjlighet att möta människorna bakom dryckerna, se hur tillverkningen går till och ta med dig
                dina favoriter direkt hem från gården.
              </p>
              <p className="text-body leading-relaxed mt-4">
                Gårdens läge i {farm.location} ger råvaror och miljö som präglar smaken. Besök gärna under helgerna då
                gårdsbutiken är öppen, eller boka en privat provning för en grupp.
              </p>
            </div>
            <aside className="bg-card border border-border rounded-xl p-6 h-fit">
              <h3 className="font-display text-lg mb-4">Snabbfakta</h3>
              <dl className="space-y-3 text-sm">
                <Row k="Kategori" v={farm.category} />
                <Row k="Region" v={farm.region} />
                <Row k="Ort" v={farm.location} />
                <Row k="Provning" v="Ja, mot bokning" />
                <Row k="Familjevänligt" v="Ja" />
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
