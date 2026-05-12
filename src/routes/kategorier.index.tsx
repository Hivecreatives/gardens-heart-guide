import { createFileRoute } from "@tanstack/react-router";
import { PageLayout, PageHero } from "@/components/PageLayout";
import { ImageCard } from "@/components/Cards";
import { categories } from "@/data/site";

export const Route = createFileRoute("/kategorier/")({
  head: () => ({
    meta: [
      { title: "Kategorier — Gårdsförsäljning av Alkohol" },
      { name: "description", content: "Bläddra bland öl, vin, sprit, cider och mousserande från svenska producenter." },
      { property: "og:title", content: "Kategorier — svenska drycker" },
      { property: "og:description", content: "Öl, vin, sprit, cider och mousserande från svenska producenter." },
    ],
  }),
  component: KategorierPage,
});

function KategorierPage() {
  return (
    <PageLayout>
      <PageHero
        kicker="Drycker"
        title="Utforska efter kategori"
        lead="Hitta exakt det du letar efter – från lagrad pilsner och torra cidrar till svensk gin och mousserande viner."
      />
      <section className="section-pad">
        <div className="container-x grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(c => (
            <ImageCard key={c.slug} to="/kategorier/$slug" params={{ slug: c.slug }} image={c.image} title={c.name} meta={`${c.count} producenter`} blurb={c.blurb} />
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
