import { createFileRoute } from "@tanstack/react-router";
import { PageLayout, PageHero } from "@/components/PageLayout";
import { ImageCard } from "@/components/Cards";
import { articles } from "@/data/site";

export const Route = createFileRoute("/blogg-nyheter/")({
  head: () => ({
    meta: [
      { title: "Blogg & Nyheter — Gårdsförsäljning av Alkohol" },
      { name: "description", content: "Artiklar om svenska bryggerier, vingårdar och destillerier." },
      { property: "og:title", content: "Blogg & Nyheter" },
      { property: "og:description", content: "Artiklar om svenska gårdsförsäljare och dryckeskultur." },
    ],
  }),
  component: BloggPage,
});

function BloggPage() {
  return (
    <PageLayout>
      <PageHero
        kicker="Blogg & Nyheter"
        title="Inspiration, guider och nyheter"
        lead="Vi skriver om svenska gårdsförsäljare, ölrundor, vinprovningar och spännande gårdsbesök runt om i landet."
      />
      <section className="section-pad">
        <div className="container-x grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {articles.map(a => (
            <ImageCard key={a.slug} to="/blogg-nyheter/$slug" params={{ slug: a.slug }} image={a.image} title={a.title} meta={a.date} blurb={a.excerpt} />
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
